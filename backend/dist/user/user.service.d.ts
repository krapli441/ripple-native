import { Model } from 'mongoose';
import { User } from './user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(userData: any): Promise<User>;
}
