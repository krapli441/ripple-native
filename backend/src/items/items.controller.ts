import { Controller, Logger, Get } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);

  @Get()
  findAll() {
    this.logger.log('findAll method is called');
    return 'This action returns all items';
  }
}
