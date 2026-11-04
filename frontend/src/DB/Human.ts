import { IEnemies, EnemyConfig } from './IEnemies';

export class Human implements IEnemies {
    private name: string = "Human";
    private lvl: number;
    private damage: number;
    private health: number;

    // Базовые характеристики 1-го уровня
    private baseDamage = 5;
    private baseHealth = 10;

    public constructor(config?: EnemyConfig) {
        this.lvl = config?.lvl || 1; // Если уровень не передан, ставим 1

        // Формула масштабирования характеристик от уровня
        this.damage = this.baseDamage + (this.lvl - 1) * 2;   // +2 урона за уровень
        this.health = this.baseHealth + (this.lvl - 1) * 5;   // +5 здоровья за уровень
    }

    public getName(): string { return this.name; }
    public getDamage(): number { return this.damage; }
    public getHealth(): number { return this.health; }
    public getLvl(): number { return this.lvl; }
}