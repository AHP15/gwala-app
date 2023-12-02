import express from 'express';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import userRouter from './routes/user.js';
import CustomError from './utils/customError.js';


const app = express();

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {

    const __dirname = dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(__dirname, 'static')));

    app.get('*', (req, res) => {
        res.redirect('index.html');
    });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

app.get('/hello', (_, res) => res.status(200).send({ message: 'Hello there' }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, _) => {
    const custom = new CustomError(err.message);
    res.status(custom.statusCode).send({
        success: false,
        data: null,
        error: custom.message
    });
});


export default app;