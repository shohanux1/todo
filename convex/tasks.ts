import { mutation , query} from "./_generated/server";
import { v } from "convex/values";
import { Id , Doc} from "./_generated/dataModel";
import { Auth } from "convex/server";



export const getUserId = async (ctx: { auth: Auth }) => {
  return (await ctx.auth.getUserIdentity())?.subject;
};

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return null;

    const notes = await ctx.db
      .query('tasks')
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    return notes;
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const createTask = mutation({
  args: { text: v.string() },
  handler: async (ctx, args): Promise<Id<"tasks">> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const taskId = await ctx.db.insert("tasks", {
      userId: identity.subject,
      text: args.text,
      completed: false,
      createdAt: Date.now(),
    });

    return taskId;
  },
});



export const toggle = mutation({
  args: { id: v.id("tasks"), completed: v.boolean() },
  handler: async (ctx, { id, completed }) => {
    // Optional: you can check user ownership here as well
    await ctx.db.patch(id, { completed });
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, { id }) => {
    // Optional: you can check user ownership here as well
    await ctx.db.delete(id);
  },
});