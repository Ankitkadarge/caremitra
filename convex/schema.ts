import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    caregiverName: v.string(),
    caregiverPhone: v.string(),
    parentName: v.string(),
    parentCondition: v.string(),
    createdAt: v.number(),
    inviteCode: v.string(),
  }).index("by_inviteCode", ["inviteCode"]),

  checkins: defineTable({
    inviteCode: v.string(),
    transcript: v.string(),
    structured: v.any(),
    createdAt: v.number(),
  }).index("by_inviteCode", ["inviteCode"]),

  earlyAccess: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    createdAt: v.number(),
  }),
});
