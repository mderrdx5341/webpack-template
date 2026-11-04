import { expect } from 'chai';
import { initCounter } from './counter';

describe('Тестирование DOM-взаимодействия с глобальным JSDOM', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
        // Так как document теперь глобальный благодаря test-setup.ts, 
        // мы можем напрямую наполнять body нужной разметкой перед каждым тестом
        document.body.innerHTML = '<button id="counter-btn">0</button>';
        
        button = document.getElementById('counter-btn') as HTMLButtonElement;
    });

    afterEach(() => {
        // Очищаем DOM-дерево после каждого теста, чтобы не загрязнять память
        document.body.innerHTML = '';
    });

    it('должен увеличивать текст кнопки на 1 при клике', () => {
        initCounter(button);
        
        // Имитируем реальный клик пользователя на кнопку
        button.click();
        
        expect(button.textContent).to.equal('1');
    });

    it('должен корректно увеличивать значение при множественных кликах', () => {
        initCounter(button);

        button.click();
        button.click();
        button.click();

        expect(button.textContent).to.equal('3');
        expect(button.disabled).to.be.false;
    });

    it('должен заблокировать кнопку (disabled = true), когда счетчик достигнет 10', () => {
        initCounter(button);

        // Симулируем 10 кликов подряд
        for (let i = 0; i < 10; i++) {
            button.click();
        }

        expect(button.textContent).to.equal('10');
        expect(button.disabled).to.be.true;
    });

    it('должен корректно завершать работу (guard clause), если передан null или undefined', () => {
        // Проверяем ветку TRUE (когда элемента нет — код делает return)
        expect(() => {
            initCounter(null as any);
            initCounter(undefined as any);
        }).not.to.throw();

        // Проверяем ветку FALSE (когда элемент ЕСТЬ — код проходит мимо return)
        expect(() => {
            initCounter(button);
        }).not.to.throw();
    });

    it('должен корректно обрабатывать кнопку без текста, принимая её значение за 0', () => {
        // Создаем кнопку, у которой внутри вообще нет текста
        document.body.innerHTML = '<button id="empty-btn"></button>';
        const emptyButton = document.getElementById('empty-btn') as HTMLButtonElement;

        initCounter(emptyButton);
        
        // Кликаем по пустой кнопке
        emptyButton.click();

        // Ожидаем, что сработает ветка || '0', значение увеличится на 1, и текст станет "1"
        expect(emptyButton.textContent).to.equal('1');
    });
});