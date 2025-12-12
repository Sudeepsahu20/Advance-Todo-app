'use server'
import { connectDb } from "@/lib/db"
import Todo from "@/modals/Todo"
import { revalidatePath } from "next/cache"
import { createTodoSchema } from "@/validations/validation"
import { success } from "zod"
import { connect } from "mongoose"


export async function createTodo(data) {
    try {
       let validatedData=createTodoSchema.parse(data);
       await connectDb();

       const todo=await Todo.create(validatedData)
       revalidatePath("/");

       return {
        success:true,
        data:JSON.parse(JSON.stringify(todo))
       }

    } catch (error) {
         console.error("Error in createTodo",error);
         return{
            success:false,
            error:error ? error.message:"Something went wrong"
         }
    }
}

export async function getTodos() {
    try {
        await connectDb();
        const todos= await Todo.find().sort({createdAt:-1})
        if(!todos){
            return {
                success:false,
                error:"Not getting todo"
            }
        }

        return {
            success:true,
            data:JSON.parse(JSON.stringify(todos))
        }
    } catch (error) {
        console.error("failed to get todos",error);
        return{
            success:false,
            error:"failed to fetch todos"
        }
    }
}

export async function toggleTodo(id) {
    try {
        await connectDb();
        const todo=await Todo.findById(id);
        if(!todo){
            return {
                success:false,
                error:"Todo not found"
            }
        }

        todo.completed = !todo.completed;
        await todo.save();
        revalidatePath("/");

        return {
            success:true,
            data:JSON.parse(JSON.stringify(todo))
        }
    } catch (error) {
        console.log("Error in toggle todo",error);
        return {
            success:false,
            error:"failed to toggle todo"
        }
        
    }
}

export async function deleteTodo(id) {
    try {
        await connectDb();
        const todo=await Todo.findByIdAndDelete(id);
        if(!todo){
            return{
                success:false,
                error:"No todo found"
            }
        }

        revalidatePath("/");
        return {
            success:true,
            data:JSON.parse(JSON.stringify(todo))
        }
    } catch (error) {
        console.error("Failed to delete todo",error);
        return {
            success:false,
            error:"Failed to delete todo"
        }
    }
}