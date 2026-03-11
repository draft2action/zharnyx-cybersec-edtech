"use client";

import {
  UseFormRegister,
  FieldErrors,
  Control,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { CourseFormValues } from "@/lib/validators/course";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";

interface BasicInfoProps {
  register: UseFormRegister<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  control: Control<CourseFormValues>;
}

export function BasicInfo({ register, errors, control }: BasicInfoProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sellingPoints" as never, // casting to avoid deep path type issues with simple array of strings if strict mode complains
  });

  return (
    <div className="space-y-6">
      <Field>
        <FieldLabel htmlFor="title" className="text-white font-sans">
          Course Title
        </FieldLabel>
        <FieldContent>
          <Input
            id="title"
            placeholder="e.g. Advanced Penetration Testing"
            {...register("title")}
            className="bg-black/50 border-[#1a1a1a] text-white font-sans focus:ring-slate-400"
          />
        </FieldContent>
        <FieldError errors={[errors.title]} />
      </Field>
      <Field>
        <FieldLabel htmlFor="description" className="text-white font-sans">
          Description
        </FieldLabel>
        <FieldContent>
          <Textarea
            id="description"
            placeholder="Detailed course description..."
            rows={4}
            {...register("description")}
            className="bg-black/50 border-[#1a1a1a] text-white font-sans focus:ring-slate-400"
          />
        </FieldContent>
        <FieldError errors={[errors.description]} />
      </Field>
      <Field>
        <FieldLabel htmlFor="price" className="text-white font-sans">
          Price (INR)
        </FieldLabel>
        <FieldContent>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value, ...field } }) => (
              <Input
                {...field}
                id="price"
                type="number"
                min={0}
                step={1}
                placeholder="0"
                value={value ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange(val === "" ? 0 : Number(val));
                }}
                className="bg-black/50 border-[#1a1a1a] text-white font-sans focus:ring-slate-400"
              />
            )}
          />
        </FieldContent>
        <FieldError errors={[errors.price]} />
      </Field>
      <div className="border-t border-[#1a1a1a] pt-4">
        <div className="flex items-center justify-between mb-2">
          <FieldLabel className="text-white font-sans">
            Selling Points
          </FieldLabel>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => append("")}
            className="text-xs font-sans text-neon-blue hover:text-white hover:bg-white/10"
          >
            <Plus className="mr-1 h-3 w-3" />
            Add Point
          </Button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <div className="flex-1">
                <Input
                  placeholder={`Selling point ${index + 1}`}
                  {...register(`sellingPoints.${index}` as const)}
                  className="bg-black/50 border-[#1a1a1a] text-white font-sans focus:ring-slate-400 text-sm"
                />
                {errors.sellingPoints && errors.sellingPoints[index] && (
                  <p className="text-red-500 text-xs mt-1 font-sans">
                    {errors.sellingPoints[index]?.message}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="text-gray-400 hover:text-red-500 hover:bg-white/10 h-10 w-10 shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {fields.length === 0 && (
            <p className="text-gray-500 text-sm font-sans italic">
              No selling points added yet.
            </p>
          )}
        </div>
      </div>
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
