"use client";

import { useEffect, useState } from "react";
import { approvePartnerApplication, rejectPartnerApplication } from "@/actions/admin/partner/action";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Check, X } from "lucide-react";

// Define a type for the application data we expect
interface Application {
    id: string;
    agencyName: string;
    email: string;
    contactNo: string;
    websiteUrl: string | null;
    status: string;
    createdAt: Date;
    // Add other fields as necessary based on your query
}

// Since this is a client component, we might need to fetch data or receive it as props.
// For simplicity in this architecture, often data is fetched in a parent server component or via a server action called in useEffect.
// However, looking at existing patterns (e.g. RecruiterApplicationTable), let's assume we fetch or pass data.
// If RecruiterApplicationTable fetches its own data, I will follow that pattern.
// Let's assume we need to fetch data here.


// Actually, it's better to fetch via server action in a real app, but for now let's see how other tables do it.
// I'll leave the data fetching part placeholder or simple for now, relying on parent or internal fetch.
// STARTING SIMPLE: Defining the component and actions.

// Assuming we pass data in or fetch it. Let's create a server action to fetch applications to keep it clean.
import { getPendingPartnerApplications } from "@/actions/admin/partner/data"; // Need to create this

export function PartnerApplicationTable() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    async function fetchApplications() {
        setLoading(true);
        try {
            // We will implement this data fetching action next
            const { data } = await getPendingPartnerApplications();
            if (data) setApplications(data);
        } catch (error) {
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    }

    async function handleApprove(id: string) {
        setProcessingId(id);
        try {
            const result = await approvePartnerApplication(id);
            if (result.success) {
                toast.success("Partner approved");
                fetchApplications();
            } else {
                toast.error(result.error);
            }
        } catch (e) {
            toast.error("Error approving partner");
        } finally {
            setProcessingId(null);
        }
    }

    async function handleReject(id: string) {
        setProcessingId(id);
        try {
            const result = await rejectPartnerApplication(id);
            if (result.success) {
                toast.success("Partner rejected");
                fetchApplications();
            } else {
                toast.error(result.error);
            }
        } catch (e) {
            toast.error("Error rejecting partner");
        } finally {
            setProcessingId(null);
        }
    }

    if (loading) return <div className="text-white p-4">Loading applications...</div>;

    if (applications.length === 0) return <div className="text-gray-400 p-4">No pending applications</div>;

    return (
        <div className="rounded-md border border-[#1a1a1a]">
            <Table>
                <TableHeader className="bg-[#0a0a0a]">
                    <TableRow className="border-[#1a1a1a] hover:bg-[#0a0a0a]">
                        <TableHead className="text-gray-400 font-sans text-xs uppercase">Agency</TableHead>
                        <TableHead className="text-gray-400 font-sans text-xs uppercase">Contact</TableHead>
                        <TableHead className="text-gray-400 font-sans text-xs uppercase">Website</TableHead>
                        <TableHead className="text-gray-400 font-sans text-xs uppercase">Date</TableHead>
                        <TableHead className="text-right text-gray-400 font-sans text-xs uppercase">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((app) => (
                        <TableRow key={app.id} className="border-[#1a1a1a] hover:bg-[#0a0a0a]">
                            <TableCell className="font-medium text-white">
                                <div>{app.agencyName}</div>
                                <div className="text-xs text-gray-500">{app.email}</div>
                            </TableCell>
                            <TableCell className="text-gray-300">{app.contactNo}</TableCell>
                            <TableCell className="text-blue-400">
                                {app.websiteUrl ? (
                                    <a href={app.websiteUrl} target="_blank" rel="noreferrer" className="underline hover:text-blue-300">
                                        Link
                                    </a>
                                ) : "-"}
                            </TableCell>
                            <TableCell className="text-gray-400 text-xs">
                                {new Date(app.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button
                                    size="sm"
                                    onClick={() => handleApprove(app.id)}
                                    disabled={!!processingId}
                                    className="bg-green-600/20 text-green-500 border border-green-600/50 hover:bg-green-600/40"
                                >
                                    {processingId === app.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => handleReject(app.id)}
                                    disabled={!!processingId}
                                    className="bg-red-600/20 text-red-500 border border-red-600/50 hover:bg-red-600/40"
                                >
                                    {processingId === app.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
