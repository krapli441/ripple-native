import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(userData: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateData: Partial<CreateUserDto>): Promise<User>;
}
