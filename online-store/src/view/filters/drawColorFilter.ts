export async function drawColorFilter(colors: Array<string>) {

    let colorContainer = document.querySelector('.filters__color')!;
    const fragment = document.createDocumentFragment();
    // const allColorsButton = document.createElement('button');
    // allColorsButton.id = 'filter__colors-button-all';
    // allColorsButton.dataset.color = 'all';
    // allColorsButton.classList.add('filters__colors-button-all');
    // allColorsButton.type = 'button';
    // allColorsButton.innerText = 'All';
    // colorContainer!.append(allColorsButton);

    console.log('colors to draw:', colors);
    colors.forEach((color) => {
        const colorButton = document.createElement('button');
        colorButton.id = color;
        colorButton.dataset.color = color;
        colorButton.classList.add('filters__colors-button');
        colorButton.type = 'button';
        colorButton.style.backgroundColor = color;
        fragment.append(colorButton);
    })
    colorContainer.append(fragment);
}