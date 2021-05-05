"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var cors_1 = __importDefault(require("cors"));
var api_engine_1 = require("./engine/api-engine");
var apis = __importStar(require("./assets/api-description.json"));
var morgan_1 = __importDefault(require("morgan"));
var CstLogger_1 = require("./logger/CstLogger");
var parameters_parser_1 = require("./engine/parameters-parser/parameters-parser");
var log = CstLogger_1.factory.getLogger("index.ts");
var morganTpl = ':date[iso] INFO [:method HTTP/:http-version] To -> :remote-addr:url';
parameters_parser_1.ParameterParser.parse();
log.info("Initializing express...");
var app = express_1.default();
var port = 3000;
app.use(morgan_1.default(morganTpl));
log.info("Configuring server to use cors...");
app.use(cors_1.default());
log.info("Configuring body parser middleware...");
app.use(express_1.urlencoded({ extended: false }));
app.use(express_1.json());
var apiEngine = new api_engine_1.ApiEngine(app);
apiEngine.initialize(apis);
app.listen(port, function () {
    log.info('Server started on port ' + port + '.');
});
//# sourceMappingURL=index.js.map