import * as mongoose from 'mongoose';

export const PhotoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageData: { type: Buffer, required: true },
});

export interface Photo extends mongoose.Document {
  userId: string;
  imageData: Buffer;
}

export const PhotoModel = mongoose.model<Photo>('Photo', PhotoSchema);
