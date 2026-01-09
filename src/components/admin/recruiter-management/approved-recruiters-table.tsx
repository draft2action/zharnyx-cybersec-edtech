"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getApprovedRecruiters } from "@/actions/admin/recruiter/action";

export function ApprovedRecruitersTable() {
    const [recruiters, setRecruiters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const res = await getApprovedRecruiters();
            if (res.success && res.data) {
                setRecruiters(res.data);
            }
            setLoading(false);
        }
        load();
    }, []);

    if (loading) return <div className="text-white font-mono p-4">Loading recruiters...</div>;

    return (
        <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm mt-8">
            <CardHeader>
                <CardTitle className="font-mono text-lg">Active Recruiters</CardTitle>
                <CardDescription className="text-gray-400 font-mono">
                    Currently active recruiters in the system.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="font-mono text-white">Name</TableHead>
                            <TableHead className="font-mono text-white">Email</TableHead>
                            <TableHead className="font-mono text-white">Role</TableHead>
                            <TableHead className="font-mono text-white">Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recruiters.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center font-mono text-gray-500">
                                    No active recruiters found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            recruiters.map((recruiter) => (
                                <TableRow key={recruiter.id} className="border-white/10 hover:bg-white/5 font-mono">
                                    <TableCell className="font-medium text-white">{recruiter.name || "N/A"}</TableCell>
                                    <TableCell className="text-gray-300">{recruiter.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-purple-500/30 text-purple-400">Recruiter</Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-400">
                                         {recruiter.createdAt ? new Date(recruiter.createdAt).toLocaleDateString() : "-"}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
