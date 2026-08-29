import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomCode(length = 6) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export const joinWaitlist = mutation({
  args: {
    caregiverName: v.string(),
    caregiverPhone: v.string(),
    parentName: v.string(),
    parentCondition: v.string(),
  },
  handler: async (ctx, args) => {
    let inviteCode = randomCode();
    while (
      await ctx.db
        .query("waitlist")
        .withIndex("by_inviteCode", (q) => q.eq("inviteCode", inviteCode))
        .first()
    ) {
      inviteCode = randomCode();
    }

    await ctx.db.insert("waitlist", {
      ...args,
      inviteCode,
      createdAt: Date.now(),
    });

    return inviteCode;
  },
});

export const countWaitlist = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("waitlist").collect();
    return rows.length;
  },
});
