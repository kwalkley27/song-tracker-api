import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Song Tracker API',
      version: '1.0.0',
      description: 'API to help musicians keep track of and manage songs they know and build dynamic setlists',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'https://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Song: {
          type: 'object',
          required: ['title', 'artist', 'length', 'genre'],
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated song ID',
              example: 1,
            },
            title: {
              type: 'string',
              description: 'Song title',
              minLength: 1,
              maxLength: 200,
              example: 'Wonderwall',
            },
            artist: {
              type: 'string',
              description: 'Artist name',
              minLength: 1,
              maxLength: 200,
              example: 'Oasis',
            },
            length: {
              type: 'integer',
              description: 'Song length in seconds',
              minimum: 1,
              maximum: 7200,
              example: 258,
            },
            genre: {
              type: 'string',
              description: 'Music genre',
              minLength: 1,
              maxLength: 50,
              example: 'Rock',
            },
          },
        },
        User: {
          type: 'object',
          required: ['username', 'instrument'],
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated user ID',
              example: 1,
            },
            username: {
              type: 'string',
              description: 'Unique username (alphanumeric, hyphens, underscores only)',
              minLength: 3,
              maxLength: 50,
              pattern: '^[a-zA-Z0-9_-]+$',
              example: 'john_doe',
            },
            instrument: {
              type: 'string',
              description: 'Primary instrument',
              minLength: 1,
              maxLength: 100,
              example: 'Guitar',
            },
            lastPlayed: {
              type: 'string',
              format: 'date-time',
              description: 'Last time the user played',
              example: '2025-01-15T12:00:00.000Z',
            },
          },
        },
        PlayedSong: {
          type: 'object',
          required: ['userId', 'songId', 'score'],
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated played song ID',
              example: 1,
            },
            userId: {
              type: 'integer',
              description: 'ID of the user who played the song',
              minimum: 1,
              example: 1,
            },
            songId: {
              type: 'integer',
              description: 'ID of the song that was played',
              minimum: 1,
              example: 1,
            },
            score: {
              type: 'integer',
              description: 'Performance score (0-100)',
              minimum: 0,
              maximum: 100,
              example: 85,
            },
            timePlayed: {
              type: 'string',
              format: 'date-time',
              description: 'When the song was played (auto-generated)',
              example: '2025-01-15T14:30:00.000Z',
            },
          },
        },
        PlayedSongWithDetails: {
          allOf: [
            { $ref: '#/components/schemas/PlayedSong' },
            {
              type: 'object',
              properties: {
                song: {
                  $ref: '#/components/schemas/Song',
                },
              },
            },
          ],
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Validation failed',
            },
            details: {
              type: 'array',
              description: 'Detailed validation errors',
              items: {
                type: 'object',
                properties: {
                  code: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                  path: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Songs',
        description: 'Song management endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Played Songs',
        description: 'Track played songs with scores',
      },
      {
        name: 'Setlist',
        description: 'Generate setlists for performances',
      },
    ],
  },
  apis: ['./controllers/**/*.router.ts'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
