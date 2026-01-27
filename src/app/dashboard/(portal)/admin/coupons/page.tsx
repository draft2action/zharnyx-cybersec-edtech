import { getCoupons } from "@/actions/admin/coupons/action";
import { CouponTable } from "@/components/admin/coupon-management/coupon-table";
import { CouponForm } from "@/components/admin/coupon-management/coupon-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const dynamic = "force-dynamic";

export default async function CouponManagementPage() {
  const { data: coupons } = await getCoupons();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Coupon Management
          </h2>
          <p className="text-muted-foreground">
            Manage discount coupons for courses.
          </p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Coupon
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create Coupon</SheetTitle>
              <SheetDescription>Add a new discount coupon.</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <CouponForm />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <CouponTable initialData={coupons || []} />
    </div>
  );
}
