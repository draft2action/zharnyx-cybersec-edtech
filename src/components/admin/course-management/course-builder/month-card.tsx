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
import { Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
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
  mentors?: { id: string; name: string; role: string }[];
}

export function MonthCard({
  index,
  control,
  register,
  errors,
  remove,
  watch,
  setValue,
  mentors = [],
}: MonthCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Nested Field Array for Weeks
  const {
    fields: weekFields,
    remove: removeWeek,
    replace: replaceWeeks,
  } = useFieldArray({
    control,
    name: `months.${index}.weeks`,
  });

  return (
    <Card className="bg-black/20 border-white/10 mb-4">
      <CardHeader className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4 space-y-0">
        <div className="cursor-move text-gray-500">
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
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
                const newType = val as "common" | "team";
                setValue(`months.${index}.type`, newType, {
                  shouldValidate: true,
                });

                // Auto-generate weeks based on type using replace() to ensure UI sync
                if (newType === "team") {
                  const redWeeks = Array.from({ length: 4 }).map((_, i) => ({
                    title: i === 3 ? "Project Week (Red)" : `Week ${i + 1}`,
                    order: i + 1,
                    isProject: i === 3,
                    team: "red",
                    resources: [],
                    mentorIds: [],
                  }));
                  const blueWeeks = Array.from({ length: 4 }).map((_, i) => ({
                    title: i === 3 ? "Project Week (Blue)" : `Week ${i + 1}`,
                    order: i + 5,
                    isProject: i === 3,
                    team: "blue",
                    resources: [],
                    mentorIds: [],
                  }));

                  replaceWeeks([
                    ...redWeeks,
                    ...blueWeeks,
                  ] as CourseFormValues["months"][number]["weeks"]);
                } else {
                  // Common - 4 weeks
                  const commonWeeks = Array.from({ length: 4 }).map((_, i) => ({
                    title: i === 3 ? "Project Week" : `Week ${i + 1}`,
                    order: i + 1,
                    isProject: i === 3,
                    team: null,
                    resources: [],
                    mentorIds: [],
                  }));

                  replaceWeeks(
                    commonWeeks as CourseFormValues["months"][number]["weeks"]
                  );
                }
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
        <CardContent className="p-4 pt-0 pl-4 md:pl-10">
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
                mentors={mentors}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
