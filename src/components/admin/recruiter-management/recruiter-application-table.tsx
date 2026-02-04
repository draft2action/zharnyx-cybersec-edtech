"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRecruiterApplications, updateRecruiterApplicationStatus } from "@/actions/admin/recruiter/action";
import { toast } from "sonner";
import { Loader2, Check, X, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

type Application = {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  position: string;
  contactNo: string;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
};

export function RecruiterApplicationTable() {
  const [data, setData] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const result = await getRecruiterApplications();
    if (result.success && result.data) {
      setData(result.data as Application[]);
    } else {
      toast.error(result.error || "Failed to fetch applications");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id: string, status: "approved" | "rejected") => {
    const result = await updateRecruiterApplicationStatus(id, status);
    if (result.success) {
      toast.success(result.message);
      fetchData();
    } else {
      toast.error(result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="rounded-md border border-white/10 overflow-x-auto">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-white/5">
            <TableHead className="font-mono text-white">Recruiter</TableHead>
            <TableHead className="font-mono text-white">Company</TableHead>
            <TableHead className="font-mono text-white">Contact</TableHead>
            <TableHead className="font-mono text-white">Links</TableHead>
            <TableHead className="font-mono text-white">Status</TableHead>
            <TableHead className="font-mono text-white text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableCell colSpan={6} className="h-24 text-center font-mono text-gray-400">
                No applications found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((app) => (
              <TableRow key={app.id} className="border-white/10 hover:bg-white/5 font-mono">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{app.fullName}</span>
                    <span className="text-xs text-gray-500">{app.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-white">{app.companyName}</span>
                    <span className="text-xs text-gray-500">{app.position}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">{app.contactNo}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {app.linkedinUrl && (
                      <Link href={app.linkedinUrl} target="_blank" className="text-blue-400 hover:text-blue-300">
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    )}
                    {app.websiteUrl && (
                      <Link href={app.websiteUrl} target="_blank" className="text-green-400 hover:text-green-300">
                        <Globe className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={app.status === 'approved' ? 'default' : app.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {app.status === 'pending' && (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-green-500 border-green-500/20 hover:bg-green-500/10" onClick={() => handleStatusUpdate(app.id, 'approved')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500 border-red-500/20 hover:bg-red-500/10" onClick={() => handleStatusUpdate(app.id, 'rejected')}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
