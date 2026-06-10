import { LlmAgent, FunctionTool, Runner, InMemorySessionService } from "@google/adk";
import { z } from "zod";
import { NextResponse } from "next/server";
import { Todo, Priority } from "@/types";

// Temporary reference used during request processing to accumulate changes
let tempTodos: Todo[] = [];

// Helper to find a todo by id or fuzzy text search
const findTodo = (id?: string, searchText?: string): Todo | undefined => {
  if (id) {
    return tempTodos.find((t) => t.id === id);
  }
  if (searchText) {
    const query = searchText.toLowerCase().trim();
    // Try exact text match
    let found = tempTodos.find((t) => t.text.toLowerCase().trim() === query);
    if (!found) {
      // Try partial text match
      found = tempTodos.find((t) => t.text.toLowerCase().includes(query));
    }
    return found;
  }
  return undefined;
};

// Tool: Add a Todo
const addTodoTool = new FunctionTool({
  name: "add_todo",
  description: "Adds a new todo task to the list with optional priority, category, and due date.",
  parameters: z.object({
    text: z.string().describe("The description/title of the task"),
    priority: z.enum(["low", "medium", "high"]).optional().describe("Task priority level (defaults to low)"),
    category: z.string().optional().describe("Task category/tag like Work, Personal, etc. (defaults to General)"),
    dueDate: z.string().optional().describe("Optional due date in YYYY-MM-DD format"),
  }),
  execute: async ({ text, priority, category, dueDate }: { text: string; priority?: string; category?: string; dueDate?: string }) => {
    const newTodo: Todo = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      text: text.trim(),
      completed: false,
      priority: (priority as Priority) || "low",
      category: category ? category.trim() : "General",
      dueDate: dueDate || undefined,
      createdAt: Date.now(),
    };
    tempTodos.unshift(newTodo);
    return { success: true, todo: newTodo };
  },
});

// Tool: Complete a Todo
const completeTodoTool = new FunctionTool({
  name: "complete_todo",
  description: "Marks an existing todo task as completed using its unique ID or by searching for its text.",
  parameters: z.object({
    id: z.string().optional().describe("The unique ID of the todo"),
    searchText: z.string().optional().describe("The text or title of the todo to match fuzzy"),
  }),
  execute: async ({ id, searchText }: { id?: string; searchText?: string }) => {
    const todo = findTodo(id, searchText);
    if (!todo) {
      return { success: false, error: `Could not find a task matching ${id || searchText}` };
    }
    todo.completed = true;
    
    // Support recurrence replication if task is recurring
    if (todo.recurrence && todo.recurrence !== "none") {
      const baseline = todo.dueDate ? new Date(todo.dueDate) : new Date();
      const safeBaseline = isNaN(baseline.getTime()) ? new Date() : baseline;
      const nextDue = new Date(safeBaseline);

      if (todo.recurrence === "daily") {
        nextDue.setDate(nextDue.getDate() + 1);
      } else if (todo.recurrence === "weekly") {
        nextDue.setDate(nextDue.getDate() + 7);
      } else if (todo.recurrence === "monthly") {
        nextDue.setMonth(nextDue.getMonth() + 1);
      }

      const formattedNextDue = nextDue.toISOString().split("T")[0];
      const recurrentTodo: Todo = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        text: todo.text,
        completed: false,
        priority: todo.priority,
        category: todo.category,
        dueDate: formattedNextDue,
        recurrence: todo.recurrence,
        createdAt: Date.now(),
      };
      tempTodos.unshift(recurrentTodo);
    }

    return { success: true, todo };
  },
});

// Tool: Delete a Todo
const deleteTodoTool = new FunctionTool({
  name: "delete_todo",
  description: "Deletes a todo task from the list using its unique ID or by searching for its text.",
  parameters: z.object({
    id: z.string().optional().describe("The unique ID of the todo"),
    searchText: z.string().optional().describe("The text or title of the todo to match fuzzy"),
  }),
  execute: async ({ id, searchText }: { id?: string; searchText?: string }) => {
    const todo = findTodo(id, searchText);
    if (!todo) {
      return { success: false, error: `Could not find a task matching ${id || searchText}` };
    }
    tempTodos = tempTodos.filter((t) => t.id !== todo.id);
    return { success: true, deletedId: todo.id };
  },
});

// Tool: Update a Todo
const updateTodoTool = new FunctionTool({
  name: "update_todo",
  description: "Updates an existing todo task's text, priority, category, or due date.",
  parameters: z.object({
    id: z.string().optional().describe("The unique ID of the todo to update"),
    searchText: z.string().optional().describe("Fuzzy text to find the todo to update"),
    newText: z.string().optional().describe("New text or title for the task"),
    priority: z.enum(["low", "medium", "high"]).optional().describe("New priority level"),
    category: z.string().optional().describe("New category/tag"),
    dueDate: z.string().optional().describe("New due date in YYYY-MM-DD format"),
  }),
  execute: async ({ id, searchText, newText, priority, category, dueDate }: { id?: string; searchText?: string; newText?: string; priority?: string; category?: string; dueDate?: string }) => {
    const todo = findTodo(id, searchText);
    if (!todo) {
      return { success: false, error: `Could not find a task matching ${id || searchText}` };
    }
    if (newText) todo.text = newText.trim();
    if (priority) todo.priority = priority as Priority;
    if (category) todo.category = category.trim();
    if (dueDate !== undefined) todo.dueDate = dueDate || undefined;
    return { success: true, todo };
  },
});

