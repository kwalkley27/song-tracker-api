import { addUser, getUsers } from "../../models/users.model.js"
import type { Request, Response } from "express"
import { createUserSchema, paginationQuerySchema } from "../../schemas/validation.js"
import { ZodError } from "zod"

async function httpAddUser(req:Request, res:Response) {
    try {
        // Validate request body with Zod
        const validatedUser = createUserSchema.parse(req.body);

        // Add the user to the database
        const newUser = await addUser(validatedUser);

        return res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: "Validation failed",
                details: error.issues
            });
        }
        throw error; // Re-throw for global error handler
    }
}

async function httpGetUsers(req:Request, res:Response) {
    try {
        // Validate pagination query parameters
        const { limit, offset } = paginationQuerySchema.parse(req.query);

        // Get users with pagination
        const result = await getUsers(limit, offset);

        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: "Invalid query parameters",
                details: error.issues
            });
        }
        throw error;
    }
}

export {
    httpAddUser,
    httpGetUsers,
}