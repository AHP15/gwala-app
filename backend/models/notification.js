import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['answer', 'like'], required: true },
  relatedQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
