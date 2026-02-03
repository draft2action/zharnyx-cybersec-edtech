import { getCurrentSession } from "@/lib/auth/role-guard";
import { redirect } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/lib/db";
import { coupon } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PartnerOverview } from "@/components/partner/partner-overview";
import { PartnerCoupons } from "@/components/partner/partner-coupons";
import { PartnerSettings } from "@/components/partner/partner-settings";
import { PartnerCoupon } from "@/components/partner/columns";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function PartnerDashboardPage(props: {
    searchParams: SearchParams
}) {
    const searchParams = await props.searchParams
    const session = await getCurrentSession();

    if (!session || (session.user.role !== "partner_agency" && session.user.role !== "admin")) {
        redirect("/dashboard");
    }

    // Fetch partner's coupons
    const partnerCoupons = await db.query.coupon.findMany({
        where: eq(coupon.partnerId, session.user.id),
    });

    const totalUses = partnerCoupons.reduce((sum, c) => sum + (c.usedCount || 0), 0);
    const totalRevenue = partnerCoupons.reduce((sum, c) => sum + ((c.usedCount || 0) * (c.partnerRevenue || 0)), 0);

    const section = typeof searchParams.section === 'string' ? searchParams.section : 'overview';

    const formattedCoupons: PartnerCoupon[] = partnerCoupons.map(c => ({
        id: c.id,
        code: c.code,
        discountPercent: c.discountPercent,
        partnerRevenue: c.partnerRevenue || 0,
        usedCount: c.usedCount || 0,
        isActive: c.isActive !== false
    }));

    return (
        <div className="flex min-h-screen w-full bg-black font-sans">
            <div className="relative flex flex-col flex-1 z-10 w-full pl-6 pr-6 pb-6 pt-4">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-white/20">
                    <div className="flex items-start gap-4">
                        <SidebarTrigger className="text-white hover:bg-white/10 md:hidden border-2 border-white/20 rounded-none h-10 w-10 shrink-0" />
                        <div className="flex flex-col">
                            <h1 className="text-4xl font-black font-mono text-white uppercase tracking-tighter leading-none">
                                Partner Portal
                            </h1>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="bg-green-600 text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
                                    Active
                                </span>
                                <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                                    {"// Agency: "}
                                    {session.user.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {section === 'overview' && (
                    <PartnerOverview
                        totalRevenue={totalRevenue}
                        totalUses={totalUses}
                        activeCouponsCount={partnerCoupons.length}
                    />
                )}

                {section === 'coupons' && (
                    <PartnerCoupons initialCoupons={formattedCoupons} />
                )}

                {section === 'settings' && (
                    <PartnerSettings userName={session.user.name} userEmail={session.user.email} />
                )}
            </div>
        </div>
    );
}
