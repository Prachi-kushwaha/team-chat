
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

const generateCode = () => {
    const code = Array.from(
        { length: 6 },
        () =>
            "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
    ).join("")

    return code;

}

export const join = mutation({
    args: {
        joincode: v.string(),
        workspaceId: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)

        if(!userId){
            throw new Error("Unauthorized")
        }

        const workspace = await ctx.db.get(args.workspaceId)

        if(!workspace){
            throw new Error("work space not found")
        }

        if(workspace.joincode!==args.joincode.toLowerCase()){
            throw new Error("invalid join code")
        }

        const existingMember = await ctx.db
        .query("members")
        .withIndex("by_workspace_id_and_user_id", (q) => q.eq("workspaceId", args.workspaceId).eq("userId", userId))
        .unique()

        if(existingMember){
            throw new Error("Already a member to this workspace")
        }

        await ctx.db.insert("members", {
            userId,
            workspaceId:workspace._id,
            role:"member"
        })
        return workspace._id

    }})

export const newJoinCode = mutation({
    args:{
        workspaceId : v.id("workspaces"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)
        if(!userId){
         throw new Error("Unauthorized")
        }
        const member = await ctx.db
        .query("members")
        .withIndex("by_workspace_id_and_user_id", (q) => q.eq("workspaceId", args.workspaceId))    
        .unique()

        if(!member|| member.role!=="admin"){
            throw new Error("Unauthorized")
        }

        const joinCode = generateCode()

        await ctx.db.patch(args.workspaceId, {
            joincode:joinCode
        })
        return args.workspaceId
    }
})

export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx)

        if (!userId) {
            throw new Error("Unauthorized")
        }

        const joincode = generateCode()

        const workSpaceId = await ctx.db.insert("workspaces", {
            name: args.name,
            userId,
            joincode
        })
        await ctx.db.insert("channels", {
            name: "general",
            workspaceId: workSpaceId    
        })

        await ctx.db.insert("members", {
            userId,
            workspaceId: workSpaceId,
            role: "admin"
        })
        return workSpaceId
    },
})

export const getWorkspaces = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("workspaces").collect()
    }
})

export const get = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx)

        if (!userId) {
            return []
        }

        const members = await ctx.db
            .query("members")
            .withIndex("by_user_id", (q) => q.eq("userId", userId))
            .collect()

        const workspaceIds = members.map(m => m.workspaceId)

        const workspaces = [];

        for (const workspaceId of workspaceIds) {
            const workspace = await ctx.db.get(workspaceId)

            if (workspace) {
                workspaces.push(workspace)
            }
        }
        return workspaces
    }
})

export const getInfoById = query({
    args: { id: v.id("workspaces") },
    handler:async(ctx, args)=>{
        const userId = await auth.getUserId(ctx);
        if(!userId){
            return null
        }

        const member = await ctx.db
           .query("members")
           .withIndex("by_workspace_id_and_user_id", (q) => q.eq("workspaceId", args.id).eq("userId", userId),)
           .unique()

           const workspace = await ctx.db.get(args.id)

           return {
            name:workspace?.name,
            isMember:!!member
           }
    }
    
})

export const getById = query({
    args: { id: v.id("workspaces") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized"); // Ensure user is authenticated
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_and_user_id", (q) => q.eq("workspaceId", args.id).eq("userId", userId),
            )
            .unique()
        if (!member) {
            return null
        }

        return await ctx.db.get(args.id)
    }
})


export const update = mutation({
    args: {
        id: v.id("workspaces"),
        name: v.string()
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized"); // Ensure user is authenticated
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_and_user_id", (q) => q.eq("workspaceId", args.id).eq("userId", userId),
            )
            .unique()

        if (!member || member.role !== "admin") {
            throw new Error("Unauthorized")
        }

        await ctx.db.patch(args.id, { name: args.name })

        return args.id
    }
})
export const remove = mutation({
    args: {
        id: v.id("workspaces")
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (!userId) {
            throw new Error("Unauthorized"); // Ensure user is authenticated
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_and_user_id", (q) => q.eq("workspaceId", args.id).eq("userId", userId),
            )
            .unique()

        if (!member || member.role !== "admin") {
            throw new Error("Unauthorized")
        }

        const [members] = await Promise.all([
            ctx.db
                .query("members")
                .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.id))
                .collect()
        ])

        for (const member of members) {
            await ctx.db.delete(member._id);
        }

        await ctx.db.delete(args.id)

        return args.id
    }
})