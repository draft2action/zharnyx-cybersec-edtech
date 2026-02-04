"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox"; // Removing unused if we use Switch or just keeping it
import { Switch } from "@/components/ui/switch"; // Let's use Switch for better UI
import { createCoupon, updateCoupon } from "@/actions/admin/coupons/action";
import { getPartners } from "@/actions/admin/partner/options";
import { toast } from "sonner";
import {
  Loader2,
  Ticket,
  Percent,
  Hash,
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";

interface CouponFormProps {
  coupon?: {
    id: string;
    code: string;
    discountPercent: number;
    maxDiscountAmount: number | null;
    maxUses: number | null;
    isActive: boolean;
    expiresAt: Date | null;
    partnerId?: string | null;
    partnerRevenue?: number | null;
  };
  onSuccess?: () => void;
}

export function CouponForm({ coupon, onSuccess }: CouponFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(coupon ? coupon.isActive : true);
  const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);
  const [showRevenueInput, setShowRevenueInput] = useState(!!coupon?.partnerId);

  useEffect(() => {
    async function fetchPartners() {
      const { data } = await getPartners();
      if (data) {
        setPartners(data.map(p => ({ id: p.id, name: p.name })));
      }
    }
    fetchPartners();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const res = coupon
        ? await updateCoupon(coupon.id, formData)
        : await createCoupon(formData);

      if (res.success) {
        toast.success(res.message);
        onSuccess?.();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _ = error;
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Code Section */}
      <div className="space-y-2">
        <Label
          htmlFor="code"
          className="text-xs font-mono uppercase tracking-widest text-gray-500"
        >
          Coupon Code
        </Label>
        <div className="relative">
          <Ticket className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="code"
            name="code"
            placeholder="e.g. SUMMER2024"
            defaultValue={coupon?.code}
            required
            className="pl-9 font-mono uppercase"
          />
        </div>
        <p className="text-[10px] text-muted-foreground">
          Unique code that students will enter at checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Discount Percent */}
        <div className="space-y-2">
          <Label
            htmlFor="discountPercent"
            className="text-xs font-mono uppercase tracking-widest text-gray-500"
          >
            Discount %
          </Label>
          <div className="relative">
            <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="discountPercent"
              name="discountPercent"
              type="number"
              min="1"
              max="100"
              placeholder="20"
              defaultValue={coupon?.discountPercent}
              required
              className="pl-9"
            />
          </div>
        </div>

        {/* Max Discount Amount */}
        <div className="space-y-2">
          <Label
            htmlFor="maxDiscountAmount"
            className="text-xs font-mono uppercase tracking-widest text-gray-500"
          >
            Max Amount (₹)
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="maxDiscountAmount"
              name="maxDiscountAmount"
              type="number"
              min="1"
              placeholder="500"
              defaultValue={coupon?.maxDiscountAmount || ""}
              className="pl-9"
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            Cap the discount value.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Max Uses */}
        <div className="space-y-2">
          <Label
            htmlFor="maxUses"
            className="text-xs font-mono uppercase tracking-widest text-gray-500"
          >
            Max Uses
          </Label>
          <div className="relative">
            <Hash className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="maxUses"
              name="maxUses"
              type="number"
              min="1"
              placeholder="∞"
              defaultValue={coupon?.maxUses || ""}
              className="pl-9"
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            Leave empty for unlimited.
          </p>
        </div>

        {/* Expires At */}
        <div className="space-y-2">
          <Label
            htmlFor="expiresAt"
            className="text-xs font-mono uppercase tracking-widest text-gray-500"
          >
            Expiry Date
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="expiresAt"
              name="expiresAt"
              type="date"
              defaultValue={
                coupon?.expiresAt
                  ? new Date(coupon.expiresAt).toISOString().split("T")[0]
                  : ""
              }
              className="pl-9"
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            Optional expiry date.
          </p>
        </div>
      </div>

      {/* Partner Agency Section */}
      <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-4">
        <div className="space-y-2">
          <Label
            htmlFor="partnerId"
            className="text-xs font-mono uppercase tracking-widest text-gray-500"
          >
            Partner Agency
          </Label>
          <div className="relative">
            <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <select
              id="partnerId"
              name="partnerId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={coupon?.partnerId || ""}
              onChange={(e) => setShowRevenueInput(!!e.target.value)}
            >
              <option value="">None</option>
              {partners.map((partner) => (
                <option key={partner.id} value={partner.id}>
                  {partner.name}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            Assign to a partner agency.
          </p>
        </div>

        {/* Partner Revenue */}
        {showRevenueInput && (
          <div className="space-y-2">
            <Label
              htmlFor="partnerRevenue"
              className="text-xs font-mono uppercase tracking-widest text-gray-500"
            >
              Partner Revenue (₹)
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="partnerRevenue"
                name="partnerRevenue"
                type="number"
                min="0"
                placeholder="200"
                defaultValue={coupon?.partnerRevenue || ""}
                className="pl-9"
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Amount partner gets per use.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between rounded-lg border p-3 border-white/10 bg-white/5">
        <div className="space-y-0.5">
          <Label htmlFor="isActive" className="text-sm font-medium">
            Active Status
          </Label>
          <p className="text-xs text-muted-foreground">
            Enable or disable this coupon.
          </p>
        </div>
        <Switch
          id="isActive"
          name="isActive"
          checked={isActive}
          onCheckedChange={setIsActive}
        />
        <input type="hidden" name="isActive" value={isActive ? "on" : "off"} />
      </div>

      <Button
        type="submit"
        className="w-full bg-white text-black hover:bg-gray-200 font-mono font-bold"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : coupon ? (
          "Update Coupon"
        ) : (
          "Create Coupon"
        )}
      </Button>
    </form>
  );
}
