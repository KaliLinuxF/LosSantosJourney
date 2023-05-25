import { InterfaceId } from "./InerfaceId";

export type RcpMethod = <T>(payload?: T) => ({ type: string, payload: T });

export class RpcDataTransfer {
    public readonly interfaceName: InterfaceId;
    private readonly methods: { [key: string]: RcpMethod }; 

    constructor(interfaceName: InterfaceId) {
        this.interfaceName = interfaceName;
        this.methods = {};
    }

    addMethod(key: string, method: RcpMethod) {
        this.methods[key] = method;
    }

    callMethod(key: string, payload: any) {
        const method = this.methods[key];

        if(!method) {
            return null;
        }

        return method(payload);
    }
}