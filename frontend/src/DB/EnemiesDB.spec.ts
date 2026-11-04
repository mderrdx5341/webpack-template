import { expect } from 'chai';
import { EnemiesDB } from './EnemiesDB';

describe('Тестирование Фабрики Базы Данных Врагов с параметрами (EnemiesDB)', () => {

    it('должен создавать врага 1-го уровня по умолчанию, если параметры не переданы', () => {
        const human = EnemiesDB.create('Human');
        
        expect(human.getLvl()).to.equal(1);
        expect(human.getDamage()).to.equal(5);
        expect(human.getHealth()).to.equal(10);
    });

    it('должен успешно масштабировать характеристики Human для 5-го уровня', () => {
        // Вычисляем ожидаемый урон: 5 + (5 - 1) * 2 = 13
        // Ожидаемое здоровье: 10 + (5 - 1) * 5 = 30
        const strongHuman = EnemiesDB.create('Human', { lvl: 5 });

        expect(strongHuman.getLvl()).to.equal(5);
        expect(strongHuman.getDamage()).to.equal(13);
        expect(strongHuman.getHealth()).to.equal(30);
    });

    it('должен успешно масштабировать характеристики Org для 3-го уровня', () => {
        // Вычисляем урон Орка: 12 + (3 - 1) * 4 = 20
        // Здоровье Орка: 30 + (3 - 1) * 15 = 60
        const bossOrg = EnemiesDB.create('Org', { lvl: 3 });

        expect(bossOrg.getLvl()).to.equal(3);
        expect(bossOrg.getDamage()).to.equal(20);
        expect(bossOrg.getHealth()).to.equal(60);
    });

    it('должен выбрасывать исключение, если тип врага не зарегистрирован', () => {
        expect(() => {
            EnemiesDB.create('Golem', { lvl: 10 });
        }).to.throw('Враг с типом "Golem" не найден в базе данных EnemiesDB.');
    });

    it('должен возвращать полный список всех зарегистрированных типов врагов', () => {
        const types = EnemiesDB.getRegisteredTypes();

        // Проверяем, что вернулся массив строк
        expect(types).to.be.an('array');
        
        // Проверяем, что в массиве есть все наши враги
        expect(types).to.include('Human');
        expect(types).to.include('Org');
        expect(types).to.include('Elf');
        
        // Проверяем точное количество (если у вас 3 врага, длина должна быть 3)
        expect(types.length).to.equal(3);
    });
});