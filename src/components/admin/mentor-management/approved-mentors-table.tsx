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
import { getApprovedMentors } from "@/actions/admin/mentor-management/action";

export function ApprovedMentorsTable() {
    const [mentors, setMentors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const res = await getApprovedMentors();
            if (res.success && res.data) {
                setMentors(res.data);
            }
            setLoading(false);
        }
        load();
    }, []);

    if (loading) return <div className="text-white font-mono p-4">Loading mentors...</div>;

    return (
        <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm mt-8">
            <CardHeader>
                <CardTitle className="font-mono text-lg">Active Mentors</CardTitle>
                <CardDescription className="text-gray-400 font-mono">
                    Currently active mentors in the system.
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
                        {mentors.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center font-mono text-gray-500">
                                    No active mentors found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            mentors.map((mentor) => (
                                <TableRow key={mentor.id} className="border-white/10 hover:bg-white/5 font-mono">
                                    <TableCell className="font-medium text-white">{mentor.name || "N/A"}</TableCell>
                                    <TableCell className="text-gray-300">{mentor.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-blue-500/30 text-blue-400">Mentor</Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-400">
                                         {/* Date formatting if available, currently just schema fallback */}
                                         {mentor.createdAt ? new Date(mentor.createdAt).toLocaleDateString() : "-"}
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
