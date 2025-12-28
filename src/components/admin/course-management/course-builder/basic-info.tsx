"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CourseFormValues } from "@/lib/validators/course";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";

interface BasicInfoProps {
  register: UseFormRegister<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
}

export function BasicInfo({ register, errors }: BasicInfoProps) {
  return (
    <div className="space-y-6">
      <Field>
        <FieldLabel htmlFor="title" className="text-white font-mono">
          Course Title
        </FieldLabel>
        <FieldContent>
          <Input
            id="title"
            placeholder="e.g. Advanced Penetration Testing"
            {...register("title")}
            className="bg-black/50 border-white/10 text-white font-mono focus:ring-slate-400"
          />
        </FieldContent>
        <FieldError errors={[errors.title]} />
      </Field>
      <Field>
        <FieldLabel htmlFor="description" className="text-white font-mono">
          Description
        </FieldLabel>
        <FieldContent>
          <Textarea
            id="description"
            placeholder="Detailed course description..."
            rows={4}
            {...register("description")}
            className="bg-black/50 border-white/10 text-white font-mono focus:ring-slate-400"
          />
        </FieldContent>
        <FieldError errors={[errors.description]} />
      </Field>
      {/* Image field removed as per requirements */}
      {/* 
        Status is handled via "Save Draft" vs "Publish" buttons conceptually, 
        or we can add a selector here. 
        Current schema defaults to 'unpublished'.
      */}
      <input type="hidden" {...register("status")} value="unpublished" />{" "}
      {/* Default hidden */}
    </div>
  );
}
