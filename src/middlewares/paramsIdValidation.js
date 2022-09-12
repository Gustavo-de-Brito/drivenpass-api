"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function paramsIdValidation(req, res, next) {
    const id = parseInt(req.params.id);
    if (isNaN(id))
        return res.status(422).send('valor de id inválido');
    next();
}
exports.default = paramsIdValidation;
