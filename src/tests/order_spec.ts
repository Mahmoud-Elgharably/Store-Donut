import { Order, OrderStore } from '../models/order';
import config from '../config';
import { Status, StatusStore } from '../models/status';
import { User, UserStore } from '../models/user';

const store = new OrderStore();
const storeStatus = new StatusStore();
const storeUser = new UserStore();

describe('Order Model', () => {
    let sts_id = 0;
    let usr_id = 0;
    it(config.msgShudHvIdx, () => {
        expect(store.index).toBeDefined();
    });

    it(config.msgShudHvShw, () => {
        expect(store.show).toBeDefined();
    });

    it(config.msgShudHvCrt, () => {
        expect(store.create).toBeDefined();
    });

    it(config.msgShudHvUpd, () => {
        expect(store.update).toBeDefined();
    });

    it(config.msgShudHvDel, () => {
        expect(store.delete).toBeDefined();
    });

    it(config.msgShudAdItm, async () => {
        sts_id = await addStatus();
        usr_id = await addUser();
        const result = await store.create({
            id: 0,
            status_id: sts_id,
            user_id: usr_id,
        });
        const { id, status_id, user_id } = result as Order;
        expect(id).toEqual(1);
        expect(status_id.toString()).toEqual(sts_id.toString());
        expect(user_id.toString()).toEqual(usr_id.toString());
        //expect(result).toEqual({
        //    id: 1,
        //    status_id: sts_id,
        //    user_id: usr_id,
        //});
    });

    it(config.msgShudRtLst, async () => {
        const result = await store.index();
        const [{ id, status_id, user_id }] = result as Order[];
        expect(id).toEqual(1);
        expect(status_id.toString()).toEqual(sts_id.toString());
        expect(user_id.toString()).toEqual(usr_id.toString());
        //expect(result).toEqual([
        //    {
        //        id: 1,
        //        status_id: sts_id,
        //        user_id: usr_id,
        //    },
        //]);
    });

    it(config.msgShudRtItm, async () => {
        const result = await store.show('1');
        const { id, status_id, user_id } = result as Order;
        expect(id).toEqual(1);
        expect(status_id.toString()).toEqual(sts_id.toString());
        expect(user_id.toString()).toEqual(usr_id.toString());
        //expect(result).toEqual({
        //    id: 1,
        //    status_id: sts_id,
        //    user_id: usr_id,
        //});
    });

    it(config.msgShudEdItm, async () => {
        const result = await store.update({
            id: 1,
            status_id: 1,
            user_id: usr_id,
        });
        const { id, status_id, user_id } = result as Order;
        expect(id).toEqual(1);
        expect(status_id.toString()).toEqual('1');
        expect(user_id.toString()).toEqual(usr_id.toString());
        //expect(result).toEqual({
        //    id: 1,
        //    status_id: 1,
        //    user_id: usr_id,
        //});
    });

    it(config.msgShudDtItm, async () => {
        await store.delete('1');
        await storeStatus.delete('1');
        await storeStatus.delete(sts_id.toString());
        await storeUser.delete(usr_id.toString());
        const result = await store.index();
        expect(result).toEqual([]);
    });

    afterAll(async () => {
        await store.truncate();
        await storeStatus.truncate();
        await storeUser.truncate();
        const result = await store.index();
        expect(result).toEqual([]);
    });

    async function addStatus(): Promise<number> {
        await storeStatus.create({
            id: 0,
            name: 'active',
        });
        const result = await storeStatus.create({
            id: 0,
            name: 'complete',
        });
        const { id } = result as Status;
        return id;
    }

    async function addUser(): Promise<number> {
        const result = await storeUser.create({
            id: 0,
            first_name: 'Gamal',
            last_name: 'Sad',
            user_name: 'gmy',
            password: '123',
        });
        const { id } = result as User;
        return id;
    }
});
