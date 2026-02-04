"use client";

import { useState, useEffect, useCallback } from "react";
import { CouponTable } from "./coupon-table";
import { CouponForm } from "./coupon-form";
import { Button } from "@/components/ui/button";
import { Plus, Ticket } from "lucide-react";
import { getCoupons } from "@/actions/admin/coupons/action"; // Import server action
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  maxDiscountAmount: number | null;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export function CouponManager() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  const fetchCoupons = useCallback(async () => {
    const res = await getCoupons();
    if (res.success && res.data) {
      setCoupons(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchCoupons();
    };
    init();
  }, [fetchCoupons]);

  return (
    <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10] pt-0">
      <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="w-4 h-4 text-green-500" />
            <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
              Coupon Management
            </CardTitle>
          </div>
          <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
            Create and manage discount coupons.
          </CardDescription>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="font-mono bg-white text-black hover:bg-gray-200">
              <Plus className="mr-2 h-4 w-4" /> Create Coupon
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create Coupon</SheetTitle>
              <SheetDescription>Details for the new coupon.</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <CouponForm onSuccess={fetchCoupons} />
            </div>
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6">
          <CouponTable initialData={coupons} onRefresh={fetchCoupons} />
          {/* Note: CouponTable actions might want to trigger a refresh. 
                Ideally pass 'onRefresh={fetchCoupons}' to CouponTable if we want live updates without page reload, 
                or rely on server action revalidatePath + router.refresh if we were fully server-rendered.
                Since we are fetching client side here, passing a refresh callback is best. 
            */}
        </div>
      </CardContent>
    </Card>
  );
}
