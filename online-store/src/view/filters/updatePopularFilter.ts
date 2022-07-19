export function updatePopularFilter(popular: [boolean]) {
    const popularInput = document.querySelector('.filters__popular-input') as HTMLInputElement;
    popularInput.checked = popular[0];
    // const shippingInput = document.querySelector('.filters__shipping-input');
}