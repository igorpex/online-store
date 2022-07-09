import noUiSlider from '../nouislider/nouislider';

async function drawColorFilter(colors: Set<string>) {

    let colorContainer = document.querySelector('.filters__color');

    const allColorsButton = document.createElement('button');
    allColorsButton.id = 'filter__colors-button-all';
    allColorsButton.dataset.color = 'all';
    allColorsButton.classList.add('filters__colors-button-all');
    allColorsButton.type = 'button';
    allColorsButton.innerText = 'All';
    colorContainer!.append(allColorsButton);

    colors.forEach((color) => {
        const colorButton = document.createElement('button');
        colorButton.id = color;
        colorButton.dataset.color = color;
        colorButton.classList.add('filters__colors-button');
        colorButton.type = 'button';
        colorButton.style.backgroundColor = color;
        colorContainer!.append(colorButton);
    })
}

function drawPriceFilter(minPrice: number, maxPrice: number) {
    // slider
    const slider = document.getElementById('filters__price-range') as HTMLElement;
    let step = maxPrice / 100 > 1 ? Math.trunc(maxPrice / 200) : 1;
    noUiSlider.create(slider, {
        start: [0, maxPrice],
        connect: true,
        step: step,
        range: {
            'min': minPrice,
            'max': maxPrice
        },
        tooltips: [
            true,
            true
        ],
    }
    );
}

function drawCategoriesFilter(categories: Set<string>) {
    let categoriesContainer = document.querySelector('.filters__category') as HTMLElement;
    const categoryItemTemp = document.querySelector('#categoryTemp') as HTMLTemplateElement;

    //draw first All companies
    const categoryClone1 = categoryItemTemp.content.cloneNode(true) as HTMLInputElement;
    const input1 = categoryClone1.querySelector('.filters__category-input') as HTMLInputElement;
    input1.name = 'all';
    input1.id = 'filters__category-input-all';
    input1.dataset.category = 'all';
    input1.classList.add('filters__category-input-all');
    const label1 = categoryClone1.querySelector('.filters__category-label') as HTMLLabelElement;
    label1.setAttribute('for', 'filters__category-input-all');
    label1.textContent = 'All';
    categoriesContainer!.append(categoryClone1);

    categories.forEach((category) => {
        const categoryClone = categoryItemTemp.content.cloneNode(true) as HTMLInputElement;
        const input = categoryClone.querySelector('.filters__category-input') as HTMLInputElement;
        input.name = category;
        input.id = category;
        input.dataset.category = category;
        const label = categoryClone.querySelector('.filters__category-label') as HTMLLabelElement;
        label.setAttribute('for', category);
        label.textContent = category;
        categoriesContainer.append(categoryClone);
    })
}

function drawCompanyFilter(companies: Set<string>) {
    const companiesContainer = document.querySelector('.filters__company') as HTMLElement;
    const companyItemTemp = document.querySelector('#companyTemp') as HTMLTemplateElement;

    //draw first All option
    const companyClone1 = companyItemTemp.content.cloneNode(true) as HTMLInputElement;

    const input1 = companyClone1.querySelector('.filters__company-input') as HTMLInputElement;
    input1.name = 'all';
    input1.id = 'filters__company-input-all';
    input1.dataset.company = 'all';
    input1.classList.add('filters__company-input-all');
    const label1 = companyClone1.querySelector('.filters__company-label') as HTMLLabelElement;
    label1.setAttribute('for', 'filters__company-input-all');
    label1.textContent = 'All';
    companiesContainer!.append(companyClone1);

    companies.forEach((company) => {
        const companyClone = companyItemTemp.content.cloneNode(true) as HTMLInputElement;
        // console.log('companyClone:', companyClone);
        const input = companyClone.querySelector('.filters__company-input') as HTMLInputElement;
        input.name = company;
        input.id = company;
        input.dataset.company = company;
        const label = companyClone.querySelector('.filters__company-label') as HTMLLabelElement;
        label.setAttribute('for', company);
        label.textContent = company;
        companiesContainer.append(companyClone);
    })
}

export {
    drawColorFilter, drawPriceFilter, drawCategoriesFilter, drawCompanyFilter
}