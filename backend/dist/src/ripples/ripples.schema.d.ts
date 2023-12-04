import mongoose, { Document } from 'mongoose';
export interface Location {
    type: string;
    coordinates: number[];
}
export interface IRipple extends Document {
    userId: string;
    title: string;
    artist: string;
    albumCoverUrl?: string;
    spotifyExternalUrl?: string;
    location: Location;
    tag?: string[];
    likes: number;
    createdAt: Date;
    expiresAt?: Date;
    likedUsers: string[];
}
export declare class Ripple extends Document {
    userId: string;
    userObjectId: mongoose.Types.ObjectId;
    title: string;
    artist: string;
    albumCoverUrl: string;
    spotifyExternalUrl: string;
    location: Location;
    tag: string[];
    isActive: boolean;
    likedUsers: string[];
}
export declare const RippleSchema: mongoose.Schema<Ripple, mongoose.Model<Ripple, any, any, any, mongoose.Document<unknown, any, Ripple> & Ripple & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Ripple, mongoose.Document<unknown, {}, mongoose.FlatRecord<Ripple>> & mongoose.FlatRecord<Ripple> & {
    _id: mongoose.Types.ObjectId;
}>;
