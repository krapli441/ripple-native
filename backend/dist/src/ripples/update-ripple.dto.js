"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRippleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ripple_dto_1 = require("./create-ripple.dto");
class UpdateRippleDto extends (0, mapped_types_1.PartialType)(create_ripple_dto_1.CreateRippleDto) {
}
exports.UpdateRippleDto = UpdateRippleDto;
//# sourceMappingURL=update-ripple.dto.js.map