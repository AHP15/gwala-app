import mongoose from 'mongoose';
import User from './user.js';
import Question from './question.js';
import Answer from './answer.js';
import Notification from './notification.js';
import Favorite from './favorite.js';

let isConnected = false;

const DB = {
    user: User,
    question: Question,
    answer: Answer,
    notification: Notification,
    favorite: Favorite,
    connect(uri, name) {
        if (isConnected) return;

        mongoose.connect(uri, {
            dbName: name,
        })
            .then(() => {
                console.log("Connecting to the DB seccussfully!!", name);
                isConnected = true;
            })
            .catch(err => {
                console.log("Error while connecting to the db", err);
                // eslint-disable-next-line no-undef
                process.exit();
            });
    }
};

export default DB;
