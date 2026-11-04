export interface EnemyConfig {
    lvl?: number;
    [key: string]: any; // Возможность передавать любые другие кастомные параметры
}

export interface IEnemies {
    getName(): string;
    getDamage(): number;
    getHealth(): number;
    getLvl(): number; // Добавим геттер уровня
}

// Тип для конструктора класса, Теперь конструктор знает, что может принимать необязательный конфиг
export type EnemyConstructor = new (config?: EnemyConfig) => IEnemies;