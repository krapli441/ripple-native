import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRippleDto } from './create-ripple.dto';
import { UpdateRippleDto } from './update-ripple.dto';
import { RipplesService } from './ripples.service';

@Controller('ripples')
export class RipplesController {
  constructor(private readonly ripplesService: RipplesService) {}

  @Post()
  create(@Body() createRippleDto: CreateRippleDto) {
    return this.ripplesService.create(createRippleDto);
  }

  @Get('/nearby')
  async findNearby(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('maxDistance') maxDistance: number,
  ) {
    return this.ripplesService.findNearbyRipples(
      longitude,
      latitude,
      maxDistance,
    );
  }

  @Get()
  findAll() {
    return this.ripplesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ripplesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRippleDto: UpdateRippleDto) {
    return this.ripplesService.update(id, updateRippleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.ripplesService.remove(id);
  }

  @Patch(':id/like')
  updateLike(@Param('id') id: string, @Body('userId') userId: string) {
    return this.ripplesService.updateLike(id, userId);
  }

  @Get('my-ripples/:userId')
  findMyRipples(@Param('userId') userId: string) {
    return this.ripplesService.findMyRipples(userId);
  }

  @Get('liked-ripples/:userId')
  async findLikedRipples(@Param('userId') userId: string) {
    return this.ripplesService.findLikedRipplesByUser(userId);
  }
}
