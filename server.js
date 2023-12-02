/* eslint-disable no-undef */
import ViteExpress from 'vite-express';

import app from './backend/app.js';
import DB from './backend/models/index.js';

// connection to the DB
DB.connect(process.env.DATABASE_URL, 'gwala');

if (process.env.NODE_ENV === 'production') {
    app.listen(8080, () => {
        console.log('Server listening on', 'http://localhost:8080');
    });
} else {
    ViteExpress.listen(app, 8080, () => console.log("Server is listening on http://localhost:8080"));
}
