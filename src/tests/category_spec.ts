import { CategoryStore } from '../models/category';
import config from '../config';

const store = new CategoryStore();

describe('Category Model', () => {
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
            name: 'Mobiles',
        });
        expect(result).toEqual({
            id: 1,
            name: 'Mobiles',
        });
    });

    it(config.msgShudRtLst, async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'Mobiles',
            },
        ]);
    });

    it(config.msgShudRtItm, async () => {
        const result = await store.show('1');
        expect(result).toEqual({
            id: 1,
            name: 'Mobiles',
        });
    });

    it(config.msgShudEdItm, async () => {
        const result = await store.update({
            id: 1,
            name: 'Computers',
        });
        expect(result).toEqual({
            id: 1,
            name: 'Computers',
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
