import { NextResponse } from "next/server";

const todos = [
    { text: 'Learn Next.js' },
    { text: 'Create an API' },
    { text: 'I want to sleep' }
];

export async function GET(req) {
    return NextResponse.json(todos, { status: 200 });
}

export async function POST(req) {
    const todo = await req.json();
    todos.push(todo);
    return NextResponse.json(todos, { status: 200 });
}