export function initCounter(buttonElement: HTMLButtonElement): void {
    if (!buttonElement) {
        return;
    }

    buttonElement.addEventListener('click', () => {
        // Считываем текущее значение, увеличиваем его на 1
        const currentCount = parseInt(buttonElement.textContent || '0', 10);
        const newCount = currentCount + 1;
        
        buttonElement.textContent = newCount.toString();

        // Если дошли до 10, блокируем кнопку
        if (newCount >= 10) {
            buttonElement.disabled = true;
        }
    });
}