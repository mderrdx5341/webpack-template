import { expect } from 'chai';
import { initLoginForm, FormElements } from './form';

describe('Тестирование пользовательских событий и форм (form.ts)', () => {
    let elements: FormElements;
    let successCalled: boolean;

    const onSuccessMock = () => {
        successCalled = true;
    };

    beforeEach(() => {
        successCalled = false;

        document.body.innerHTML = `
            <form id="login-form">
                <input id="email" type="text" />
                <input id="password" type="password" />
                <div id="error-message"></div>
                <button type="submit">Войти</button>
            </form>
        `;

        elements = {
            form: document.getElementById('login-form') as HTMLFormElement,
            emailInput: document.getElementById('email') as HTMLInputElement,
            passwordInput: document.getElementById('password') as HTMLInputElement,
            errorDisplay: document.getElementById('error-message') as HTMLDivElement,
        };
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('должен корректно завершать работу, если переданы не все элементы', () => {
        expect(() => {
            initLoginForm({} as any, onSuccessMock);
        }).not.to.throw();
    });

    it('должен выводить ошибку, если в Email отсутствует символ @', () => {
        initLoginForm(elements, onSuccessMock);

        elements.emailInput.value = 'wrong-email.com';
        elements.passwordInput.value = '123456';

        // Создаем событие через нативный фабричный метод JSDOM document.createEvent
        const submitEvent = document.createEvent('Event');
        submitEvent.initEvent('submit', true, true); // имя, bubbles, cancelable
        elements.form.dispatchEvent(submitEvent);

        expect(elements.errorDisplay.textContent).to.equal('Некорректный Email');
        expect(successCalled).to.be.false;
        expect(submitEvent.defaultPrevented).to.be.true;
    });

    it('должен выводить ошибку, если пароль короче 6 символов', () => {
        initLoginForm(elements, onSuccessMock);

        elements.emailInput.value = 'test@example.com';
        elements.passwordInput.value = '123';

        const submitEvent = document.createEvent('Event');
        submitEvent.initEvent('submit', true, true);
        elements.form.dispatchEvent(submitEvent);

        expect(elements.errorDisplay.textContent).to.equal('Пароль слишком короткий');
        expect(successCalled).to.be.false;
    });

    it('должен успешно вызывать колбэк onSuccess при валидных данных', () => {
        initLoginForm(elements, onSuccessMock);

        elements.emailInput.value = 'admin@website.ru';
        elements.passwordInput.value = 'secure_password_123';

        const submitEvent = document.createEvent('Event');
        submitEvent.initEvent('submit', true, true);
        elements.form.dispatchEvent(submitEvent);

        expect(elements.errorDisplay.textContent).to.equal('');
        expect(successCalled).to.be.true;
    });
});