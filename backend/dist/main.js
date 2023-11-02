"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const loger_middleware_1 = require("./middleware/loger.middleware");
const passport = require("passport");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(new loger_middleware_1.LoggerMiddleware().use);
    app.use(passport.initialize());
    app.use(session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map