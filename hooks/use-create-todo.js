import { createTodo } from "@/actions/todo-actions";
import { createTodSchema } from "@/validations/todo";

export function useTodos() {
  const setTodos = useTodoStore((state) => state.setTodos);
}
