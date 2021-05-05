export class ApiEngine {
    private app: any;

    constructor(app: any) {
        this.app = app;
    }

    initialize(apiDescription: any) {
        let descriptions = apiDescription.api;

        for(let d of descriptions) {
            switch(d.method) {
                case 'GET':
                    this.app.get(d.endPoint, (req: any, res: any) => {
                        let params: string[] = this.parseParameters(d.endPoint);
                        let paramsAssoc: any = {};
                        if(params.length > 0) {
                            for(let p of params) {
                                if(d.response.p && d.response.p === '*') {
                                    d.response.p = req.params.p;
                                }
                                paramsAssoc.p = req.params.p;
                            }
                        }
                        res.status(d.status);
                        res.send(d.response);
                    })
                    break;
            }
        }
    }

    private parseParameters(endPoint: string): string[] {
        let s: string[] = endPoint.split('/');
        let params: string[] = [];
        for(let p of s) {
            if(p.startsWith(':')) {
                params.push(p.substr(1));
            }
        }
        return params;
    }
}