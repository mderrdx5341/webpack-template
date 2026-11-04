import { expect } from 'chai';
import sinon from 'sinon';
import { loadAndDisplayUser } from './userProfile';

describe('Тестирование асинхронного кода через Sinon Sandbox (userProfile.ts)', () => {
    let displayElement: HTMLDivElement;
    let sandbox: sinon.SinonSandbox;
    let consoleErrorSpy: sinon.SinonSpy;

    beforeEach(() => {
        document.body.innerHTML = '<div id="user-name"></div>';
        displayElement = document.getElementById('user-name') as HTMLDivElement;
        
        sandbox = sinon.createSandbox();

        // Вешаем шпиона на встроенный метод console.error
        // Теперь Sinon записывает каждый вызов этой функции в память
        consoleErrorSpy = sandbox.stub(console, 'error');
    });

    afterEach(() => {
        document.body.innerHTML = '';
        sandbox.restore();
    });

    it('должен корректно завершать работу, если не передан displayElement', async () => {
        await loadAndDisplayUser(1, null as any);
    });

    it('должен успешно загрузить пользователя и отобразить его имя в DOM', async () => {
        const mockUser = { id: 42, name: 'Иван Иванов', email: 'ivan@test.ru' };

        sandbox.stub(global, 'fetch').resolves({
            ok: true,
            status: 200,
            json: async () => mockUser
        } as Response);

        await loadAndDisplayUser(42, displayElement);

        expect(displayElement.textContent).to.equal('Привет, Иван Иванов!');
        // Убеждаемся, что при успешном сценарии в логи ничего не писалось
        expect(consoleErrorSpy.called).to.be.false;
    });

    it('должен выводить ошибку, если сервер ответил статусом 404 или 500', async () => {
        sandbox.stub(global, 'fetch').resolves({
            ok: false,
            status: 404
        } as Response);

        await loadAndDisplayUser(999, displayElement);

        expect(displayElement.textContent).to.equal('Ошибка загрузки профиля');
        expect(consoleErrorSpy.called).to.be.false;
    });

    it('должен выводить ошибку "Сетевая ошибка" и логировать сбой, если fetch упал', async () => {
        const networkError = new TypeError('Failed to fetch');
        sandbox.stub(global, 'fetch').rejects(networkError);

        await loadAndDisplayUser(1, displayElement);

        expect(displayElement.textContent).to.equal('Сетевая ошибка');

        // ПРОВЕРКА ЛОГИРОВАНИЯ:
        // 1. Убеждаемся, что console.error вызвался ровно 1 раз
        expect(consoleErrorSpy.calledOnce).to.be.true;

        // 2. Убеждаемся, что метод вызвался с конкретными аргументами
        expect(consoleErrorSpy.calledWith('Критический сбой API:', networkError)).to.be.true;
    });
});