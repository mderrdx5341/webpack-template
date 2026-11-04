export interface FormElements {
    form: HTMLFormElement;
    emailInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    errorDisplay: HTMLDivElement;
}

/**
 * Инициализирует логику валидации и отправки формы
 */
export function initLoginForm(elements: FormElements, onSuccess: () => void): void {
    const { form, emailInput, passwordInput, errorDisplay } = elements;

    if (!form || !emailInput || !passwordInput || !errorDisplay) return;

    form.addEventListener('submit', (event: Event) => {
        // Обязательно отменяем стандартное поведение браузера (перезагрузку)
        event.preventDefault();
        
        // Очищаем прошлые ошибки
        errorDisplay.textContent = '';

        // Валидация Email
        if (!emailInput.value.includes('@')) {
            errorDisplay.textContent = 'Некорректный Email';
            return;
        }

        // Валидация Пароля
        if (passwordInput.value.length < 6) {
            errorDisplay.textContent = 'Пароль слишком короткий';
            return;
        }

        // Если всё успешно, вызываем колбэк успешной отправки
        onSuccess();
    });
}