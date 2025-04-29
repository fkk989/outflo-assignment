"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = createResponse;
function createResponse(success, message, props) {
    return Object.assign({ success, message }, props);
}
