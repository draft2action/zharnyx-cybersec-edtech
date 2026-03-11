"use client";

import { useEffect, useState } from "react";
import { getPartnerStats } from "@/actions/admin/partner/data";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface PartnerStat {
    partnerId: string;
    agencyName: string;
    couponName: string; // coupon code or title? Usually code.
    uses: number;
    revenueShare: number;
    totalRevenue: number;
}

export function PartnerTable() {
    const [stats, setStats] = useState<PartnerStat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const { data } = await getPartnerStats();
                if (data) setStats(data);
            } catch (error) {
                toast.error("Failed to load partner stats");
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <div className="text-white p-4">Loading partner stats...</div>;

    if (stats.length === 0) return <div className="text-gray-400 p-4">No partner data available</div>;

    return (
        <div className="rounded-md border border-[#1a1a1a] bg-[#0a0a0a]">
            <Table>
                <TableHeader className="bg-[#0a0a0a]">
                    <TableRow className="border-[#1a1a1a] hover:bg-[#0a0a0a]">
                        <TableHead className="text-gray-400 font-sans text-xs uppercase">Agency Name</TableHead>
                        <TableHead className="text-gray-400 font-sans text-xs uppercase">Coupon Code</TableHead>
                        <TableHead className="text-gray-400 font-sans text-xs uppercase text-right">Uses</TableHead>
                        <TableHead className="text-gray-400 font-sans text-xs uppercase text-right">Rev. Share</TableHead>
                        <TableHead className="text-gray-400 font-sans text-xs uppercase text-right">Total Revenue</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stats.map((stat, index) => (
                        <TableRow key={index} className="border-[#1a1a1a] hover:bg-[#0a0a0a]">
                            <TableCell className="font-medium text-white">{stat.agencyName}</TableCell>
                            <TableCell className="text-blue-400 font-sans">{stat.couponName}</TableCell>
                            <TableCell className="text-white text-right">{stat.uses}</TableCell>
                            <TableCell className="text-gray-400 text-right">₹{stat.revenueShare}</TableCell>
                            <TableCell className="text-green-500 font-bold text-right">₹{stat.totalRevenue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
