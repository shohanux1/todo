"use client";

import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-700">📝 My To-Do App</h1>
      <UserButton />
    </header>
  );
}
