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
        // Делаем асинхронный запрос к гипотетическому API
        const response = await fetch(`https://example.com{userId}`);
        
        // Если сервер ответил ошибкой (например, 404 или 500)
        if (!response.ok) {
            displayElement.textContent = 'Ошибка загрузки профиля';
            return;
        }

        const data: UserData = await response.json();
        displayElement.textContent = `Привет, ${data.name}!`;
    } catch (error) {
        // Перехватываем сетевые ошибки (например, если пропал интернет)
        displayElement.textContent = 'Сетевая ошибка';
    }
}