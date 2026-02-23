import connectDB from "@/lib/db";
import Todo from "@/model/todo";
import { Button } from "@base-ui/react";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import TodoFilter from "@/components/todo-filter";

export default async function Home() {
  const connection = await connectDB();
  console.log("connection", connection);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Todo App</h1>
          <p className="text-muted-foreground">
            {" "}
            Built with Next.js, zustand, TanStack Query, Zod & Mongoose
          </p>
        </header>
        <main>
          <TodoForm />
          <TodoFilter />
          <TodoList />
        </main>
      </div>
      <footer className="text-center py-4 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Todo App. All rights reserved.
      </footer>
    </div>
  );
}
