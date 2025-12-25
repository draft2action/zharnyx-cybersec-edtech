"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitMentorApplication } from "@/actions/public/mentor-applications/action";
import { toast } from "@/components/shared/toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Form Schema Definition
const applicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contactNo: z.string().min(10, "Contact number must be at least 10 digits"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  resumeUrl: z.string().url("Invalid URL"),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  experience: z
    .array(
      z.object({
        company: z.string().min(1, "Company name is required"),
        position: z.string().min(1, "Position is required"),
        duration: z.string().min(1, "Duration is required"),
      })
    )
    .optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export function MentorApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contactNo: "",
      gender: "",
      dob: "",
      address: "",
      linkedinUrl: "",
      resumeUrl: "",
      portfolioUrl: "",
      experience: [],
    },
    mode: "onChange",
  });

  const {
    register,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        dob: new Date(data.dob),
        experience: data.experience
          ? JSON.stringify(data.experience)
          : undefined,
      };

      const result = await submitMentorApplication(formattedData);

      if (result.success) {
        toast.success(result.message as string);
        router.push("/dashboard");
      } else {
        toast.error(result.error as string);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof ApplicationFormValues)[] = [];
    if (step === 1) {
      fieldsToValidate = [
        "fullName",
        "email",
        "contactNo",
        "gender",
        "dob",
        "address",
      ];
    } else if (step === 2) {
      fieldsToValidate = ["linkedinUrl", "resumeUrl", "portfolioUrl"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Card className="w-full max-w-2xl bg-black/40 border-white/10 backdrop-blur-sm text-white font-mono">
      <CardHeader>
        <CardTitle className="text-2xl">Mentor Application</CardTitle>
        <CardDescription className="text-gray-400">
          Step {step} of 3
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <FieldSet className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <FieldLegend className="text-lg font-semibold text-white">
                Personal Information
              </FieldLegend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    className="bg-black/20 border-white/10 focus:border-white/30 text-white"
                    {...register("fullName")}
                    aria-invalid={!!errors.fullName}
                  />
                  <FieldError>{errors.fullName?.message}</FieldError>
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    className="bg-black/20 border-white/10 focus:border-white/30 text-white"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  <FieldError>{errors.email?.message}</FieldError>
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="contactNo">Contact No</FieldLabel>
                  <Input
                    id="contactNo"
                    placeholder="+1234567890"
                    className="bg-black/20 border-white/10 focus:border-white/30 text-white"
                    {...register("contactNo")}
                    aria-invalid={!!errors.contactNo}
                  />
                  <FieldError>{errors.contactNo?.message}</FieldError>
                </Field>
                <Field>
                  <FieldLabel htmlFor="gender">Gender</FieldLabel>
                  <Input
                    id="gender"
                    placeholder="Male/Female/Other"
                    className="bg-black/20 border-white/10 focus:border-white/30 text-white"
                    {...register("gender")}
                    aria-invalid={!!errors.gender}
                  />
                  <FieldError>{errors.gender?.message}</FieldError>
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
                  <Input
                    id="dob"
                    type="date"
                    className="bg-black/20 border-white/10 focus:border-white/30 text-white block"
                    {...register("dob")}
                    aria-invalid={!!errors.dob}
                  />
                  <FieldError>{errors.dob?.message}</FieldError>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Textarea
                  id="address"
                  placeholder="123 Main St..."
                  className="bg-black/20 border-white/10 focus:border-white/30 text-white"
                  {...register("address")}
                  aria-invalid={!!errors.address}
                />
                <FieldError>{errors.address?.message}</FieldError>
              </Field>
            </FieldSet>
          )}

          {/* Step 2: Professional Info */}
          {step === 2 && (
            <FieldSet className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <FieldLegend className="text-lg font-semibold text-white">
                Professional Details
              </FieldLegend>
              <Field>
                <FieldLabel htmlFor="linkedinUrl">
                  LinkedIn URL (Optional)
                </FieldLabel>
                <Input
                  id="linkedinUrl"
                  placeholder="https://linkedin.com/in/..."
                  className="bg-black/20 border-white/10 focus:border-white/30 text-white"
                  {...register("linkedinUrl")}
                  aria-invalid={!!errors.linkedinUrl}
                />
                <FieldError>{errors.linkedinUrl?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="resumeUrl">
                  Resume URL (Google Drive/Dropbox link)
                </FieldLabel>
                <Input
                  id="resumeUrl"
                  placeholder="https://..."
                  className="bg-black/20 border-white/10 focus:border-white/30 text-white"
                  {...register("resumeUrl")}
                  aria-invalid={!!errors.resumeUrl}
                />
                <FieldError>{errors.resumeUrl?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="portfolioUrl">
                  Portfolio URL (Optional)
                </FieldLabel>
                <Input
                  id="portfolioUrl"
                  placeholder="https://..."
                  className="bg-black/20 border-white/10 focus:border-white/30 text-white"
                  {...register("portfolioUrl")}
                  aria-invalid={!!errors.portfolioUrl}
                />
                <FieldError>{errors.portfolioUrl?.message}</FieldError>
              </Field>
            </FieldSet>
          )}

          {/* Step 3: Experience */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-sm text-gray-400 mb-4">
                Optional: Add your relevant work experience. You can submit
                without adding any.
              </div>
              <p className="text-gray-500 italic">
                Experience fields are optional. Click Submit to finish.
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="bg-transparent text-white border-white/20 hover:bg-white/10"
              >
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-white text-black hover:bg-gray-200"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white text-black hover:bg-gray-200"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
