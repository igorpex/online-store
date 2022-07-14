export function updateCompanyFilter(filteredCompanies: string[] = []) {
    const companiesCheckboxes = document.querySelectorAll('.filters__company-input');
    if (!filteredCompanies) filteredCompanies = [];
    companiesCheckboxes.forEach((element) => {
        const company = (element as HTMLInputElement).dataset.company;
        if (filteredCompanies.includes(company!)) {
            (element as HTMLInputElement).checked = true
        } else {
            (element as HTMLInputElement).checked = false
        }
    })
}