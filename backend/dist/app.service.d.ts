import { ConfigService } from '@nestjs/config';
export declare class AppService {
    getHello(): string;
}
export declare class MyService {
    private configService;
    constructor(configService: ConfigService);
    someMethod(): void;
}
