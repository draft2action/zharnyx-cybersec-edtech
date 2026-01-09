"use client";

import { useState, useEffect } from "react";
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
  Search,
  UserPlus,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WeekCardProps {
  monthIndex: number;
  weekIndex: number;
  control: Control<CourseFormValues>;
  register: UseFormRegister<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  remove: () => void;
  watch: UseFormWatch<CourseFormValues>;
  setValue: UseFormSetValue<CourseFormValues>;
  mentors?: { id: string; name: string }[];
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
  mentors = [],
}: WeekCardProps) {
  // Determine if this is a 4th week (Project Week)
  // Index 0,1,2 -> Normal. Index 3 -> Project.
  // Index 4,5,6 -> Normal. Index 7 -> Project.
  const isFourthWeek = (weekIndex + 1) % 4 === 0;

  /* Force Project Week for 4th week */
  // We rely on isFourthWeek to visually enforce. Form state sync via useEffect.
  const isProject =
    isFourthWeek ||
    !!watch(`months.${monthIndex}.weeks.${weekIndex}.isProject`);

  const hasAssessment = !!watch(
    `months.${monthIndex}.weeks.${weekIndex}.assessment`
  );
  const monthType = watch(`months.${monthIndex}.type`);
  const assignedMentors =
    watch(`months.${monthIndex}.weeks.${weekIndex}.mentorIds`) || [];

  const [mentorSearch, setMentorSearch] = useState("");
  const [isMentorDialogOpen, setIsMentorDialogOpen] = useState(false);

  useEffect(() => {
    if (isFourthWeek) {
      // Force project to true for 4th week
      const currentValue = watch(
        `months.${monthIndex}.weeks.${weekIndex}.isProject`
      );
      if (!currentValue) {
        setValue(`months.${monthIndex}.weeks.${weekIndex}.isProject`, true, {
          shouldValidate: true,
        });
      }
    } else {
      // Ensure non-4th weeks are NOT projects
      const currentValue = watch(
        `months.${monthIndex}.weeks.${weekIndex}.isProject`
      );
      if (currentValue) {
        setValue(`months.${monthIndex}.weeks.${weekIndex}.isProject`, false, {
          shouldValidate: true,
        });
      }
    }
  }, [weekIndex, monthIndex, setValue, watch, isFourthWeek]);

  // Resources Field Array
  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    control,
    name: `months.${monthIndex}.weeks.${weekIndex}.resources`,
  });

  const toggleAssessment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasAssessment) {
      setValue(`months.${monthIndex}.weeks.${weekIndex}.assessment`, null, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue(
        `months.${monthIndex}.weeks.${weekIndex}.assessment`,
        {
          title: "New Assessment",
          topic: "General Topic",
          problem: "",
          submissionFormat: "pdf",
          timer: 60,
        },
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    }
  };

  const handleMentorToggle = (mentorId: string, checked: boolean) => {
    const current = [...assignedMentors];
    let newMentors;
    if (checked) {
      newMentors = [...current, mentorId];
    } else {
      newMentors = current.filter((id) => id !== mentorId);
    }
    setValue(`months.${monthIndex}.weeks.${weekIndex}.mentorIds`, newMentors, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const filteredMentors = mentors.filter((m) =>
    m.name.toLowerCase().includes(mentorSearch.toLowerCase())
  );

  return (
    <Card className="bg-black/30 border-white/5">
      <CardHeader className="p-4 flex flex-row items-center gap-4 space-y-0">
        <div className="cursor-move text-gray-500 hover:text-white transition-colors">
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 flex flex-col gap-1 w-full">
              <Input
                {...register(`months.${monthIndex}.weeks.${weekIndex}.title`)}
                placeholder="Week Title"
                className="bg-black/40 border-white/10 text-white font-mono h-10 text-base w-full focus:ring-white/20"
              />
              {errors.months?.[monthIndex]?.weeks?.[weekIndex]?.title && (
                <span className="text-red-500 text-xs">
                  {errors.months[monthIndex].weeks[weekIndex]?.title?.message}
                </span>
              )}
            </div>

            {/* Team Display - Read Only / Auto-set */}
            {monthType === "team" && (
              <div className="px-3 py-2 bg-black/40 border border-white/10 rounded-md">
                <span
                  className={`text-sm font-mono ${
                    weekIndex < 4 ? "text-red-400" : "text-blue-400"
                  }`}
                >
                  {weekIndex < 4 ? "Red Team" : "Blue Team"}
                </span>
              </div>
            )}

            {/* Project Indicator - Badge only, no checkbox for 1-3, Badge for 4 */}
            {isFourthWeek && (
              <Badge
                variant="outline"
                className="text-indigo-400 border-indigo-500/30 bg-indigo-500/10 font-mono"
              >
                Project Week
              </Badge>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={remove}
          className="text-red-500/70 hover:text-red-400 hover:bg-red-500/10 h-9 w-9 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {/* Project Details - ONLY Show if isProject */}
        {isProject && (
          <div className="p-4 border border-indigo-500/20 rounded-md bg-indigo-500/5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-bold font-mono text-indigo-400">
                Project Details
              </span>
            </div>
            <Input
              {...register(
                `months.${monthIndex}.weeks.${weekIndex}.projectTitle`
              )}
              placeholder="Project Name"
              className="bg-black/40 border-white/10 text-white font-mono h-9 text-sm focus:ring-indigo-500/30"
            />
            <Textarea
              {...register(
                `months.${monthIndex}.weeks.${weekIndex}.projectDescription`
              )}
              placeholder="Describe what they are building..."
              className="bg-black/40 border-white/10 text-white font-mono text-sm min-h-[80px] focus:ring-indigo-500/30"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {/* Content Description - HIDE if Project Week */}
          {!isProject && (
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm text-gray-400 hover:text-black hover:bg-white font-mono h-9 transition-colors"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Edit Content Description
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <Textarea
                  {...register(
                    `months.${monthIndex}.weeks.${weekIndex}.content`
                  )}
                  placeholder="Enter week content description or instructions..."
                  className="bg-black/40 border-white/10 text-gray-300 font-mono text-sm min-h-[120px]"
                />
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Resources - Show for Both? Assume yes. */}
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sm text-gray-400 hover:text-black hover:bg-white font-mono h-9 transition-colors"
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Learning Resources ({resourceFields.length})
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 p-3 border border-white/5 rounded-md bg-black/20 space-y-3">
              {resourceFields.map((field, rIndex) => (
                <div key={field.id} className="flex gap-3 items-start">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      {...register(
                        `months.${monthIndex}.weeks.${weekIndex}.resources.${rIndex}.title`
                      )}
                      placeholder="Resource Title"
                      className="bg-black/40 border-white/10 text-white font-mono h-9 text-sm"
                    />
                    <Input
                      {...register(
                        `months.${monthIndex}.weeks.${weekIndex}.resources.${rIndex}.link`
                      )}
                      placeholder="URL (https://...)"
                      className="bg-black/40 border-white/10 text-white font-mono h-9 text-sm"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeResource(rIndex)}
                    className="h-9 w-9 p-0 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendResource({ title: "", link: "" })}
                className="w-full h-9 text-sm font-mono border-dashed border-white/10 text-gray-400 hover:text-black hover:bg-white transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Resource
              </Button>
            </CollapsibleContent>
          </Collapsible>

          {/* Mentor Assignment - Dialog Based */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2 items-center">
              <Dialog
                open={isMentorDialogOpen}
                onOpenChange={setIsMentorDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start text-sm text-gray-400 hover:text-black hover:bg-white font-mono h-9 transition-colors w-full"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Assign Mentors ({assignedMentors.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black border-white/10 text-white sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-mono text-lg">
                      Select Mentors
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search mentors..."
                        value={mentorSearch}
                        onChange={(e) => setMentorSearch(e.target.value)}
                        className="pl-8 bg-white/5 border-white/10 text-white font-mono focus:ring-white/20"
                      />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto space-y-1 pr-1">
                      {filteredMentors.length === 0 ? (
                        <p className="text-gray-500 font-mono text-center py-4">
                          No mentors found.
                        </p>
                      ) : (
                        filteredMentors.map((mentor) => (
                          <div
                            key={mentor.id}
                            className="flex items-center justify-between p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group"
                            onClick={() =>
                              handleMentorToggle(
                                mentor.id,
                                !assignedMentors.includes(mentor.id)
                              )
                            }
                          >
                            <span className="font-mono text-sm text-gray-300 group-hover:text-white">
                              {mentor.name}
                            </span>
                            <Checkbox
                              checked={assignedMentors.includes(mentor.id)}
                              onCheckedChange={(checked) =>
                                handleMentorToggle(
                                  mentor.id,
                                  checked as boolean
                                )
                              }
                              className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Selected Mentors Display */}
            {assignedMentors.length > 0 && (
              <div className="flex flex-wrap gap-2 pl-4">
                {assignedMentors.map((mId) => {
                  const m = mentors.find((x) => x.id === mId);
                  if (!m) return null;
                  return (
                    <Badge
                      key={mId}
                      variant="secondary"
                      className="bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1 pl-2 pr-1 py-1"
                    >
                      {m.name}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-400"
                        onClick={() => handleMentorToggle(mId, false)}
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Assessment - HIDE if Project Week */}
          {!isProject && (
            <div className="border-t border-white/5 pt-4 mt-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-mono text-gray-300">
                    Assessment (Assignment)
                  </span>
                </div>
                <Button
                  type="button"
                  variant={hasAssessment ? "destructive" : "secondary"}
                  size="sm"
                  onClick={toggleAssessment}
                  className="h-7 text-xs px-3 font-mono"
                >
                  {hasAssessment ? "Remove" : "Add Assessment"}
                </Button>
              </div>

              {hasAssessment && (
                <div className="p-4 border border-white/5 rounded-lg bg-black/20 space-y-3">
                  <Input
                    {...register(
                      `months.${monthIndex}.weeks.${weekIndex}.assessment.title`
                    )}
                    placeholder="Assignment Title"
                    className="bg-black/40 border-white/10 text-white font-mono h-9 text-sm focus:ring-white/20"
                  />
                  <Input
                    {...register(
                      `months.${monthIndex}.weeks.${weekIndex}.assessment.topic`
                    )}
                    placeholder="Assessment Topic"
                    className="bg-black/40 border-white/10 text-white font-mono h-9 text-sm focus:ring-white/20"
                  />
                  <Textarea
                    {...register(
                      `months.${monthIndex}.weeks.${weekIndex}.assessment.problem`
                    )}
                    placeholder="Problem Statement..."
                    className="bg-black/40 border-white/10 text-white font-mono text-sm min-h-[100px] focus:ring-white/20"
                  />
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label className="text-xs text-gray-400 font-mono mb-1 block">Submission Format</Label>
                      <Select
                         onValueChange={(val) => setValue(`months.${monthIndex}.weeks.${weekIndex}.assessment.submissionFormat`, val)}
                         defaultValue={watch(`months.${monthIndex}.weeks.${weekIndex}.assessment.submissionFormat`) || "pdf"}
                      >
                         <SelectTrigger className="bg-black/40 border-white/10 text-white font-mono h-9 text-sm">
                            <SelectValue placeholder="Format" />
                         </SelectTrigger>
                         <SelectContent className="bg-black border-white/10 text-white font-mono">
                            <SelectItem value="pdf">PDF Upload</SelectItem>
                            <SelectItem value="text">Text Input</SelectItem>
                         </SelectContent>
                      </Select>
                    </div>
                     <div className="w-24">
                        <Label className="text-xs text-gray-400 font-mono mb-1 block">Timer (mins)</Label>
                        <Input
                          type="number"
                          {...register(`months.${monthIndex}.weeks.${weekIndex}.assessment.timer`, { valueAsNumber: true })}
                          className="bg-black/40 border-white/10 text-white font-mono h-9 text-sm"
                        />
                     </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
