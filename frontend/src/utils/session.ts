/**
 * Сохраняет токен авторизации и имя пользователя в хранилища браузера
 */
export function saveSession(token: string, username: string): void {
    if (!token || !username) return;

    // 1. Записываем токен в LocalStorage
    localStorage.setItem('auth_token', token);

    // 2. Записываем имя пользователя в Cookies (устанавливаем max-age на 1 день)
    document.cookie = `username=${encodeURIComponent(username)}; path=/; max-age=86400;`;
}

/**
 * Извлекает имя пользователя из строки Cookies
 */
export function getUsernameFromCookie(): string | null {
    const cookies = document.cookie.split('; ');
    const usernameCookie = cookies.find(row => row.startsWith('username='));
    
    if (!usernameCookie) return null;

    const value = usernameCookie.split('=')[1];
    return decodeURIComponent(value);
}

/**
 * Проверяет, авторизован ли пользователь (есть ли валидный токен)
 */
export function isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return token !== null && token.length > 0;
}

/**
 * Полностью очищает сессию
 */
export function clearSession(): void {
    localStorage.removeItem('auth_token');
    // Чтобы удалить cookie, перезаписываем её с истекшим сроком действия:
    document.cookie = 'username=; path=/; max-age=0;';
}