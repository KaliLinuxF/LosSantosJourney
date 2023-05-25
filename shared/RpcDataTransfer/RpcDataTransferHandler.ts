import { InterfaceId } from "./InerfaceId";
import { RpcDataTransfer } from "./RpcDataTransfer"

const storage = new Map<InterfaceId, RpcDataTransfer>();

export class RpcDataTransferHandler {
    static get(name: InterfaceId) {
        if(!storage.has(name)) {
            storage.set(name, new RpcDataTransfer(name));
        }
        
        return storage.get(name);
    }
}