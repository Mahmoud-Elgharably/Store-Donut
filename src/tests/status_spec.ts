import { StatusStore } from '../models/status';
import config from '../config';

const store = new StatusStore();

describe('Status Model', () => {
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
            name: 'active',
        });
        expect(result).toEqual({
            id: 1,
            name: 'active',
        });
    });

    it(config.msgShudRtLst, async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'active',
            },
        ]);
    });

    it(config.msgShudRtItm, async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            name: 'active',
        });
    });

    it(config.msgShudEdItm, async () => {
        const result = await store.update({
            id: 1,
            name: 'complete',
        });
        expect(result).toEqual({
            id: 1,
            name: 'complete',
        });
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
