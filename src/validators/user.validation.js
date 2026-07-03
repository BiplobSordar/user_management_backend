import { z } from "zod";



const params = z.object({
  id: z.string().min(1, "User id is required"),
});



export const createUserSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(2).max(30),

    lastName: z.string().trim().min(2).max(30),

    email: z.string().email(),

    age: z.number().int().min(18).max(60),
  }),
});


export const updateUserSchema = z.object({
  params,

  body: z.object({
    firstName: z.string().trim().min(2).max(30).optional(),

    lastName: z.string().trim().min(2).max(30).optional(),

    email: z.string().email().optional(),

    age: z.number().int().min(18).max(60).optional(),

    isActive: z.boolean().optional(),
  }),
});



export const userIdSchema = z.object({
  params,
});