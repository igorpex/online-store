export async function drawColorFilter(colors: Array<string>) {

    let colorContainer = document.querySelector('.filters__color')!;
    const fragment = document.createDocumentFragment();

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