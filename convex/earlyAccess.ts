import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const join = mutation({
  args: { name: v.string(), email: v.string(), phone: v.string() },
  handler: async (ctx, { name, email, phone }) => {
    await ctx.db.insert("earlyAccess", { name, email, phone, createdAt: Date.now() });
  },
});
