import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

interface ApiKey {
    key: string;
    name: string;
    description: string;
}

interface AuthorizedKeys {
    keys: ApiKey[];
}

let authorizedKeys: Set<string> | null = null;

/**
 * Load authorized API keys from the authorized_keys.json file
 */
function loadAuthorizedKeys(): Set<string> {
    if (authorizedKeys !== null) {
        return authorizedKeys;
    }

    try {
        const keysPath = path.join(process.cwd(), 'authorized_keys.json');
        const fileContent = fs.readFileSync(keysPath, 'utf-8');
        const data: AuthorizedKeys = JSON.parse(fileContent);

        authorizedKeys = new Set(data.keys.map(k => k.key));
        console.log(`Loaded ${authorizedKeys.size} authorized API keys`);

        return authorizedKeys;
    } catch (error) {
        console.error('Failed to load authorized_keys.json:', error);
        throw new Error('API key configuration file not found or invalid');
    }
}

/**
 * Middleware to validate API key authentication
 * Expects API key in the X-API-Key header
 */
export function requireApiKey(req: Request, res: Response, next: NextFunction): void {
    try {
        const apiKey = req.header('X-API-Key');

        if (!apiKey) {
            res.status(401).json({
                error: 'Authentication required',
                message: 'Please provide an API key in the X-API-Key header'
            });
            return;
        }

        const keys = loadAuthorizedKeys();

        if (!keys.has(apiKey)) {
            res.status(403).json({
                error: 'Invalid API key',
                message: 'The provided API key is not authorized'
            });
            return;
        }

        // API key is valid, proceed to next middleware
        next();
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to validate API key'
        });
    }
}

/**
 * Reload authorized keys from disk (useful for updating keys without restart)
 */
export function reloadApiKeys(): void {
    authorizedKeys = null;
    loadAuthorizedKeys();
}
