"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitRecruiterApplication, RecruiterApplicationValues } from "@/actions/recruiter/apply";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { Label } from "@/components/ui/label";

const schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  companyName: z.string().min(1, "Company Name is required"),
  position: z.string().min(1, "Position is required"),
  contactNo: z.string().min(1, "Contact Number is required"),
  linkedinUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
});

export default function RecruiterApplyPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RecruiterApplicationValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RecruiterApplicationValues) => {
    const result = await submitRecruiterApplication(data);
    if (result.success) {
      toast.success(result.message);
      router.push("/dashboard"); // Redirect to dashboard or success page
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
        <AnimatedBackground />
        <div className="flex justify-center items-center min-h-screen p-4 relative z-10">
        <Card className="w-full max-w-lg bg-black/40 border-white/10 text-white backdrop-blur-sm">
            <CardHeader>
            <CardTitle className="font-mono text-2xl text-center">Recruiter Application</CardTitle>
            <CardDescription className="text-gray-400 font-mono text-center">
                Apply to access our top talent.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-mono">
                <div className="space-y-1">
                <Label>Full Name</Label>
                <Input {...register("fullName")} className="bg-black/40 border-white/10 text-white" />
                {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-1">
                <Label>Email</Label>
                <Input {...register("email")} type="email" className="bg-black/40 border-white/10 text-white" />
                {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                <Label>Company Name</Label>
                <Input {...register("companyName")} className="bg-black/40 border-white/10 text-white" />
                {errors.companyName && <p className="text-red-400 text-xs">{errors.companyName.message}</p>}
                </div>

                <div className="space-y-1">
                <Label>Position / Role</Label>
                <Input {...register("position")} className="bg-black/40 border-white/10 text-white" />
                {errors.position && <p className="text-red-400 text-xs">{errors.position.message}</p>}
                </div>

                <div className="space-y-1">
                <Label>Contact Number</Label>
                <Input {...register("contactNo")} className="bg-black/40 border-white/10 text-white" />
                {errors.contactNo && <p className="text-red-400 text-xs">{errors.contactNo.message}</p>}
                </div>

                <div className="space-y-1">
                <Label>LinkedIn URL (Optional)</Label>
                <Input {...register("linkedinUrl")} className="bg-black/40 border-white/10 text-white" />
                </div>

                <div className="space-y-1">
                <Label>Website URL (Optional)</Label>
                <Input {...register("websiteUrl")} className="bg-black/40 border-white/10 text-white" />
                </div>

                <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
            </form>
            </CardContent>
        </Card>
        </div>
    </>
  );
}
