import { Product } from '../interfaces/api';
import { SortSettings } from '../interfaces/internal';

export function getSortedProducts(productList: Product[], sortSettings: SortSettings) {
    const { type, direction } = sortSettings;
    // console.log('sort type:', type, ' sort direction:', direction);
    // console.log('unsorted list: ', productList);
    const sortedArr: Product[] = productList.sort((a, b) => {
        const comparableValue = (value: string | number | boolean | string[] | undefined) =>
            Number.isFinite(+value!) ? +value! : value;
        let left = comparableValue(a[type]);
        let right = comparableValue(b[type]);
        // console.log('left:', left, 'a:', a[type])
        // console.log('right:', right, 'b', b[type])
        try {
            if (left === right) return 0
            if (left! > right! && direction === 'asc'
                || left! < right! && direction === 'desc'
            ) {
                return 1
            } else return -1
        } catch (err) {
            console.error("Error on sort, skipping. Error: ", err)
            return 0
        }
    })
    // console.log('sorted list: ', sortedArr);
    return sortedArr;
}