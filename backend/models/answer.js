import mongoose from 'mongoose';

const answerSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Answer content is required']
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Answer question is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Answer user is required']
  },
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
