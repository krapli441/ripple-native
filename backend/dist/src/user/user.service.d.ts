import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { RipplesService } from 'src/ripples/ripples.service';
export declare class UserService {
    private userModel;
    private rippleService;
    constructor(userModel: Model<User>, rippleService: RipplesService);
    create(userData: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateData: Partial<CreateUserDto>): Promise<User>;
    findById(userId: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    deleteUser(userId: string): Promise<void>;
}
