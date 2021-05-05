import { factory } from "../../logger/CstLogger";

const log = factory.getLogger("ParameterParser");

export class ParameterParser{
    public static parse(): AppConfig {

        let appConfig: AppConfig;

        process.argv.forEach(function (val, index, array) {
            if(index > 1) {
                let splitted = val.split('=');
                switch(splitted[0]) {
                    case 'port': 
                        try {
                            let port = parseInt(splitted[1]);
                            if(port > 65535) {
                                throw new Error(splitted[1] + ' is an invalid port number');
                            }
                            appConfig.port = +splitted[1];
                        } catch (e) {
                            log.error(splitted[1] + ' is an invalid port number');
                        }
                        break;
                }
            }
        });

        return appConfig;

    }
}

export interface AppConfig {
    port: number;
}