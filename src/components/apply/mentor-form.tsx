"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  User,
  Shield,
  FileText,
} from "lucide-react";
import { submitMentorApplication } from "@/actions/mentor/apply";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming sonner is installed, or valid toast

export function MentorApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    gender: "Male",
    dob: "",
    address: "",
    linkedinUrl: "",
    resumeUrl: "",
    portfolioUrl: "",
    experience: "", // Will be treated as manifesto/brief for now or JSON
  });

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
      const result = await submitMentorApplication({
        ...formData,
        dob: new Date(formData.dob),
        experience: JSON.stringify({ manifesto: formData.experience }), // Storing text as JSON for schema
      });

      if (result.success) {
        alert("Application Transmitted Successfully"); // Replace with toast if available
        router.push("/apply");
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Transmission Failed");
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
                    ? "border-purple-500 bg-purple-500 text-white shadow-[0_0_10px_#9333ea]"
                    : "border-zinc-800 bg-black text-zinc-600"
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider ${
                  step >= s ? "text-purple-400" : "text-zinc-700"
                }`}
              >
                {s === 1 ? "Identity" : s === 2 ? "Details" : "Manifesto"}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-zinc-900 w-full relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-purple-500 shadow-[0_0_10px_#9333ea]"
            initial={{ width: "0%" }}
            animate={{ width: `${((step - 1) / 2) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-2 border-white/20 bg-black p-8 md:p-12 relative overflow-hidden shadow-[8px_8px_0px_0px_#9333ea]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-50"></div>

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
                <div className="p-2 border border-purple-500/30 bg-purple-500/10 text-purple-500">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Operator Identity
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-xs text-purple-500 uppercase font-black tracking-widest pl-1">
                    Full Name
                  </Label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="ENTER_NAME"
                    className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#9333ea] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-purple-500 uppercase font-black tracking-widest pl-1">
                    Email Coordinates
                  </Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    type="email"
                    placeholder="ENTER_EMAIL"
                    className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#9333ea] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-purple-500 uppercase font-black tracking-widest pl-1">
                    Contact No
                  </Label>
                  <Input
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    required
                    placeholder="+91..."
                    className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#9333ea] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-purple-500 uppercase font-black tracking-widest pl-1">
                    Date of Birth
                  </Label>
                  <Input
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                    type="date"
                    className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#9333ea] transition-all invert-calendar-icon"
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
                <div className="p-2 border border-purple-500/30 bg-purple-500/10 text-purple-500">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Personal Details
                </h2>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-xs text-purple-500 uppercase font-black tracking-widest pl-1">
                      Gender
                    </Label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none px-3 font-mono focus:border-purple-500 focus:outline-none focus:shadow-[4px_4px_0px_0px_#9333ea] transition-all"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs text-purple-500 uppercase font-black tracking-widest pl-1">
                      LinkedIn Uplink
                    </Label>
                    <Input
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      placeholder="HTTPS://LINKEDIN.COM/IN/..."
                      className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#9333ea] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs text-purple-500 uppercase font-black tracking-widest pl-1">
                    Residential Address
                  </Label>
                  <Textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="FULL_ADDRESS_COORDINATES"
                    className="bg-zinc-950 border-2 border-zinc-800 text-white min-h-[80px] rounded-none focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#9333ea] transition-all resize-none p-4"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-xs text-purple-500 uppercase font-black tracking-widest pl-1">
                      Resume / CV URL
                    </Label>
                    <Input
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleInputChange}
                      required
                      placeholder="HTTPS://DRIVE..."
                      className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#9333ea] transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs text-purple-500 uppercase font-black tracking-widest pl-1">
                      Portfolio URL
                    </Label>
                    <Input
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      placeholder="HTTPS://GITHUB.COM..."
                      className="bg-zinc-950 border-2 border-zinc-800 text-white h-12 rounded-none focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#9333ea] transition-all"
                    />
                  </div>
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
                <div className="p-2 border border-purple-500/30 bg-purple-500/10 text-purple-500">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Experience Manifesto
                </h2>
              </div>

              <div className="space-y-3">
                <Label className="text-xs text-purple-500 uppercase font-black tracking-widest pl-1">
                  Why Zharnyx?
                </Label>
                <Textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Explain your motivation and experience..."
                  className="bg-zinc-950 border-2 border-zinc-800 text-white min-h-[200px] rounded-none focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:shadow-[4px_4px_0px_0px_#9333ea] transition-all resize-none p-4"
                />
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
              className="bg-purple-600 text-white border-2 border-white hover:bg-purple-700 hover:border-purple-400 hover:shadow-[4px_4px_0px_0px_white] font-black uppercase tracking-wider rounded-none w-32 h-12 transition-all"
            >
              Next <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black border-2 border-purple-600 hover:bg-zinc-200 hover:shadow-[4px_4px_0px_0px_#9333ea] font-black uppercase tracking-wider rounded-none min-w-40 h-12 transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Transmit Application"
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
