import connectDB from "@/lib/db";
import { Button } from "@base-ui/react";

export default async function Home() {
  const connection = await connectDB();
  console.log("connection", connection);
  return (
    <div>
      <Button variant="outline">Welcome to To-Do app</Button>
    </div>
  );
}
