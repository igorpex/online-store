export function updateColorFilter(filteredColors: string[] = []) {
    document.querySelectorAll('.filters__colors-button').forEach(element => {
        // filters__colors-button_active
        const elementColor = (element as HTMLButtonElement).dataset.color
        if (filteredColors.includes(elementColor!)) {
            element.classList.add('filters__colors-button_active');
        } else {
            element.classList.remove('filters__colors-button_active')
        }
    })
}