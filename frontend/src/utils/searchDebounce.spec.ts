import { expect } from 'chai';
import sinon from 'sinon';
import { debounce } from './searchDebounce';

describe('Тестирование задержек времени и Debounce (Fake Timers)', () => {
    let clock: sinon.SinonFakeTimers;
    let callbackCalledCount: number;
    
    const mockCallback = () => {
        callbackCalledCount++;
    };

    beforeEach(() => {
        callbackCalledCount = 0;
        // 1. Включаем виртуальное время перед каждым тестом
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        // 2. Обязательно возвращаем реальное системное время назад после каждого теста
        clock.restore();
    });

    it('не должен вызывать функцию мгновенно', () => {
        const debouncedFn = debounce(mockCallback, 1000);

        debouncedFn();

        // Время стоит на месте, функция еще не должна быть вызвана
        expect(callbackCalledCount).to.equal(0);
    });

    it('должен вызвать функцию ровно один раз после истечения времени задержки', () => {
        const debouncedFn = debounce(mockCallback, 1000);

        debouncedFn();

        // Перематываем виртуальное время вперед на 1000 миллисекунд (1 секунду)
        clock.tick(1000);

        // Время прошло — колбэк сработал
        expect(callbackCalledCount).to.equal(1);
    });

    it('должен сбрасывать прошлый таймер при множественных быстрых вызовах (суть debounce)', () => {
        const debouncedFn = debounce(mockCallback, 1000);

        // Имитируем быстрый ввод пользователя (3 клика/нажатия подряд)
        debouncedFn(); // 0ms
        clock.tick(500);  // Прошло 500ms
        debouncedFn(); // Таймер сбросился и пошел заново с 500ms
        clock.tick(500);  // Прошло еще 500ms (суммарно 1000ms от старта, но только 500ms от 2-го вызова)
        debouncedFn(); // Таймер снова сбросился!
        
        clock.tick(999);  // Дошли до 1999ms от старта — вызова всё ещё быть не должно
        expect(callbackCalledCount).to.equal(0);

        clock.tick(1); // Перешагиваем барьер последнего таймера (+1ms, прошло ровно 1000ms от последнего клика)
        expect(callbackCalledCount).to.equal(1); // Вызвался строго 1 раз!
    });
});