"use server";

import { db } from "@/lib/db";
import { coupon } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function verifyCoupon(code: string) {
    try {
        const couponData = await db.query.coupon.findFirst({
            where: eq(coupon.code, code.toUpperCase()),
        });

        if (!couponData) {
            return { valid: false, message: "Invalid coupon code" };
        }

        if (!couponData.isActive) {
            return { valid: false, message: "Coupon is inactive" };
        }

        if (couponData.expiresAt && new Date(couponData.expiresAt) < new Date()) {
            return { valid: false, message: "Coupon has expired" };
        }

        if (
            couponData.maxUses !== null &&
            couponData.usedCount >= couponData.maxUses
        ) {
            return { valid: false, message: "Coupon usage limit reached" };
        }

        return {
            valid: true,
            discountPercent: couponData.discountPercent,
            maxDiscountAmount: couponData.maxDiscountAmount,
            code: couponData.code,
        };
    } catch (error) {
        console.error("Error verifying coupon:", error);
        return { valid: false, message: "Error verifying coupon" };
    }
}

export async function trackCouponUsage(code: string) {
    try {
        const couponData = await db.query.coupon.findFirst({
            where: eq(coupon.code, code.toUpperCase()),
        });

        if (!couponData) {
            return { success: false, message: "Coupon not found" };
        }

        await db
            .update(coupon)
            .set({
                usedCount: sql`${coupon.usedCount} + 1`,
            })
            .where(eq(coupon.id, couponData.id));

        return { success: true };
    } catch (error) {
        console.error("Error tracking coupon usage:", error);
        return { success: false, message: "Failed to track usage" };
    }
}
