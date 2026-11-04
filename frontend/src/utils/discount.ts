// Описываем интерфейс данных товара
export interface Item {
    name: string;
    price: number;
    quantity: number;
}

/**
 * Вычисляет итоговую сумму корзины с учетом скидки
 * @param items Список товаров (массив)
 * @param discountPercent Процент скидки (от 0 до 100)
 */
export function calculateTotal(items: Item[], discountPercent: number = 0): number {
    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error('Процент скидки должен быть в диапазоне от 0 до 100');
    }

    // Метод .reduce теперь сработает корректно, так как items — это массив
    const rawTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = rawTotal * (discountPercent / 100);
    
    return rawTotal - discountAmount;
}