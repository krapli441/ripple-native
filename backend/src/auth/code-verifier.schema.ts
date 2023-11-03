import { Schema, Document } from 'mongoose';

export const CodeVerifierSchema = new Schema({
  code_verifier: String,
  user_agent: String,
  ip: String,
  createdAt: { type: Date, default: Date.now, expires: '10m' }, // 10분 후에 만료
});

export interface CodeVerifier extends Document {
  code_verifier: string;
  user_agent: string;
  ip: string;
  createdAt: Date;
}
