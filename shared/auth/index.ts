import { InterfaceId } from "../RpcDataTransfer/InerfaceId";
import { RpcDataTransferHandler } from "../RpcDataTransfer/RpcDataTransferHandler";

RpcDataTransferHandler.get(InterfaceId.Auth).addMethod('show', (payload) => {
    return { type: 'auth/show', payload }
});

console.log(RpcDataTransferHandler.get(InterfaceId.Auth).callMethod('show', 10));
