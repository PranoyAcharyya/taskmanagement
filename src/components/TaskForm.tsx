"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from "@/service/hooks/useTask";
import { TaskFormProps } from "@/typescript/types";
import { useEffect } from "react";

export function TaskForm({ open, onClose, mode, initialData }: TaskFormProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
    },
  });

  const { mutate: addTask } = useAddTaskMutation();
  const { mutate: updateTask } = useUpdateTaskMutation();

  const onSubmit = (data: any) => {
    if (mode === "edit") {
      updateTask(
        { id: initialData.id, data },
        {
          onSuccess: () => onClose(false),
        },
      );
    } else {
      addTask(data, {
        onSuccess: () => onClose(false),
      });
    }
  };

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
      });
    }
    if (mode === "add") {
      reset({
        title: "",
        description: "",
        priority: "",
      });
    }
  }, [mode, initialData, reset]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>Simple working form</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />

          {/* Description */}
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          {/* Priority (SIMPLE SELECT) */}
          <select
            {...register("priority")}
            className="w-full border p-2 rounded"
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button type="submit">
              {mode === "edit" ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
