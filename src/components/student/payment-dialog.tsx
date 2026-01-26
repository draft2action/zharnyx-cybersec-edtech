"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { enrollStudent } from "@/actions/student/enrollment";
import { verifyCoupon } from "@/actions/coupon/verify";
import { Input } from "@/components/ui/input";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  courseTitle: string;
}

export function PaymentDialog({
  open,
  onOpenChange,
  courseId,
  courseTitle,
}: PaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [isCouponVerified, setIsCouponVerified] = useState(false);
  const [discountDetails, setDiscountDetails] = useState<{
    discountPercent: number;
    maxDiscountAmount: number | null;
  } | null>(null);

  const router = useRouter();

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsVerifying(true);
    setCouponMessage("");
    try {
      const result = await verifyCoupon(couponCode);
      if (result.valid) {
        setIsCouponVerified(true);
        setDiscountDetails({
          discountPercent: result.discountPercent!,
          maxDiscountAmount: result.maxDiscountAmount!,
        });
        setCouponMessage("Coupon applied successfully!");
      } else {
        setIsCouponVerified(false);
        setDiscountDetails(null);
        setCouponMessage(result.message || "Invalid coupon");
      }
    } catch (error) {
      console.error(error);
      setCouponMessage("Error verifying coupon");
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      // Pass couponCode only if verified
      const codeToUse = isCouponVerified ? couponCode : undefined;
      const result = await enrollStudent(courseId, codeToUse);

      if (result.success) {
        toast.success("Enrollment successful!");
        onOpenChange(false);
        router.push(`/dashboard/student/${courseId}`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Enrollment</DialogTitle>
          <DialogDescription>
            You are about to enroll in <strong>{courseTitle}</strong>. Proceed
            to payment?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            This is a mock payment screen. Clicking &quot;Pay & Enroll&quot;
            will instantly enroll you in the course.
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium">Have a coupon code?</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={isProcessing || isCouponVerified}
              />
              <Button
                variant="secondary"
                onClick={handleApplyCoupon}
                disabled={isProcessing || !couponCode || isCouponVerified}
              >
                {isVerifying ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isCouponVerified ? (
                  "Applied"
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
            {couponMessage && (
              <p
                className={`text-xs ${isCouponVerified ? "text-green-500" : "text-red-500"
                  }`}
              >
                {couponMessage}
              </p>
            )}
            {discountDetails && (
              <div className="text-sm bg-green-500/10 border border-green-500/20 p-2 rounded text-green-500">
                Discount applied: {discountDetails.discountPercent}% OFF
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Pay & Enroll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
