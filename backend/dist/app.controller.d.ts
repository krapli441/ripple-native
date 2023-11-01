import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
}
export declare class ItemsController {
    private readonly logger;
    findAll(): string;
}
