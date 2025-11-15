import express from "express";
import { httpAddSong, httpGetSongs } from "./songs.controller.js"

const songsRouter = express.Router()

/**
 * @openapi
 * /songs:
 *   get:
 *     tags:
 *       - Songs
 *     summary: Get all songs
 *     description: Retrieve a list of all songs in the database
 *     responses:
 *       200:
 *         description: List of songs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
songsRouter.post('/', httpAddSong)

export { songsRouter };