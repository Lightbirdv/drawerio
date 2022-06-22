"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    return response.status(status).send({
        message,
    });
}
exports.default = errorMiddleware;
