/**
 * Создает дебаунс-обертку для функции
 * @param callback Функция, которую нужно вызвать с задержкой
 * @param delay Время задержки в миллисекундах
 */
export function debounce(callback: (...args: any[]) => void, delay: number): (...args: any[]) => void {
    let timeoutId: any = null;

    return function (...args: any[]) {
        // Если пользователь снова нажал клавишу/кликнул — сбрасываем прошлый таймер
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Запускаем новый таймер заново
        timeoutId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}