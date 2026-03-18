// src/components/TaskCard.tsx

import { CheckCircle, Circle } from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
};

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
  loadingId: string | null;
};

export default function TaskCard({
  task,
  onEdit,
  onToggle,
  loadingId,
  onDelete
}: TaskCardProps) {
  const isLoading = loadingId === task.id;

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-white">
          {task.title}
        </h2>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            task.priority === "high"
              ? "bg-red-100 text-red-600"
              : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {task.description}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div
          className={`flex items-center gap-2 text-sm ${
            isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => !isLoading && onToggle(task)}
        >
          {isLoading ? (
            <span className="text-xs text-zinc-400">Updating...</span>
          ) : task.completed ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-zinc-400" />
          )}

          <span
            className={
              task.completed
                ? "text-green-600"
                : "text-zinc-500 dark:text-zinc-400"
            }
          >
            {isLoading
              ? "Updating..."
              : task.completed
                ? "Completed"
                : "Click to mark as Complete"}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-xs px-3 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            Edit
          </button>
          <button onClick={() => onDelete(task)} className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
