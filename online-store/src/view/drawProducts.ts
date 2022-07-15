import { StorageService } from '../core-functions/storage';
import { Product } from '../interfaces/api';

export function drawProducts(productList: Product[]) {
    const productsDiv = document.querySelector('.products') as HTMLElement;
    if (!productList || productList.length === 0) {
        productsDiv.innerText = "Извините, совпадений не обнаружено";
        return
    };
    let cart = StorageService.getCart();
    console.log('Cart:', cart)
    productsDiv.innerHTML = "";
    console.log('page is loaded');
    // console.log('event', e);
    let len = productList.length;
    const productItemTemp = document.querySelector('#productTempMaterial') as HTMLTemplateElement;
    for (let i = 0; i < len; i++) {
        const productClone = productItemTemp.content.cloneNode(true) as HTMLElement;
        let product = productList[i];
        // (productClone.querySelector('.my-card__media') as HTMLElement).style.backgroundImage = `url(${product.image || 'img/product_placeholder.webp'})`;
        (productClone.querySelector('.my-card__media') as HTMLElement).style.backgroundImage = `url(${'./img/' + product.image || './img/product_placeholder.webp'})`;
        // (productClone.querySelector('.product__image') as HTMLElement).style.backgroundImage = `url(${product.image || 'img/product_placeholder.webp'
        //     })`;
        // (productClone.querySelector('.product__image') as HTMLImageElement).src = `${product.image || 'img/product_placeholder.webp'}`;
        // (productClone.querySelector('.product__image') as HTMLImageElement).src = 'img/product_placeholder.webp';
        // (productClone.querySelector('.product__image') as HTMLImageElement).alt = product.name;
        (productClone.querySelector('.product__name') as HTMLElement).textContent += product.name;
        (productClone.querySelector('.product__price') as HTMLElement).textContent += `$ ${product.price / 100}`;
        (productClone.querySelector('.product__year') as HTMLElement).textContent += `${product.year}`;
        (productClone.querySelector('.product__count') as HTMLElement).textContent += `${product.count}`;
        if (product.popular) { (productClone.querySelector('.product__popular') as HTMLElement).textContent = `Популярный!` }
        // Add colors information
        let colors = product['colors'];
        colors.forEach((color) => {
            const colorDiv = document.createElement('div');
            colorDiv.style.backgroundColor = color;
            colorDiv.classList.add('product__color');
            (productClone.querySelector('.product__colors') as HTMLElement).append(colorDiv);
        });

        // Mark products added to Cart
        (productClone.querySelector('.product') as HTMLElement).dataset.id = product.id;
        if (cart.includes(product.id)) {
            (productClone.querySelector('.product') as HTMLElement).classList.add('product_active');
            (productClone.querySelector('.product__cart-icon-add') as HTMLElement).classList.remove('product__cart-icon-add_active');
            (productClone.querySelector('.product__cart-icon-remove') as HTMLElement).classList.add('product__cart-icon-remove_active')
        }

        // (productClone.querySelector('.product__description') as HTMLElement).textContent = product.description;
        // productsDiv.insertAdjacentElement('beforeend', newProductDiv);
        productsDiv.append(productClone);
    }
}