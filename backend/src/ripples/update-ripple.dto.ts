import { PartialType } from '@nestjs/mapped-types';
import { CreateRippleDto } from './create-ripple.dto';

export class UpdateRippleDto extends PartialType(CreateRippleDto) {}
