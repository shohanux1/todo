"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function TodoList() {
  const todos = useQuery(api.tasks.getTasks);
  const create = useMutation(api.tasks.createTask);
  const toggle = useMutation(api.tasks.toggle);
  const remove = useMutation(api.tasks.remove);
  const [input, setInput] = useState("");

  const handleAdd = async () => {
    if (!input.trim()) return;
    await create({ text: input });
    setInput("");
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 mt-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a new task..."
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos?.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded border"
            >
              <span
                className={`flex-1 cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
                onClick={() =>
                  toggle({ id: todo._id, completed: !todo.completed })
                }
              >
                {todo.text}
              </span>
              <button
                onClick={() => remove({ id: todo._id })}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
