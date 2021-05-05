"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiEngine = void 0;
var ApiEngine = /** @class */ (function () {
    function ApiEngine(app) {
        this.app = app;
    }
    ApiEngine.prototype.initialize = function (apiDescription) {
        var _this = this;
        var descriptions = apiDescription.api;
        var _loop_1 = function (d) {
            switch (d.method) {
                case 'GET':
                    this_1.app.get(d.endPoint, function (req, res) {
                        var params = _this.parseParameters(d.endPoint);
                        var paramsAssoc = {};
                        if (params.length > 0) {
                            for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                                var p = params_1[_i];
                                if (d.response.p && d.response.p === '*') {
                                    d.response.p = req.params.p;
                                }
                                paramsAssoc.p = req.params.p;
                            }
                        }
                        res.status(d.status);
                        res.send(d.response);
                    });
                    break;
            }
        };
        var this_1 = this;
        for (var _i = 0, descriptions_1 = descriptions; _i < descriptions_1.length; _i++) {
            var d = descriptions_1[_i];
            _loop_1(d);
        }
    };
    ApiEngine.prototype.parseParameters = function (endPoint) {
        var s = endPoint.split('/');
        var params = [];
        for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
            var p = s_1[_i];
            if (p.startsWith(':')) {
                params.push(p.substr(1));
            }
        }
        return params;
    };
    return ApiEngine;
}());
exports.ApiEngine = ApiEngine;
//# sourceMappingURL=api-engine.js.map