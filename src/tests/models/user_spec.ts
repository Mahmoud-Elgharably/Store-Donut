import { User, UserStore } from '../../models/user';
import config from '../../config';

const store = new UserStore();

describe('User Model', () => {
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
        const result = await store.create({
            id: 0,
            first_name: 'Gamal',
            last_name: 'Sad',
            user_name: 'gmy',
            password: '123',
        });
        const { id, first_name, last_name, user_name } = result as User;
        expect(id).toEqual(1);
        expect(first_name).toEqual('Gamal');
        expect(last_name).toEqual('Sad');
        expect(user_name).toEqual('gmy');
    });

    it(config.msgShudRtLst, async () => {
        const result = await store.index();
        const [{ id, first_name, last_name, user_name }] = result as User[];
        expect(id).toEqual(1);
        expect(first_name).toEqual('Gamal');
        expect(last_name).toEqual('Sad');
        expect(user_name).toEqual('gmy');
    });

    it(config.msgShudRtItm, async () => {
        const result = await store.show('1');
        const { id, first_name, last_name, user_name } = result as User;
        expect(id).toEqual(1);
        expect(first_name).toEqual('Gamal');
        expect(last_name).toEqual('Sad');
        expect(user_name).toEqual('gmy');
    });

    it(config.msgShudAuthP, async () => {
        const result = await store.authenticate('gmy', '123');
        const { id, first_name, last_name, user_name } = result as User;
        expect(id).toEqual(1);
        expect(first_name).toEqual('Gamal');
        expect(last_name).toEqual('Sad');
        expect(user_name).toEqual('gmy');
    });

    it(config.msgShudAuthB, async () => {
        const result = await store.authenticate('gmy', '1');
        expect(result).toBeNull();
    });

    it(config.msgShudEdItm, async () => {
        const result = await store.update({
            id: 1,
            first_name: 'Murad',
            last_name: 'Zyad',
            user_name: 'mrd',
            password: '456',
        });
        const { id, first_name, last_name, user_name } = result as User;
        expect(id).toEqual(1);
        expect(first_name).toEqual('Murad');
        expect(last_name).toEqual('Zyad');
        expect(user_name).toEqual('mrd');
    });

    it(config.msgShudDtItm, async () => {
        await store.delete('1');
        const result = await store.index();
        expect(result).toEqual([]);
    });

    afterAll(async () => {
        await store.truncate();
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
