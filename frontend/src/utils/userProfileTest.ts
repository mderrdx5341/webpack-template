import { expect } from 'chai';
import sinon from 'sinon';
import { loadAndDisplayUser } from './userProfile';

describe('Тестирование асинхронного кода через Sinon Sandbox (userProfile.ts)', () => {
    let displayElement: HTMLDivElement;
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        // Подготавливаем DOM-окружение
        document.body.innerHTML = '<div id="user-name"></div>';
        displayElement = document.getElementById('user-name') as HTMLDivElement;
        
        // 1. Создаем изолированную песочницу перед каждым тестом
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        // 2. Одной командой сбрасываем все заглушки и восстанавливаем глобальный fetch
        sandbox.restore();
    });

    it('должен корректно завершать работу, если не передан displayElement', async () => {
        await loadAndDisplayUser(1, null as any);
    });

    it('должен успешно загрузить пользователя и отобразить его имя в DOM', async () => {
        const mockUser = { id: 42, name: 'Иван Иванов', email: 'ivan@test.ru' };

        // Красивый стаб: перехватываем global.fetch и заставляем его вернуть успешный Promise с ответом
        sandbox.stub(global, 'fetch').resolves({
            ok: true,
            status: 200,
            json: async () => mockUser
        } as Response);

        await loadAndDisplayUser(42, displayElement);

        expect(displayElement.textContent).to.equal('Привет, Иван Иванов!');
    });

    it('должен выводить ошибку, если сервер ответил статусом 404 или 500', async () => {
        // Заставляем fetch вернуть статус ошибки сервера
        sandbox.stub(global, 'fetch').resolves({
            ok: false,
            status: 404
        } as Response);

        await loadAndDisplayUser(999, displayElement);

        expect(displayElement.textContent).to.equal('Ошибка загрузки профиля');
    });

    it('должен выводить ошибку "Сетевая ошибка", если fetch выбросил исключение', async () => {
        // Метод .rejects() имитирует жесткое падение промиса (отсутствие интернета)
        sandbox.stub(global, 'fetch').rejects(new TypeError('Failed to fetch'));

        await loadAndDisplayUser(1, displayElement);

        expect(displayElement.textContent).to.equal('Сетевая ошибка');
    });
});