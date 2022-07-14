export function updateCartIcon(cart: [string?]) {
    let cartIcon = document.querySelector('.cart-icon');
    let cartIconCheckout = document.querySelector('.cart-icon-checkout');
    let cartCounter = document.querySelector('.cart-counter') as HTMLElement;
    if (!cart || cart.length === 0) {
        cartIcon?.classList.add('cart-icon_active');
        cartIconCheckout?.classList.remove('cart-icon_checkout_active')
        cartCounter.textContent = '';
    } else {
        cartIcon?.classList.remove('cart-icon_active');
        cartIconCheckout?.classList.add('cart-icon_checkout_active')
        cartCounter.textContent = cart.length.toString();
    }
}