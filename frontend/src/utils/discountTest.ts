import { expect } from 'chai';
// Импортируем функцию и интерфейс из нашего реального модуля по относительному пути
import { calculateTotal, Item } from './discount';

describe('Тестирование модуля discount.ts', () => {
    
    it('должен правильно считать сумму корзины без скидки', () => {
        const cart: Item[] = [
            { name: 'Клавиатура', price: 3000, quantity: 1 },
            { name: 'Мышь', price: 1500, quantity: 2 }
        ];

        const result = calculateTotal(cart, 0);
        
        // Ожидаем: 3000*1 + 1500*2 = 6000
        expect(result).to.equal(6000);
    });

    it('должен правильно применять скидку 10%', () => {
        const cart: Item[] = [
            { name: 'Наушники', price: 5000, quantity: 1 }
        ];

        const result = calculateTotal(cart, 10);
        
        // Ожидаем: 5000 - 10% = 4500
        expect(result).to.equal(4500);
    });

    it('должен выбрасывать ошибку, если передан некорректный процент скидки', () => {
        const cart: Item[] = [{ name: 'Тест', price: 100, quantity: 1 }];

        // 1. Проверяем отрицательную скидку (меньше 0)
        expect(() => {
            calculateTotal(cart, -5);
        }).to.throw('Процент скидки должен быть в диапазоне от 0 до 100');

        // 2. Проверяем избыточную скидку (больше 100) — добавляем эту строчку
        expect(() => {
            calculateTotal(cart, 105);
        }).to.throw('Процент скидки должен быть в диапазоне от 0 до 100');
    });

    it('должен использовать скидку 0% по умолчанию, если параметр не передан', () => {
        const cart: Item[] = [
            { name: 'Мышь', price: 1000, quantity: 1 }
        ];

        // Вызываем функцию ТОЛЬКО с корзиной, убирая второй аргумент:
        const result = calculateTotal(cart);
        
        // Ожидаем, что применится 0% и сумма останется 1000:
        expect(result).to.equal(1000);
    });
});