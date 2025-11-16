import express from "express";
import { httpGetSetlist } from "../setlist/setlist.controller.js"

const setlistRouter = express.Router()

/**
 * @openapi
 * /setlist/{userId}:
 *   get:
 *     tags:
 *       - Setlist
 *     summary: Generate a random setlist
 *     description: Generate a randomized setlist from a user's played songs. Returns songs with full details including the song information.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: User ID to generate setlist for
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 5
 *         description: Maximum number of songs in the setlist
 *         example: 10
 *     responses:
 *       200:
 *         description: Setlist generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlayedSongWithDetails'
 *       400:
 *         description: Invalid userId or limit parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               invalidUserId:
 *                 summary: Invalid user ID
 *                 value:
 *                   error: Invalid userId
 *               invalidLimit:
 *                 summary: Invalid limit value
 *                 value:
 *                   error: Invalid limit (must be 1-100)
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
setlistRouter.get('/:userId', httpGetSetlist)

export {
    setlistRouter,
}