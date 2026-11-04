import { IEnemies, EnemyConfig } from './IEnemies';
import { EnemyRegistry } from './index';

export class EnemiesDB {
    /**
     * Создает и возвращает нового врага по его типу с поддержкой динамических параметров
     * @param type Название типа врага ('Human', 'Org')
     * @param config Необязательные параметры (например, { lvl: 5 })
     */
    public static create(type: string, config?: EnemyConfig): IEnemies {
        const EnemyClass = EnemyRegistry[type];

        if (!EnemyClass) {
            throw new Error(`Враг с типом "${type}" не найден в базе данных EnemiesDB.`);
        }

        // Передаем параметры конфигурации в конструктор класса
        return new EnemyClass(config);
    }

    public static getRegisteredTypes(): string[] {
        // Извлекаем все ключи ('Human', 'Org', 'Elf') из объекта-реестра
        return Object.keys(EnemyRegistry);
    }
}