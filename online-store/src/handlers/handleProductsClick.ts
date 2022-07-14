import { StorageService } from '../core-functions/storage';

export function handleProductsClick(e: Event) {
    let productElem = (e.target as HTMLElement).closest(".product") as HTMLElement;
    if (!productElem) { return }
    let productId = productElem.dataset.id!;
    let cart = StorageService.getCart() as [string];

    if (cart.includes(productId!)) {
        StorageService.deleteFromCart(productId);
        productElem.classList.remove('product_active')
    } else {
        StorageService.addToCart(productId);
        productElem.classList.add('product_active')
    }
    //update products view
    // updateCartView();
}