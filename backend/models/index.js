import mongoose from 'mongoose';
import User from './user.js';
import Question from './question.js';
import Answer from './answer.js';
import Notification from './notification.js';
import Favorite from './favorite.js';

const DB = {
    mongoose,
    user: User,
    question: Question,
    answer: Answer,
    notification: Notification,
    favorite: Favorite,
};

export default DB;
