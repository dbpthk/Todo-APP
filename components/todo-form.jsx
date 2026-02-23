"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@base-ui/react";
import { Input } from "@base-ui/react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { createTodSchema } from "@/validations/todo";
import { useCreateTodo } from "@/hooks/use-create-todo";
import { toast } from "sonner";

const TodoForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const createTodoMutation = useCreateTodo();

  const form = useForm({
    resolver: zodResolver(createTodSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await createTodoMutation.mutateAsync(data);

      if (result.success) {
        toast.success("Todo created successfully");
        form.reset();
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("failed to create todos");
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full mb-6 bg-primary text-white rounded-md px-4 py-2"
      >
        Add New Todo
      </Button>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              type="text"
              id="title"
              {...form.register("title")}
              placeholder="Enter todo title"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Enter todo description"
              className="mt-1"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              onValueChange={(value) => form.setValue("priority", value)}
              defaultValue={form.getValues("priority")}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-primary text-white rounded-md px-4 py-2"
              type="submit"
              disabled={createTodoMutation.isPending}
            >
              {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-4 py-2 bg-secondary text-secondary-foreground"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
