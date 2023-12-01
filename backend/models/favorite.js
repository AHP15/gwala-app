import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