// Tool: Web Search (Simulated for robust live demo)
const webSearchTool = new FunctionTool({
  name: "web_search",
  description: "Searches the web for up-to-date facts, ideas, planning steps, low-carb recipes, or general information.",
  parameters: z.object({
    query: z.string().describe("The search query"),
  }),
  execute: async ({ query }: { query: string }) => {
    console.log(`[ADK Web Search] Querying: ${query}`);
    
    // Provide beautifully curated mock results for typical demo topics
    const normalizedQuery = query.toLowerCase();
    let results = `Simulated search results for "${query}":\n\n`;

    if (normalizedQuery.includes("low carb") || normalizedQuery.includes("keto") || normalizedQuery.includes("diet")) {
      results += `1. **Top Low-Carb Foods**: Spinach, broccoli, avocados, eggs, chicken, salmon, and almonds.\n` +
                 `2. **Planning Guide**: Eliminate refined sugars, substitute grains with cauliflower rice, and focus on healthy fats.\n` +
                 `3. **Actionable Checklist**: \n` +
                 `   - Prep keto meals for the week\n` +
                 `   - Buy leafy greens and avocado oil\n` +
                 `   - Track net carbohydrate intake`;
    } else if (normalizedQuery.includes("vacation") || normalizedQuery.includes("trip") || normalizedQuery.includes("travel")) {
      results += `1. **Summer Travel Preparation**: Book flights, secure accommodations, and review luggage restrictions.\n` +
                 `2. **Packing Checklist**: Passport, travel adapters, personal medication, and lightweight apparel.\n` +
                 `3. **Key Tasks**:\n` +
                 `   - Verify flight schedules\n` +
                 `   - Create a local activities itinerary\n` +
                 `   - Pack luggage and toiletries`;
    } else if (normalizedQuery.includes("workout") || normalizedQuery.includes("fitness") || normalizedQuery.includes("exercise")) {
      results += `1. **Strength Routine Guidelines**: Alternate workout groups, focus on form, and include rest days.\n` +
                 `2. **Standard Cardio**: Aim for 150 minutes of moderate activity weekly.\n` +
                 `3. **Action Items**:\n` +
                 `   - Schedule gym training blocks\n` +
                 `   - Hydrate throughout the day\n` +
                 `   - Complete a stretching routine`;
    } else {
      results += `1. **Information Portal**: Search details suggest breaking down complex tasks into subtasks.\n` +
                 `2. **Workflow suggestion**: Start with high priority items, keep scope minimal, and set due dates.\n` +
                 `3. **Checklist Recommendation**:\n` +
                 `   - Create a structured project outline\n` +
                 `   - Schedule a milestone review session\n` +
                 `   - Delegate action items to specific owners`;
    }

    return { success: true, results };
  },
});

// Configure the ADK LlmAgent
const todoAgent = new LlmAgent({
  name: "todo_agent",
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  instruction: `You are a premium, helpful AI Task Assistant sidekick integrated directly into the user's To-Do list.
Your mission is to help the user manage their tasks, categorize them, prioritize them, search the web to answer questions, and break down goals into concrete list items.

You are equipped with tools to manipulate the user's todo list in-real-time:
- 'add_todo': Add tasks. Call this multiple times to break down complex goals into subtasks!
- 'complete_todo': Complete a task.
- 'delete_todo': Remove a task.
- 'update_todo': Edit task properties (priority, category, title, due dates).
- 'web_search': Perform research for recipes, facts, lists, etc.

When a user asks for something, first call 'web_search' if they need research. Then use 'add_todo', 'complete_todo', or other tools to adjust the list. You can call tools multiple times in a single response turn!
Always summarize what you did in your final text response. Be professional, cheerful, and precise.`,
  tools: [addTodoTool, completeTodoTool, deleteTodoTool, updateTodoTool, webSearchTool],
});

// POST endpoint handler
export async function POST(request: Request) {
  try {
    const { message, todos, sessionId } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Capture original state, modify it through in-memory tools
    tempTodos = todos ? [...todos] : [];

    const sessionService = new InMemorySessionService();
    const runner = new Runner({
      agent: todoAgent,
      appName: "TodoAgentApp",
      sessionService,
    });

    let responseText = "";
    const activeSession = sessionId || "default-session";

    // Ensure session is pre-created in the transient InMemorySessionService
    await sessionService.createSession({
      appName: "TodoAgentApp",
      userId: "user",
      sessionId: activeSession,
    });


    // Run the agent loop
    for await (const event of runner.runAsync({
      userId: "user",
      sessionId: activeSession,
      newMessage: {
        role: "user",
        parts: [{ text: message }],
      },
    })) {
      if (event.content && event.content.parts) {
        for (const part of event.content.parts) {
          if (part.text) {
            responseText += part.text;
          }
        }
      }
    }

    return NextResponse.json({
      response: responseText,
      todos: tempTodos,
    });
  } catch (error: any) {
    console.error("ADK Agent Endpoint Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
