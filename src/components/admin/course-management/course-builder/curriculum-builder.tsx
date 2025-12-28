"use client";

import {
  useFieldArray,
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { CourseFormValues } from "@/lib/validators/course";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MonthCard } from "./month-card";
interface CurriculumBuilderProps {
  control: Control<CourseFormValues>;
  register: UseFormRegister<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  watch: UseFormWatch<CourseFormValues>;
  setValue: UseFormSetValue<CourseFormValues>;
  mentors?: { id: string; name: string }[];
}

export function CurriculumBuilder({
  control,
  register,
  errors,
  watch,
  setValue,
  mentors = [],
}: CurriculumBuilderProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "months",
  });

  const addMonth = () => {
    append({
      title: "New Month",
      type: "common",
      order: fields.length + 1,
      weeks: Array.from({ length: 4 }).map((_, i) => ({
        title: i === 3 ? "Project Week" : `Week ${i + 1}`,
        order: i + 1,
        isProject: i === 3, // Auto-set 4th week as Project
        resources: [],
        mentorIds: [],
      })),
    });
  };

  return (
    <div className="space-y-6">
      {fields.length === 0 && (
        <div className="text-gray-500 font-mono text-center py-8 border border-dashed border-white/10 rounded-md">
          No months added yet. Start building your curriculum.
        </div>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => (
          <MonthCard
            key={field.id}
            index={index}
            control={control}
            register={register}
            errors={errors}
            remove={remove}
            watch={watch}
            setValue={setValue}
            mentors={mentors}
          />
        ))}
      </div>

      <Button
        type="button"
        onClick={addMonth}
        variant="outline"
        className="w-full font-mono border-dashed border-white/20 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/40"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Month
      </Button>
    </div>
  );
}
