"use client";
import TaskCard from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import { useDeleteTaskMutation, useTasksQuery, useToggleTaskMutation } from "@/service/hooks/useTask";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedTask, setSelectedTask] = useState(null);
  const { data, isLoading, error } = useTasksQuery();
  const { mutate: toggleTask, isPending } = useToggleTaskMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { mutate: deleteTask } = useDeleteTaskMutation();

  const handleEdit = (task: any) => {
    setMode("edit");
    setSelectedTask(task);
    setOpen(true);
  };

  const handleToggle = (task: any) => {
    setLoadingId(task.id);

    toggleTask(task, {
      onSuccess: () => setLoadingId(null),
      onError: () => setLoadingId(null),
    });
  };

  const handleDelete = (task: any) => {
  deleteTask(task.id);
};
  

  if (isLoading) return <p className="p-10">Loading...</p>;
  if (error) return <p className="p-10">Error...</p>;

  return (
    <div className="min-h-screen bg-zinc-50 p-10 dark:bg-black">
      <Button
        onClick={() => {
          setMode("add");
          setSelectedTask(null);
          setOpen(true);
        }}
      >
        Add Task
      </Button>
      <TaskForm
        open={open}
        onClose={setOpen}
        mode={mode}
        initialData={selectedTask}
      />
      <div className="mx-auto max-w-2xl space-y-4">
        {data?.length === 0 && <h2 className="text-center font-black">No Task yet</h2>}
        {data?.map((task: any) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onToggle={handleToggle}
            loadingId={loadingId}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
