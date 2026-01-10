"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Send,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  FileText,
  Check,
} from "lucide-react";
import { submitRecruiterApplication } from "@/actions/recruiter/apply";
import { useRouter } from "next/navigation";

export function RecruiterApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    position: "",
    contactNo: "",
    linkedinUrl: "",
    websiteUrl: "",
    // The following are not in schema but useful for email/notification if we had it, or we ignore them for now.
    // Actually schema doesn't store 'requirements' or 'volume' in JSON, it just creates a recruiter application.
    // We might want to fix schema later, but for now strict compliance to current schema.
    // Wait, schema has: fullName, email, companyName, position, contactNo, linkedinUrl, websiteUrl.
    // It does NOT have requirements field. I will respect the schema strictly.
  });

  // We can just keep the "Requirements" step as a UI dummy or append it to one of the text fields if we wanted to save it.
  // However, the user asked to match schema. So I will ensure the fields that ARE in schema are collected.

  // I will map inputs to state.

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitRecruiterApplication(formData);

      if (result.success) {
        alert("Application Submitted Successfully");
        router.push("/apply");
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Submission Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 flex items-center justify-center border-2 font-black font-mono transition-all duration-300 ${
                  step >= s
                    ? "border-blue-500 bg-blue-500 text-white shadow-[0_0_10px_#2563eb]"
                    : "border-zinc-800 bg-black text-zinc-600"
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider ${
                  step >= s ? "text-blue-400" : "text-zinc-700"
                }`}
              >
                {s === 1 ? "Organization" : s === 2 ? "Contact" : "Review"}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-zinc-900 w-full relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_10px_#2563eb]"
            initial={{ width: "0%" }}
            animate={{ width: `${((step - 1) / 2) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-2 border-white/20 bg-black p-8 md:p-12 relative overflow-hidden shadow-[8px_8px_0px_0px_#2563eb]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-50"></div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 border border-blue-500/30 bg-blue-500/10 text-blue-500">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Organization Profile
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-xs text-blue-500 uppercase font-black tracking-widest pl-1">
                    Organization Name
                  </Label>
                  <Input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    placeholder="ENTER_ORG_NAME"
                    className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#2563eb] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-blue-500 uppercase font-black tracking-widest pl-1">
                    Website Coordinates
                  </Label>
                  <Input
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    placeholder="HTTPS://COMPANY.COM"
                    className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#2563eb] transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 border border-blue-500/30 bg-blue-500/10 text-blue-500">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Recruiter Details
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-xs text-blue-500 uppercase font-black tracking-widest pl-1">
                    Your Full Name
                  </Label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="ENTER_NAME"
                    className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#2563eb] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-blue-500 uppercase font-black tracking-widest pl-1">
                    Position / Role
                  </Label>
                  <Input
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    placeholder="HR_MANAGER / CTO"
                    className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#2563eb] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-blue-500 uppercase font-black tracking-widest pl-1">
                    Work Email
                  </Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    type="email"
                    placeholder="ENTER_WORK_EMAIL"
                    className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#2563eb] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-blue-500 uppercase font-black tracking-widest pl-1">
                    Contact No
                  </Label>
                  <Input
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    required
                    placeholder="+91..."
                    className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#2563eb] transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 border border-blue-500/30 bg-blue-500/10 text-blue-500">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Social Profile
                </h2>
              </div>
              <div className="space-y-3">
                <Label className="text-xs text-blue-500 uppercase font-black tracking-widest pl-1">
                  LinkedIn URL
                </Label>
                <Input
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  placeholder="HTTPS://LINKEDIN..."
                  className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#2563eb] transition-all"
                />
              </div>
              <div className="text-sm text-zinc-500 font-mono mt-4">
                * Note: Additional requirements can be discussed during the
                onboarding call. This form initializes the partnership entity
                record.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-12 pt-8 border-t-2 border-zinc-900">
          <Button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="bg-black text-white border-2 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 font-bold uppercase tracking-wider rounded-none w-32 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back
          </Button>

          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white border-2 border-white hover:bg-blue-700 hover:border-blue-400 hover:shadow-[4px_4px_0px_0px_white] font-black uppercase tracking-wider rounded-none w-32 h-12 transition-all"
            >
              Next <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black border-2 border-blue-600 hover:bg-zinc-200 hover:shadow-[4px_4px_0px_0px_#2563eb] font-black uppercase tracking-wider rounded-none min-w-40 h-12 transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Request Deployment"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
