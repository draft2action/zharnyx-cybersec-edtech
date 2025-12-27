"use client";

import {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  useFieldArray,
  UseFormSetValue,
} from "react-hook-form";
import { CourseFormValues } from "@/lib/validators/course";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Plus,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { WeekCard } from "@/components/admin/course-management/course-builder/week-card";

interface MonthCardProps {
  index: number;
  control: Control<CourseFormValues>;
  register: UseFormRegister<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  remove: (index: number) => void;
  watch: UseFormWatch<CourseFormValues>;
  setValue: UseFormSetValue<CourseFormValues>; // For manual override if needed
}

export function MonthCard({
  index,
  control,
  register,
  errors,
  remove,
  watch,
  setValue,
}: MonthCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Nested Field Array for Weeks
  const {
    fields: weekFields,
    append: appendWeek,
    remove: removeWeek,
  } = useFieldArray({
    control,
    name: `months.${index}.weeks`,
  });

  const addWeek = () => {
    appendWeek({
      title: "New Week",
      order: weekFields.length + 1,
      isProject: false,
      resources: [],
      mentorIds: [],
    });
  };

  return (
    <Card className="bg-black/20 border-white/10 mb-4">
      <CardHeader className="p-4 flex flex-row items-center gap-4 space-y-0">
        <div className="cursor-move text-gray-500">
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Input
              {...register(`months.${index}.title`)}
              placeholder="Month Title"
              className="bg-black/40 border-white/10 text-white font-mono h-9"
            />
            {errors.months?.[index]?.title && (
              <span className="text-red-500 text-xs">
                {errors.months[index]?.title?.message}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select
              onValueChange={(val) => {
                // We need to manually create a change handler correctly for RHF with Select
                // Since register doesn't work directly on shadcn Select
                // We use the Controller pattern or setValue manually via onValueChange
                // But wait, Shadcn select is controlled. We should use `Controller` or just use the native select for simplicity if we want to save time,
                // OR use `setValue` triggered here.
                // Best way with RHF + Shadcn Select is `Controller` or `setValue`.

                // Let's use `setValue` since we passed it.
                setValue(`months.${index}.type`, val as "common" | "team");
              }}
              defaultValue={watch(`months.${index}.type`)}
            >
              <SelectTrigger className="h-9 bg-black/40 border-white/10 text-white font-mono">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10 text-white">
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="team">Team (Red/Blue)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-white/10"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-4 pt-0 pl-10">
          <div className="space-y-4 border-l-2 border-white/5 pl-4 ml-2">
            {weekFields.map((week, wIndex) => (
              <WeekCard
                key={week.id}
                monthIndex={index}
                weekIndex={wIndex}
                register={register}
                control={control}
                errors={errors}
                remove={() => removeWeek(wIndex)}
                watch={watch}
                setValue={setValue}
              />
            ))}

            <Button
              type="button"
              onClick={addWeek}
              variant="outline"
              size="sm"
              className="w-full font-mono border-dashed border-white/10 text-gray-500 hover:text-white hover:bg-white/5 text-xs h-8"
            >
              <Plus className="mr-2 h-3 w-3" />
              Add Week
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
