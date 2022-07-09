import { Product } from '../interfaces/api';

export function drawProducts(productList: Product[]) {
    const productsDiv = document.querySelector('.products') as HTMLElement;
    productsDiv.innerHTML = "";
    console.log('page is loaded');
    // console.log('event', e);
    let len = productList.length;
    const productItemTemp = document.querySelector('#productTemp') as HTMLTemplateElement;
    for (let i = 0; i < len; i++) {
        const productClone = productItemTemp.content.cloneNode(true) as HTMLElement;
        let product = productList[i];

        // (productClone.querySelector('.product__image') as HTMLElement).style.backgroundImage = `url(${product.image || 'img/product_placeholder.webp'
        //     })`;
        // (productClone.querySelector('.product__image') as HTMLImageElement).src = `${product.image || 'img/product_placeholder.webp'}`;
        (productClone.querySelector('.product__image') as HTMLImageElement).src = 'img/product_placeholder.webp';
        (productClone.querySelector('.product__image') as HTMLImageElement).alt = product.name;
        (productClone.querySelector('.product__name') as HTMLElement).textContent = product.name;
        (productClone.querySelector('.product__description') as HTMLElement).textContent = product.description;
        // productsDiv.insertAdjacentElement('beforeend', newProductDiv);
        productsDiv.append(productClone);
    }
}