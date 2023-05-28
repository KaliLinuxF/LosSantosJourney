import rpc from '../../../shared/rpc';
import { ExecuteServerData } from '../../../shared/rpc/executeServerData';

rpc.register('executeServer', (rpcData: ExecuteServerData) => {
    if(!rpcData.event) {
        return;
    }

    if(!rpcData?.data) {
        mp.events.callRemote(rpcData.event);
        return;
    }

    if(typeof rpcData.data === 'object') {
        rpcData.data = JSON.stringify(rpcData.data);
    }

    mp.events.callRemote(rpcData.event, rpcData.data);
});