"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@clerk/nextjs";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Authenticated>
        <Header />
        <TodoList />
      </Authenticated>

      <Unauthenticated>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <SignInButton mode="modal">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Sign In
            </button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </main>
  );
}
