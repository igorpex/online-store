import { StorageService } from '../core-functions/storage';
import { updateCartIcon } from '../view/updateCartIcon';

export function handleProductsClick(e: Event) {
    let productElem = (e.target as HTMLElement).closest(".product") as HTMLElement;
    if (!productElem) { return }
    let productId = productElem.dataset.id!;
    let cart = StorageService.getCart() as Array<string>;
    if (cart.includes(productId!)) {
        StorageService.deleteFromCart(productId);
        productElem.classList.remove('product_active')
        productElem.querySelector('.product__cart-icon-add')?.classList.add('product__cart-icon-add_active')
        productElem.querySelector('.product__cart-icon-remove')?.classList.remove('product__cart-icon-remove_active')
    } else {
        if (cart.length === 20) {
            alert("Извините, все слоты заполнены");
            return
        }
        StorageService.addToCart(productId);
        productElem.classList.add('product_active')
        productElem.querySelector('.product__cart-icon-add')?.classList.remove('product__cart-icon-add_active')
        productElem.querySelector('.product__cart-icon-remove')?.classList.add('product__cart-icon-remove_active')
    }
    //update products view
    const updatedCart = StorageService.getCart() as [string?];
    // console.log('Cart before cart icon update:', cart)
    updateCartIcon(updatedCart);
}