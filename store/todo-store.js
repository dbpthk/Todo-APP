import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTodoStore = create(
  devtools(
    (set, get) => ({
      todos: [],
      filter: "all",
      isLoading: false,

      setTodos: (todos) => set({ todos }),

      addTodo: (todo) =>
        set((state) => ({
          todos: [todo, ...state.todo],
        })),
      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo._id === id ? { ...todo, ...updates } : todo,
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo._id !== id),
        })),

      setFilter: (filter) => set({ filter }),
      setLoading: (isLoading) => set({ isLoading }),

      filteredTodos: () => {
        const { todos, filter } = get();
        if (filter === "all") return todos;
        if (filter === "completed")
          return todos.filter((todo) => todo.completed);
        if (filter === "pending")
          return todos.filter((todo) => !todo.completed);
      },
      completedCount: () => {
        const { todos } = get();
        return todos.filter((todo) => todo.completed).length;
      },
      activeCount: () => {
        const { todos } = get();
        return todos.filter((todo) => !todo.completed).length;
      },
    }),
    { name: "todo-store" },
  ),
);
