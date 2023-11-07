/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
export interface Location {
    latitude: number;
    longitude: number;
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
}
export declare class Ripple extends Document {
    userId: string;
    title: string;
    artist: string;
    albumCoverUrl: string;
    spotifyExternalUrl: string;
    location: Location;
    tag: string[];
    likes: number;
    expiresAt: Date;
}
export declare const RippleSchema: import("mongoose").Schema<Ripple, import("mongoose").Model<Ripple, any, any, any, Document<unknown, any, Ripple> & Ripple & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ripple, Document<unknown, {}, import("mongoose").FlatRecord<Ripple>> & import("mongoose").FlatRecord<Ripple> & {
    _id: import("mongoose").Types.ObjectId;
}>;