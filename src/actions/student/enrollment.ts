"use server";

import { db } from "@/lib/db";
import { coupon, enrollment, course } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentSession } from "@/lib/auth/role-guard";
import { revalidatePath } from "next/cache";

export async function validateCoupon(code: string) {
    try {
        const normalizedCode = code.toUpperCase().trim();

        const existingCoupon = await db.query.coupon.findFirst({
            where: and(
                eq(coupon.code, normalizedCode),
                eq(coupon.isActive, true)
            ),
        });

        if (!existingCoupon) {
            return { success: false, error: "Invalid coupon code" };
        }

        if (existingCoupon.expiresAt && new Date(existingCoupon.expiresAt) < new Date()) {
            return { success: false, error: "Coupon has expired" };
        }

        if (
            existingCoupon.maxUses !== null &&
            existingCoupon.usedCount >= existingCoupon.maxUses
        ) {
            return { success: false, error: "Coupon usage limit reached" };
        }

        return {
            success: true,
            data: {
                code: existingCoupon.code,
                discountPercent: existingCoupon.discountPercent,
                maxDiscountAmount: existingCoupon.maxDiscountAmount,
            },
        };
    } catch (error) {
        console.error("Error validating coupon:", error);
        return { success: false, error: "Failed to validate coupon" };
    }
}

export async function enrollStudent(courseId: string, couponCode?: string) {
    try {
        const session = await getCurrentSession();
        if (!session) {
            return { success: false, error: "Unauthorized" };
        }

        const existingEnrollment = await db.query.enrollment.findFirst({
            where: and(
                eq(enrollment.studentId, session.user.id),
                eq(enrollment.courseId, courseId)
            )
        });

        if (existingEnrollment) {
            return { success: false, error: "Already enrolled" };
        }

        const courseData = await db.query.course.findFirst({
            where: eq(course.id, courseId)
        });

        if (!courseData) {
            return { success: false, error: "Course not found" };
        }

        // Override price for student enrollment update
        let finalPrice = 4999; // courseData.price || 0;
        let appliedCouponId = null;

        if (couponCode) {
            const validation = await validateCoupon(couponCode);
            if (validation.success && validation.data) {
                const existingCoupon = await db.query.coupon.findFirst({
                    where: eq(coupon.code, validation.data.code)
                });

                if (existingCoupon) {
                    let discount = (finalPrice * existingCoupon.discountPercent) / 100;
                    if (existingCoupon.maxDiscountAmount !== null && discount > existingCoupon.maxDiscountAmount) {
                        discount = existingCoupon.maxDiscountAmount;
                    }
                    finalPrice = Math.max(0, finalPrice - discount);
                    appliedCouponId = existingCoupon.id;

                    // Increment usage count logic would go here ideally in a transaction
                    await db.update(coupon)
                        .set({ usedCount: existingCoupon.usedCount + 1 })
                        .where(eq(coupon.id, existingCoupon.id));
                }
            }
        }

        // Create enrollment
        await db.insert(enrollment).values({
            id: crypto.randomUUID(),
            studentId: session.user.id,
            courseId: courseId,
            paymentStatus: "paid", // Mocking successful payment
            amount: finalPrice,
            enrolledAt: new Date()
        });

        revalidatePath("/dashboard/student");
        revalidatePath(`/dashboard/student/${courseId}`);

        return { success: true };

    } catch (error) {
        console.error("Enrollment error:", error);
        return { success: false, error: "Failed to enroll" };
    }
}
