import ViteExpress from 'vite-express';

import app from './backend/app.js';


// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
    app.listen(8080, () => {
        console.log('Server listening on', 'http://localhost:8080');
    });
} else {
    ViteExpress.listen(app, 8080, () => console.log("Server is listening on http://localhost:8080"));
}

console.log('ok')