import * as mongoose from 'mongoose';
export interface Tag extends Document {
    name: string;
}
export declare const TagSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name?: string;
}>> & mongoose.FlatRecord<{
    name?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
