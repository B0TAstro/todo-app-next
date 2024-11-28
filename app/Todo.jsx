
import { revalidateTag } from "next/cache";
import React from "react";

async function Todo(props) {
  const data = await fetch("http://localhost:3000/api/todos", {
    next: { tags: ["todos"] },
    cache: "no-store",
  });
  const todos = await data.json();

  console.log("todos", todos);
  async function addTodo(formData) {
    'use server'

    const text = formData.get("text");
    console.log("Todos ; create a new todo", text);

    await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text}),
    });
    revalidateTag("todos");
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-center text-2xl font-semibold mt-3">Todo List</h1>
      <form action={addTodo} className="flex space-x-2">
        <input
          type="text"
          name="text"
          placeholder="Ajouter un nouveau todo"
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Ajouter
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              defaultChecked={todo.completed}
              className="form-checkbox"
              disabled
            />
            <span
              className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""
                }`}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;