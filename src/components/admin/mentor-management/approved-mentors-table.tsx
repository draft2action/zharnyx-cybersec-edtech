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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getApprovedMentors } from "@/actions/admin/mentor-management/action";

interface Mentor {
  id: string;
  name: string | null;
  email: string;
  createdAt?: Date | null;
}

export function ApprovedMentorsTable() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
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

  if (loading)
    return <div className="text-white font-sans p-4">Loading mentors...</div>;

  return (
    <Card className="bg-[#0a0a0a] border border-[#1a1a1a] text-white rounded-xl  mt-8">
      <CardHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a] pb-4 pt-4">
        <div className="flex items-center gap-2 mb-1">
          <CardTitle className="font-sans text-xl text-white uppercase tracking-wide">
            Active Mentors
          </CardTitle>
        </div>
        <CardDescription className="text-gray-400 font-sans text-xs uppercase tracking-wider">
          Currently active mentors in the system.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-[#0a0a0a] border-b border-[#1a1a1a]">
            <TableRow className="border-[#1a1a1a] hover:bg-transparent">
              <TableHead className="text-white font-sans text-xs font-bold uppercase tracking-widest h-12">
                Name
              </TableHead>
              <TableHead className="text-white font-sans text-xs font-bold uppercase tracking-widest h-12">
                Email
              </TableHead>
              <TableHead className="text-white font-sans text-xs font-bold uppercase tracking-widest h-12">
                Role
              </TableHead>
              <TableHead className="text-white font-sans text-xs font-bold uppercase tracking-widest h-12">
                Joined
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mentors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center font-sans text-gray-500 uppercase tracking-widest text-xs"
                >
                  No active mentors found.
                </TableCell>
              </TableRow>
            ) : (
              mentors.map((mentor) => (
                <TableRow
                  key={mentor.id}
                  className="border-b border-[#1a1a1a] hover:bg-[#0a0a0a] transition-colors font-sans"
                >
                  <TableCell className="font-bold text-white text-sm py-4 border-r border-white/5">
                    {mentor.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-300 text-sm py-4 border-r border-white/5">
                    {mentor.email}
                  </TableCell>
                  <TableCell className="border-r border-white/5 py-4">
                    <Badge
                      variant="outline"
                      className="border-blue-500 text-blue-400 rounded-xl uppercase text-[10px] tracking-wider font-bold bg-blue-500/10"
                    >
                      Mentor
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400 text-xs py-4">
                    {/* Date formatting if available, currently just schema fallback */}
                    {mentor.createdAt
                      ? new Date(mentor.createdAt).toLocaleDateString()
                      : "-"}
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
