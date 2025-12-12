import TodoFilter from "@/components/TodoFilter";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { connectDb } from "@/lib/db";

export default async function Home() {
  await connectDb();
  return (
     <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
         <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Todo App</h1>
          <p className="text-muted-foreground">Built with Next.js, Zustand, TanStack Query, Zod & Mongoose</p>
        </header>
        <main>
          <TodoForm/>
           <TodoFilter/>
           <TodoList/> 
        </main>
      </div>

        <footer className="mt-12 mb-5 text-center text-sm text-muted-foreground">
          <p>This app demonstrates CRUD operations with modern React patterns</p>
          <p className="text-blue-400">Made with ❤️ by Sudeep Sahu</p>
        </footer>
    </div>
  );
}
