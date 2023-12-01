import express from 'express';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


const app = express();

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {

    const __dirname = dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(__dirname, 'static')));

    app.get('*', (req, res) => {
        res.redirect('index.html');
    });
}

app.get('/hello', (_, res) => res.status(200).send({ message: 'Hello there' }));

export default app;