export function updateShippingFilter(popular: boolean[]) {
    const shippingInput = document.querySelector('.filters__shipping-input') as HTMLInputElement;
    shippingInput.checked = popular[0];
}