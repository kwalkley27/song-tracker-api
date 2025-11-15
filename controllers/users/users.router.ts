import express from "express";
import { httpAddUser, httpGetUsers } from "./users.controller.js"

const usersRouter = express.Router()

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all registered users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRouter.get('/', httpGetUsers)

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Register a new user with a username and instrument
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - instrument
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 pattern: ^[a-zA-Z0-9_-]+$
 *                 description: Unique username (alphanumeric, hyphens, and underscores only)
 *                 example: john_doe
 *               instrument:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 description: Primary instrument
 *                 example: Guitar
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Username already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRouter.post('/', httpAddUser)

export { usersRouter };