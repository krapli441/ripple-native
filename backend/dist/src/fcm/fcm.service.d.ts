export declare class FcmService {
    constructor();
    sendNotification(token: string, title: string, body: string): Promise<void>;
}
