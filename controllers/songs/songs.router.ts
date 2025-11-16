import express from "express";
import { httpAddSong, httpGetSongs } from "./songs.controller.js"
import { requireApiKey } from "../../middleware/apiKey.js"

const songsRouter = express.Router()

/**
 * @openapi
 * /songs:
 *   get:
 *     tags:
 *       - Songs
 *     summary: Get all songs
 *     description: Retrieve a paginated list of all songs in the database
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
 *         description: Paginated list of songs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of songs
 *                     limit:
 *                       type: integer
 *                       description: Number of items per page
 *                     offset:
 *                       type: integer
 *                       description: Current offset
 *                     hasMore:
 *                       type: boolean
 *                       description: Whether there are more items to fetch
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
songsRouter.get('/', httpGetSongs)

/**
 * @openapi
 * /songs:
 *   post:
 *     tags:
 *       - Songs
 *     summary: Add a new song
 *     description: Create a new song entry in the database
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - artist
 *               - length
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *                 example: Wonderwall
 *               artist:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *                 example: Oasis
 *               length:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 7200
 *                 description: Song length in seconds
 *                 example: 258
 *               genre:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: Rock
 *     responses:
 *       201:
 *         description: Song created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       400:
 *         description: Validation error
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
songsRouter.post('/', requireApiKey, httpAddSong)

export { songsRouter };