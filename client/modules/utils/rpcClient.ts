import rpc from '../../../shared/rpc';
import Events from './Events';
import { ExecuteServerData } from '../../../shared/rpc/executeServerData';

rpc.register('executeServer', (rpcData: ExecuteServerData) => {
    if(!rpcData.event) {
        return;
    }

    if(!rpcData?.data) {
        Events.callRemote(rpcData.event);
        return;
    }

    if(typeof rpcData.data === 'object') {
        rpcData.data = JSON.stringify(rpcData.data);
    }

    Events.callRemote(rpcData.event, rpcData.data);
});