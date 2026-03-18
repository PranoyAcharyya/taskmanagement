export type TaskFormProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  mode: "add" | "edit";
  initialData?: any;
};