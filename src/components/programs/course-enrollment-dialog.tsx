"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateCoupon, enrollStudent } from "@/actions/student/enrollment";
import { Loader2, Ticket, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface CodeData {
    code: string;
    discountPercent: number;
    maxDiscountAmount: number | null;
}

interface CourseEnrollmentDialogProps {
    courseId: string;
    courseTitle: string;
    price: number;
    children: React.ReactNode;
}

export function CourseEnrollmentDialog({
    courseId,
    courseTitle,
    price,
    children,
}: CourseEnrollmentDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); // New state for enrollment
    const [appliedCoupon, setAppliedCoupon] = useState<CodeData | null>(null);
    const router = useRouter(); // Hook for navigation

    const calculateTotal = () => {
        if (!appliedCoupon) return price;

        let discount = (price * appliedCoupon.discountPercent) / 100;
        if (
            appliedCoupon.maxDiscountAmount !== null &&
            discount > appliedCoupon.maxDiscountAmount
        ) {
            discount = appliedCoupon.maxDiscountAmount;
        }

        return Math.max(0, price - discount);
    };

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setIsValidating(true);

        const result = await validateCoupon(couponCode);

        if (result.success && result.data) {
            setAppliedCoupon(result.data);
            toast.success("Coupon applied successfully!");
        } else {
            setAppliedCoupon(null);
            toast.error(result.error || "Invalid coupon");
        }

        setIsValidating(false);
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode("");
    };

    const handleEnrollment = async () => {
        try {
            setIsProcessing(true);
            const codeToUse = appliedCoupon ? appliedCoupon.code : undefined;
            const result = await enrollStudent(courseId, codeToUse);

            if (result.success) {
                toast.success("Enrollment successful!");
                setIsOpen(false);
                router.push(`/dashboard/student/${courseId}`);
            } else if (result.error === "Unauthorized") {
                toast.error("Please login to enroll");
                router.push("/auth?callbackUrl=" + encodeURIComponent(window.location.pathname));
            } else {
                toast.error(result.error || "Enrollment failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const total = calculateTotal();
    const discountAmount = price - total;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="bg-[#0f1111] border-white/10 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-mono text-xl">Enrollment Summary</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Review your order details for {courseTitle}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                    {/* Coupon Section */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-gray-400">
                            Promo Code
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Ticket className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="ENTER CODE"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    disabled={!!appliedCoupon}
                                    className="pl-9 bg-black border-white/20 font-mono text-white rounded-none uppercase placeholder:text-gray-600 focus-visible:ring-indigo-500"
                                />
                            </div>
                            {appliedCoupon ? (
                                <Button
                                    onClick={handleRemoveCoupon}
                                    variant="outline"
                                    className="rounded-none border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-mono"
                                >
                                    REMOVE
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleApplyCoupon}
                                    disabled={isValidating || !couponCode}
                                    className="rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-mono min-w-[80px]"
                                >
                                    {isValidating ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        "APPLY"
                                    )}
                                </Button>
                            )}
                        </div>
                        {appliedCoupon && (
                            <div className="flex items-center gap-2 text-green-400 text-xs font-mono animate-in fade-in slide-in-from-top-1">
                                <CheckCircle className="h-3 w-3" />
                                <span>Coupon applied: {appliedCoupon.discountPercent}% OFF</span>
                            </div>
                        )}
                    </div>

                    <Separator className="bg-white/10" />

                    {/* Pricing Summary */}
                    <div className="space-y-3 font-mono">
                        <div className="flex justify-between text-gray-400">
                            <span>Course Price</span>
                            <span>₹{price.toLocaleString()}</span>
                        </div>
                        {appliedCoupon && (
                            <div className="flex justify-between text-green-400">
                                <span>Discount</span>
                                <span>- ₹{Math.round(discountAmount).toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
                            <span>Total</span>
                            <span>₹{Math.round(total).toLocaleString()}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 text-right uppercase">
                            *Taxes may apply at checkout
                        </p>
                    </div>

                    <Button
                        onClick={handleEnrollment}
                        disabled={isProcessing}
                        className="w-full font-mono bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-none shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                            </>
                        ) : "Proceed to Payment"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
