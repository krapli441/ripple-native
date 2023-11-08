import { Controller, Get } from '@nestjs/common';
import { TagService } from './music-tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/random')
  async getRandomTags() {
    return this.tagService.getRandomTags();
  }
}
