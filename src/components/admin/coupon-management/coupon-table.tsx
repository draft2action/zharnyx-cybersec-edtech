"use strict";
"use client";

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, Power } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  deleteCoupon,
  toggleCouponStatus,
} from "@/actions/admin/coupons/action"; // You might need to adjust import path
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Import Sheet components
// import { CouponForm } from "./coupon-form"; // Import CouponForm
import { CouponForm } from "./coupon-form";
import { toast } from "sonner"; // Assuming sonner is used for toasts, or use your toast hook

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
}

interface CouponTableProps {
  initialData: Coupon[];
  onRefresh?: () => void;
}

export function CouponTable({ initialData, onRefresh }: CouponTableProps) {
  // const [coupons] = useState<Coupon[]>(initialData);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      const res = await deleteCoupon(id);
      if (res.success) {
        toast.success(res.message);
        onRefresh?.();
      } else {
        toast.error(res.message);
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const res = await toggleCouponStatus(id, !currentStatus);
    if (res.success) {
      toast.success(res.message);
      onRefresh?.();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expires At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center h-24 text-muted-foreground"
              >
                No coupons found.
              </TableCell>
            </TableRow>
          ) : (
            initialData.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell className="font-medium font-mono">
                  {coupon.code}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold">{coupon.discountPercent}%</span>
                    {coupon.maxDiscountAmount && (
                      <span className="text-xs text-muted-foreground">
                        Max ₹{coupon.maxDiscountAmount}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {coupon.usedCount} /{" "}
                  {coupon.maxUses === null ? "∞" : coupon.maxUses}
                </TableCell>
                <TableCell>
                  <Badge variant={coupon.isActive ? "default" : "secondary"}>
                    {coupon.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {coupon.expiresAt
                    ? format(new Date(coupon.expiresAt), "PPP")
                    : "Never"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <Sheet>
                        <SheetTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Edit Coupon</SheetTitle>
                            <SheetDescription>
                              Update coupon details.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-6">
                            <CouponForm coupon={coupon} onSuccess={onRefresh} />
                          </div>
                        </SheetContent>
                      </Sheet>

                      <DropdownMenuItem
                        onClick={() =>
                          handleToggleStatus(coupon.id, coupon.isActive)
                        }
                      >
                        <Power className="mr-2 h-4 w-4" />{" "}
                        {coupon.isActive ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(coupon.id)}
                        className="text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
