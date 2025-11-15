import express from "express";
import {
    httpGetPlayedSongs,
    httpAddPlayedSong,
    httpGetLatestPlayedSongs,
 } from "./playedsongs.controller.js"
import { requireApiKey } from "../../middleware/apiKey.js"

const playedSongsRouter = express.Router()

/**
 * @openapi
 * /playedsongs:
 *   get:
 *     tags:
 *       - Played Songs
 *     summary: Get all played songs
 *     description: Retrieve a paginated list of all played song records
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of items to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of items to skip
 *     responses:
 *       200:
 *         description: Paginated list of played songs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PlayedSong'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     offset:
 *                       type: integer
 *                     hasMore:
 *                       type: boolean
 *       400:
 *         description: Invalid query parameters
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
playedSongsRouter.get('/', httpGetPlayedSongs)

/**
 * @openapi
 * /playedsongs/latest/{userId}:
 *   get:
 *     tags:
 *       - Played Songs
 *     summary: Get latest played songs for a user
 *     description: Retrieve the most recently played songs for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: User ID
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 5
 *         description: Maximum number of songs to return
 *         example: 10
 *     responses:
 *       200:
 *         description: Latest played songs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlayedSong'
 *       400:
 *         description: Invalid userId or limit parameter
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
playedSongsRouter.get('/latest/:userId', httpGetLatestPlayedSongs)

/**
 * @openapi
 * /playedsongs:
 *   post:
 *     tags:
 *       - Played Songs
 *     summary: Record a played song
 *     description: Create a record of a song being played with a performance score
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - songId
 *               - score
 *             properties:
 *               userId:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID of the user who played the song
 *                 example: 1
 *               songId:
 *                 type: integer
 *                 minimum: 1
 *                 description: ID of the song that was played
 *                 example: 1
 *               score:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 100
 *                 description: Performance score (0-100)
 *                 example: 85
 *     responses:
 *       201:
 *         description: Played song recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayedSong'
 *       400:
 *         description: Validation error or invalid foreign key reference
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Invalid API key
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
playedSongsRouter.post('/', requireApiKey, httpAddPlayedSong)

export {
    playedSongsRouter,
}