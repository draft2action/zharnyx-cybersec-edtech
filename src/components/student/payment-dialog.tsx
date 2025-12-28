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
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const result = await enrollStudent(courseId);

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
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This is a mock payment screen. Clicking &quot;Pay & Enroll&quot;
            will instantly enroll you in the course.
          </p>
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
