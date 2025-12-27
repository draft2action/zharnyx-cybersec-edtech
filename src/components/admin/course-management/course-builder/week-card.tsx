"use client";

import {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import { CourseFormValues } from "@/lib/validators/course";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  GripVertical,
  FileText,
  CheckSquare,
  Plus,
  Link as LinkIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";

interface WeekCardProps {
  monthIndex: number;
  weekIndex: number;
  control: Control<CourseFormValues>;
  register: UseFormRegister<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  remove: () => void;
  watch: UseFormWatch<CourseFormValues>;
  setValue: UseFormSetValue<CourseFormValues>;
}

export function WeekCard({
  monthIndex,
  weekIndex,
  control,
  register,
  errors,
  remove,
  watch,
  setValue,
}: WeekCardProps) {
  const isProject = watch(`months.${monthIndex}.weeks.${weekIndex}.isProject`);
  const hasAssessment = !!watch(
    `months.${monthIndex}.weeks.${weekIndex}.assessment`
  );

  // Resources Field Array
  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    control,
    name: `months.${monthIndex}.weeks.${weekIndex}.resources`,
  });

  const toggleAssessment = () => {
    if (hasAssessment) {
      setValue(`months.${monthIndex}.weeks.${weekIndex}.assessment`, null);
    } else {
      setValue(`months.${monthIndex}.weeks.${weekIndex}.assessment`, {
        title: "New Assessment",
        timer: 60,
        questions: [],
      });
    }
  };

  return (
    <Card className="bg-black/30 border-white/5">
      <CardHeader className="p-3 flex flex-row items-center gap-3 space-y-0">
        <div className="cursor-move text-gray-600">
          <GripVertical className="h-4 w-4" />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <div className="flex-1 flex flex-col gap-1 w-full">
              <Input
                {...register(`months.${monthIndex}.weeks.${weekIndex}.title`)}
                placeholder="Week Title"
                className="bg-black/40 border-white/10 text-white font-mono h-8 text-sm w-full"
              />
              {errors.months?.[monthIndex]?.weeks?.[weekIndex]?.title && (
                <span className="text-red-500 text-[10px]">
                  {errors.months[monthIndex].weeks[weekIndex]?.title?.message}
                </span>
              )}
            </div>

            {/* Team Selection */}
            <div className="w-[140px]">
              <Select
                onValueChange={(val) => {
                  const teamVal =
                    val === "common" ? null : (val as "red" | "blue");
                  setValue(
                    `months.${monthIndex}.weeks.${weekIndex}.team`,
                    teamVal
                  );
                }}
                defaultValue={
                  watch(`months.${monthIndex}.weeks.${weekIndex}.team`) ||
                  "common"
                }
              >
                <SelectTrigger className="h-8 bg-black/40 border-white/10 text-white font-mono text-xs">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 text-white">
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="red">Red Team</SelectItem>
                  <SelectItem value="blue">Blue Team</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id={`isProject-${monthIndex}-${weekIndex}`}
                checked={isProject}
                onCheckedChange={(checked) => {
                  setValue(
                    `months.${monthIndex}.weeks.${weekIndex}.isProject`,
                    checked as boolean
                  );
                }}
                className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <Label
                htmlFor={`isProject-${monthIndex}-${weekIndex}`}
                className="text-gray-400 font-mono text-xs cursor-pointer"
              >
                Project Week
              </Label>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={remove}
          className="text-red-500/70 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="grid grid-cols-1 gap-2">
          {/* Content Description */}
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs text-gray-400 hover:text-white font-mono h-7"
              >
                <FileText className="mr-2 h-3 w-3" />
                Edit Content Description
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <Textarea
                {...register(`months.${monthIndex}.weeks.${weekIndex}.content`)}
                placeholder="Enter week content description or instructions..."
                className="bg-black/40 border-white/10 text-gray-300 font-mono text-xs min-h-[100px]"
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Resources */}
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs text-gray-400 hover:text-white font-mono h-7"
              >
                <LinkIcon className="mr-2 h-3 w-3" />
                Learning Resources ({resourceFields.length})
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 p-2 border border-white/5 rounded-md bg-black/20 space-y-2">
              {resourceFields.map((field, rIndex) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      {...register(
                        `months.${monthIndex}.weeks.${weekIndex}.resources.${rIndex}.title`
                      )}
                      placeholder="Resource Title"
                      className="bg-black/40 border-white/10 text-white font-mono h-7 text-xs"
                    />
                    <Input
                      {...register(
                        `months.${monthIndex}.weeks.${weekIndex}.resources.${rIndex}.link`
                      )}
                      placeholder="URL (https://...)"
                      className="bg-black/40 border-white/10 text-white font-mono h-7 text-xs"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeResource(rIndex)}
                    className="h-7 w-7 p-0 text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendResource({ title: "", link: "" })}
                className="w-full h-7 text-xs font-mono border-dashed border-white/10 text-gray-400 hover:text-white"
              >
                <Plus className="mr-2 h-3 w-3" /> Add Resource
              </Button>
            </CollapsibleContent>
          </Collapsible>

          {/* Assessment */}
          <div className="border-t border-white/5 pt-2 mt-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-3 w-3 text-gray-400" />
                <span className="text-xs font-mono text-gray-400">
                  Assessment
                </span>
              </div>
              <Button
                type="button"
                variant={hasAssessment ? "destructive" : "secondary"}
                size="sm"
                onClick={toggleAssessment}
                className="h-6 text-[10px] px-2"
              >
                {hasAssessment ? "Remove Assessment" : "Add Assessment"}
              </Button>
            </div>

            {hasAssessment && (
              <div className="p-2 border border-white/5 rounded-md bg-black/20 space-y-2">
                <Input
                  {...register(
                    `months.${monthIndex}.weeks.${weekIndex}.assessment.title`
                  )}
                  placeholder="Assessment Title"
                  className="bg-black/40 border-white/10 text-white font-mono h-8 text-xs"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-mono">
                    Timer (mins):
                  </span>
                  <Input
                    type="number"
                    {...register(
                      `months.${monthIndex}.weeks.${weekIndex}.assessment.timer`,
                      { valueAsNumber: true }
                    )}
                    placeholder="60"
                    className="bg-black/40 border-white/10 text-white font-mono h-8 text-xs w-20"
                  />
                </div>
                <p className="text-[10px] text-gray-500 font-mono">
                  * Questions can be managed in the detailed view later.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
