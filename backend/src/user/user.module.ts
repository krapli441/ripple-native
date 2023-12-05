import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { RipplesModule } from 'src/ripples/ripples.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => RipplesModule),
  ],
  providers: [UserService],
  exports: [UserService],
  // ...
})
export class UserModule {}
