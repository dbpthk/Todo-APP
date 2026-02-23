"use client";
import { useTodos } from "@/hooks/use-create-todo";
import { useTodoStore } from "@/store/todo-store";

import { Loader, Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const TodoList = () => {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader className="mx-auto mb-4 animate-spin" size={48} />
          <p className="text-muted-foreground">Loading todos...</p>
        </CardContent>
      </Card>
    );
  }
  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Loader2 className="mx-auto mb-4 text-destructive" size={48} />
          <p className="text-destructive">
            Failed to load todos. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return <div>TodoList</div>;
};

export default TodoList;
