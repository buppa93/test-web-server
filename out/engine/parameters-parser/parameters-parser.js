"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterParser = void 0;
var CstLogger_1 = require("../../logger/CstLogger");
var log = CstLogger_1.factory.getLogger("ParameterParser");
var ParameterParser = /** @class */ (function () {
    function ParameterParser() {
    }
    ParameterParser.parse = function () {
        var appConfig;
        process.argv.forEach(function (val, index, array) {
            if (index > 1) {
                var splitted = val.split('=');
                switch (splitted[0]) {
                    case 'port':
                        try {
                            var port = parseInt(splitted[1]);
                            if (port > 65535) {
                                throw new Error(splitted[1] + ' is an invalid port number');
                            }
                            appConfig.port = +splitted[1];
                        }
                        catch (e) {
                            log.error(splitted[1] + ' is an invalid port number');
                        }
                        break;
                }
            }
        });
        return appConfig;
    };
    return ParameterParser;
}());
exports.ParameterParser = ParameterParser;
//# sourceMappingURL=parameters-parser.js.map