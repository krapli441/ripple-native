"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const passport = require("passport");
const session = require("express-session");
const exeption_filter_1 = require("./filters/exeption-filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(passport.initialize());
    app.useGlobalFilters(new exeption_filter_1.AllExceptionsFilter());
    app.use(session({
        secret: 'your-session-secret',
        resave: false,
        saveUninitialized: false,
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map