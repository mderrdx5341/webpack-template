export interface UserData {
    id: number;
    name: string;
    email: string;
}

/**
 * Загружает профиль пользователя с сервера и отображает его в DOM
 * @param userId ID пользователя
 * @param displayElement Элемент для вывода имени
 */
export async function loadAndDisplayUser(userId: number, displayElement: HTMLElement): Promise<void> {
    if (!displayElement) return;

    try {
        const response = await fetch(`https://example.com{userId}`);
        
        if (!response.ok) {
            displayElement.textContent = 'Ошибка загрузки профиля';
            return;
        }

        const data: UserData = await response.json();
        displayElement.textContent = `Привет, ${data.name}!`;
    } catch (error) {
        // Добавляем логирование оригинальной ошибки в консоль
        console.error('Критический сбой API:', error);
        
        displayElement.textContent = 'Сетевая ошибка';
    }
}