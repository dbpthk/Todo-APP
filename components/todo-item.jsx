import React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@base-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Calendar } from "lucide-react";

const TodoItem = ({ todo }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };
  return (
    <Card
      className={`transition-all duration-200 ${todo.completed ? "opacity-70" : "opacity-100"}`}
    >
      <CardContent className="p-4 flex items-start gap-4">
        <Checkbox
          checked={todo.completed}
          className="mt-1"
          disabled={false}
          onCheckedChange={() => {}}
        />

        <div className="flex-1">
          <h3
            className={`font-medium ${todo.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
          >
            {todo.title}
          </h3>
          <Badge variant="outline" className={getPriorityColor(todo.priority)}>
            {todo.priority}
          </Badge>
          {todo.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {todo.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>
              {" "}
              Created {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-1">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
