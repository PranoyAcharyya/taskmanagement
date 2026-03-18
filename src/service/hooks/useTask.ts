"use client"
import { addTask, deleteTask, toggleTask, updateTask } from "@/api/taskApi"
import api from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTasksQuery = ()=>{
    return useQuery({
        queryKey:['tasks'],
        queryFn:async()=>{
            try {
                const res = await api.get('tasks');
                return res.data
            } catch (error) {
                console.log(error);
                
            }
        }
    })
}

export const useAddTaskMutation = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:addTask,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["tasks"]})
        }
    })
}

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateTask(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useToggleTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};


export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};