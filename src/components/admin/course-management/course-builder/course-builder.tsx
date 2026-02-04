"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CourseFormSchema,
  CourseFormDraftSchema,
  CourseFormValues,
} from "@/lib/validators/course";
import { Button } from "@/components/ui/button";
import {
  createFullCourse,
  updateFullCourse,
  getCourseDetails,
} from "@/actions/admin/course-management/action";
import { toast } from "sonner";
import { BasicInfo } from "./basic-info";
import { CurriculumBuilder } from "./curriculum-builder";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getAssignableStaff } from "@/actions/admin/mentor-management/action";

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
  const [isLoading, setIsLoading] = useState(!!courseId);
  const [mentors, setMentors] = useState<
    { id: string; name: string; role: string }[]
  >([]);

  useEffect(() => {
    async function loadMentors() {
      const res = await getAssignableStaff();
      if (res.success && res.data) {
        setMentors(
          res.data.map((m) => ({
            id: m.id,
            name: m.name || m.email || "Unknown",
            role: m.role || "mentor",
          }))
        );
      }
    }
    loadMentors();
  }, []);

  const form = useForm<CourseFormValues>({
    // Use draft schema for default validation (relaxed)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(CourseFormDraftSchema) as any,
    defaultValues: initialData || {
      title: "",
      description: "",
      price: 0,
      image: "",
      sellingPoints: [],
      status: "unpublished",
      months: [], // Start with empty curriculum
    },
  });

  const {
    formState: { errors },
    register,
    control,
    watch,
    setValue,
    reset,
  } = form;

  // Load course data if editing
  useEffect(() => {
    async function loadCourse() {
      if (!courseId) return;
      setIsLoading(true);

      const res = await getCourseDetails(courseId);
      if (res.success && res.data) {
        const dbCourse = res.data;

        // Map DB structure to Form Values
        const formValues: CourseFormValues = {
          title: dbCourse.title,
          description: dbCourse.description || "",
          price: dbCourse.price || 0,
          image: dbCourse.image || "",
          sellingPoints: (dbCourse.sellingPoints as string[]) || [],
          status: dbCourse.status as "published" | "unpublished",
          months: dbCourse.months.map((month) => ({
            id: month.id,
            title: month.title,
            type: month.type as "common" | "team",
            order: month.order,
            weeks: month.weeks.map((week) => ({
              id: week.id,
              title: week.title,
              order: week.order,
              team: week.team as "red" | "blue" | null,
              isProject: week.isProject,
              projectTitle: week.projectTitle || "",
              projectDescription: week.projectDescription || "",
              content: week.content || "",
              resources: week.resources
                ? (week.resources as { title: string; link: string }[])
                : [],
              assessment:
                week.assessments && week.assessments.length > 0
                  ? {
                    title: week.assessments[0].title,
                    topic: week.assessments[0].topic || "",
                    problem: week.assessments[0].problem || "",
                    submissionFormat:
                      (week.assessments[0].submissionFormat as
                        | "pdf"
                        | "url") || "pdf",
                    deadline: week.assessments[0].deadline
                      ? new Date(week.assessments[0].deadline)
                      : undefined,
                  }
                  : null,
              mentorIds: week.mentors.map((wm) => wm.mentorId),
            })),
          })),
        };

        reset(formValues);
      } else {
        toast.error("Failed to load course details");
        onComplete();
      }
      setIsLoading(false);
    }

    if (courseId) {
      loadCourse();
    }
  }, [courseId, reset, onComplete]);

  // Handler for saving draft (no validation)
  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      const data = { ...form.getValues(), status: "unpublished" as const };

      let result;
      if (courseId) {
        result = await updateFullCourse(courseId, data);
      } else {
        result = await createFullCourse(data);
      }

      if (result.success) {
        toast.success("Draft saved successfully!");
        onComplete();
      } else {
        toast.error(result.error || "Failed to save draft");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for publishing (with strict validation)
  const handlePublish = async () => {
    const data = { ...form.getValues(), status: "published" as const };

    // Validate against strict schema before publishing
    const validation = CourseFormSchema.safeParse(data);

    if (!validation.success) {
      // Show validation errors
      const firstError = validation.error.issues[0];
      toast.error(
        `Cannot publish: ${firstError.message} at ${firstError.path.join(
          " > "
        )}`
      );

      // Scroll to the first error field if possible
      const errorPath = firstError.path[0] as string;
      const element = document.querySelector(`[name="${errorPath}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return;
    }

    // If validation passes, submit
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
          courseId
            ? "Course updated and published!"
            : "Course published successfully!"
        );
        onComplete();
      } else {
        toast.error(result.error || "Failed to publish course");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-8 w-full max-w-screen mx-auto"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
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
            onClick={handleSaveDraft}
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
            onClick={handlePublish}
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
          <BasicInfo register={register} errors={errors} control={control} />
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
