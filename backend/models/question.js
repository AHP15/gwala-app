import mongoose from 'mongoose';
import { sendAnswerNotification, sendLikeNotification } from '../utils/mailer.js';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Question title is required'],
  },
  content: {
    type: String,
    required: [true, 'Question content is required']
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
  locationName: {
    type: String,
    required: [true, 'Question location is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Question user is required'
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});


questionSchema.index({ location: '2dsphere' });

const Question = mongoose.model('Question', questionSchema);

const changeStream = Question.watch();

changeStream.on('change', (change) => {
  const userEmail = change.documentKey.author.email;

  if (change.operationType === 'update') {

    if (change.updateDescription.updatedFields.likes) {
      sendLikeNotification(userEmail);
    } else if (change.updateDescription.updatedFields.answers) {
      sendAnswerNotification(userEmail);
    }
  }
});

export default Question;
