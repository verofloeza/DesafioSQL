import path, { dirname } from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
    db: {
        client: 'better-sqlite3', 
        connection: {
            filename: path.join(__dirname, '../../../db/mensajes.db3')
        },
        useNullAsDefault: true
    }
}
