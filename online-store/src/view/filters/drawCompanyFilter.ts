export function drawCompanyFilter(companies: Array<string>) {
    const companiesContainer = document.querySelector('.filters__company') as HTMLElement;
    const companyItemTemp = document.querySelector('#companyTemp') as HTMLTemplateElement;
    const fragment = document.createDocumentFragment();
    // { //draw first All option
    //     const companyClone1 = companyItemTemp.content.cloneNode(true) as HTMLInputElement;

    //     const input1 = companyClone1.querySelector('.filters__company-input') as HTMLInputElement;
    //     input1.name = 'all';
    //     input1.id = 'filters__company-input-all';
    //     input1.dataset.company = 'all';
    //     input1.classList.add('filters__company-input-all');
    //     const label1 = companyClone1.querySelector('.filters__company-label') as HTMLLabelElement;
    //     label1.setAttribute('for', 'filters__company-input-all');
    //     label1.textContent = 'All';
    //     companiesContainer!.append(companyClone1);
    // }

    // const filteredCompanies = JSON.parse(localStorage.getItem('filter')!).companies;

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
        // fragment.append(companyClone);
    })
    // companiesContainer.append(fragment);
}

