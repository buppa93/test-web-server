import express, { urlencoded, json } from 'express';
import cors from 'cors';
import { ApiEngine } from './engine/api-engine';
import * as apis from './assets/api-description.json';
import morgan from 'morgan';
import { factory } from "./logger/CstLogger";
import { ParameterParser } from './engine/parameters-parser/parameters-parser';

const log = factory.getLogger("index.ts");
const morganTpl = ':date[iso] INFO [:method HTTP/:http-version] To -> :remote-addr:url';

ParameterParser.parse();
log.info("Initializing express...");
const app = express();
const port = 3000;

app.use(morgan(morganTpl));

log.info("Configuring server to use cors...");
app.use(cors());

log.info("Configuring body parser middleware...");
app.use(urlencoded({ extended: false }));
app.use(json());

var apiEngine = new ApiEngine(app);
apiEngine.initialize(apis);
app.listen(port, () => {
    log.info('Server started on port ' + port + '.');
});