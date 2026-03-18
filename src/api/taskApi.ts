import api from "@/lib/axios";
import { useId } from "react";

export const addTask = async(data:any)=>{

    // const uniqID = useId();

    const res = await api.post("tasks",{
        title: data.title,
        description: data.description,
        priority:data.priority,
        completed:false,
    });

    console.log("res from addTaskapi",res);
    

    return res.data;
}



export const updateTask = async (id: string, data: any) => {
  const res = await api.put(`tasks/${id}`, data);
  return res.data;
};

export const toggleTask = async (task: any) => {
  const res = await api.put(`tasks/${task.id}`, {
    ...task,
    completed: !task.completed,
  });

  return res.data;
};

export const deleteTask = async(id:string)=>{
    const res = await api.delete(`tasks/${id}`)
    return res.data
}