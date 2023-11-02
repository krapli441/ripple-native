"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log('Before Passport initialization');
    app.use(passport.initialize());
    console.log('After Passport initialization');
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map