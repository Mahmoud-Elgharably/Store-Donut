import { Product, ProductStore } from '../models/product';
import { Category, CategoryStore } from '../models/category';
import config from '../config';

const store = new ProductStore();
const storeCategory = new CategoryStore();

describe('Product Model', () => {
    let cat_id = 0;
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
        cat_id = await addCategory();
        const result = await store.create({
            id: 0,
            name: 'OPPO XI-3200',
            price: 7500,
            category_id: cat_id,
        });
        const { id, name, price, category_id } = result as Product;
        expect(id).toEqual(1);
        expect(name).toEqual('OPPO XI-3200');
        expect(price).toEqual(7500);
        expect(category_id.toString()).toEqual(cat_id.toString());
        //expect(result).toEqual({
        //    id: 1,
        //    name: 'OPPO XI-3200',
        //    price: 7500,
        //    category_id: cat_id,
        //});
    });

    it(config.msgShudRtLst, async () => {
        const result = await store.index();
        const [{ id, name, price, category_id }] = result as Product[];
        expect(id).toEqual(1);
        expect(name).toEqual('OPPO XI-3200');
        expect(price).toEqual(7500);
        expect(category_id.toString()).toEqual(cat_id.toString());
        //expect(result).toEqual([
        //    {
        //        id: 1,
        //        name: 'OPPO XI-3200',
        //        price: 7500,
        //        category_id: cat_id,
        //    },
        //]);
    });

    it(config.msgShudRtItm, async () => {
        const result = await store.show('1');
        const { id, name, price, category_id } = result as Product;
        expect(id).toEqual(1);
        expect(name).toEqual('OPPO XI-3200');
        expect(price).toEqual(7500);
        expect(category_id.toString()).toEqual(cat_id.toString());
        //expect(result).toEqual({
        //    id: 1,
        //    name: 'OPPO XI-3200',
        //    price: 7500,
        //    category_id: cat_id,
        //});
    });

    it(config.msgShudEdItm, async () => {
        const result = await store.update({
            id: 1,
            name: 'NOKIA 50',
            price: 2100,
            category_id: cat_id,
        });
        const { id, name, price, category_id } = result as Product;
        expect(id).toEqual(1);
        expect(name).toEqual('NOKIA 50');
        expect(price).toEqual(2100);
        expect(category_id.toString()).toEqual(cat_id.toString());
        //expect(result).toEqual({
        //    id: 1,
        //    name: 'NOKIA 50',
        //    price: 2100,
        //    category_id: cat_id,
        //});
    });

    it(config.msgShudDtItm, async () => {
        await store.delete('1');
        await storeCategory.delete(cat_id.toString());
        const result = await store.index();
        expect(result).toEqual([]);
    });

    afterAll(async () => {
        await store.truncate();
        await storeCategory.truncate();
        const result = await store.index();
        expect(result).toEqual([]);
    });

    async function addCategory(): Promise<number> {
        const result = await storeCategory.create({
            id: 0,
            name: 'Mobiles',
        });
        const { id } = result as Category;
        return id;
    }
});
