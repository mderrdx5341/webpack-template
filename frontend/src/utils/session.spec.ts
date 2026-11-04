import { expect } from 'chai';
import { saveSession, getUsernameFromCookie, isAuthenticated, clearSession } from './session';

describe('Тестирование работы с LocalStorage и Cookies (session.ts)', () => {
    
    beforeEach(() => {
        // Перед каждым тестом убеждаемся, что окружение чистое
        localStorage.clear();
        document.cookie = 'username=; path=/; max-age=0;';
    });

    afterEach(() => {
        // Очищаем хранилища после каждого теста, чтобы не загрязнять другие файлы
        localStorage.clear();
        document.cookie = 'username=; path=/; max-age=0;';
    });

    it('должен корректно завершать работу (guard clause), если переданы пустые данные', () => {
        saveSession('', '');
        expect(isAuthenticated()).to.be.false;
        expect(getUsernameFromCookie()).to.be.null;
    });

    it('должен успешно сохранять токен в localStorage и имя в cookie', () => {
        saveSession('jwt_token_xyz_123', 'mderrdx');

        // 1. Проверяем, что в localStorage появились данные
        expect(localStorage.getItem('auth_token')).to.equal('jwt_token_xyz_123');

        // 2. Проверяем работу флага авторизации
        expect(isAuthenticated()).to.be.true;

        // 3. Проверяем парсинг куки через наш метод
        expect(getUsernameFromCookie()).to.equal('mderrdx');
    });

    it('должен корректно обрабатывать кириллицу и спецсимволы в имени пользователя (encode/decode)', () => {
        saveSession('token', 'Иван Петров @2026');

        // Убеждаемся, что куки закодировались и успешно прочитались обратно
        expect(getUsernameFromCookie()).to.equal('Иван Петров @2026');
    });

    it('должен возвращать false для isAuthenticated, если токен пустой', () => {
        // Симулируем ситуацию, когда ключ есть, но его значение стёрто до пустой строки
        localStorage.setItem('auth_token', '');
        expect(isAuthenticated()).to.be.false;
    });

    it('должен полностью удалять данные из всех хранилищ при вызове clearSession', () => {
        saveSession('test_token', 'user_test');
        
        // Вызываем очистку
        clearSession();

        // Проверяем, что всё удалено
        expect(localStorage.getItem('auth_token')).to.be.null;
        expect(isAuthenticated()).to.be.false;
        expect(getUsernameFromCookie()).to.be.null;
    });
});