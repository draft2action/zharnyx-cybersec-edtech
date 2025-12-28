"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseFormSchema, CourseFormValues } from "@/lib/validators/course";
import { Button } from "@/components/ui/button";
import {
  createFullCourse,
  updateFullCourse,
} from "@/actions/admin/course-management/action";
import { toast } from "sonner";
import { BasicInfo } from "./basic-info";
import { CurriculumBuilder } from "./curriculum-builder";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getApprovedMentors } from "@/actions/admin/mentor-management/action";

interface CourseBuilderProps {
  courseId?: string | null;
  onComplete: () => void;
  initialData?: CourseFormValues;
}

export function CourseBuilder({
  courseId,
  onComplete,
  initialData,
}: CourseBuilderProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mentors, setMentors] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function loadMentors() {
      const res = await getApprovedMentors();
      if (res.success && res.data) {
        setMentors(
          res.data.map((m) => ({
            id: m.id,
            name: m.name || m.email || "Unknown",
          }))
        );
      }
    }
    loadMentors();
  }, []);

  const form = useForm<CourseFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(CourseFormSchema) as any,
    defaultValues: initialData || {
      title: "",
      description: "",
      image: "",
      status: "unpublished",
      months: [], // Start with empty curriculum
    },
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
    watch,
    setValue,
  } = form;

  const onSubmit: SubmitHandler<CourseFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      let result;
      if (courseId) {
        result = await updateFullCourse(courseId, data);
      } else {
        result = await createFullCourse(data);
      }

      if (result.success) {
        toast.success(
          courseId ? "Course updated!" : "Course created successfully!"
        );
        onComplete();
      } else {
        toast.error(result.error || "Failed to save course");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={handleSubmit(onSubmit as any)}
      className="space-y-8 w-full max-w-screen mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold font-mono text-white">
          {courseId ? "Edit Course" : "Create New Course"}
        </h3>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onComplete}
            className="font-mono text-gray-400 hover:text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => {
              setValue("status", "unpublished");
              handleSubmit(onSubmit)();
            }}
            className="font-mono border-white/20 text-white bg-transparent hover:bg-white/10"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save Draft
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              setValue("status", "published");
              handleSubmit(onSubmit)();
            }}
            className="font-mono bg-white text-black hover:bg-gray-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : courseId ? (
              "Update & Publish"
            ) : (
              "Publish Course"
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Step 1: Basic Info */}
        <section className="bg-black/40 border border-white/10 p-6 rounded-lg backdrop-blur-sm">
          <h4 className="text-xl font-mono text-white mb-4 border-b border-white/10 pb-2">
            Basic Information
          </h4>
          <BasicInfo register={register} errors={errors} />
        </section>

        {/* Step 2: Curriculum (Deep Nested) */}
        <section className="bg-black/40 border border-white/10 p-6 rounded-lg backdrop-blur-sm">
          <h4 className="text-xl font-mono text-white mb-4 border-b border-white/10 pb-2">
            Curriculum
          </h4>
          <CurriculumBuilder
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            mentors={mentors}
          />
        </section>
      </div>
    </form>
  );
}
