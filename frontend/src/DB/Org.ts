import { IEnemies, EnemyConfig } from './IEnemies';

export class Org implements IEnemies {
    private name: string = "Org";
    private lvl: number;
    private damage: number;
    private health: number;

    private baseDamage = 12;
    private baseHealth = 30;

    public constructor(config?: EnemyConfig) {
        this.lvl = config?.lvl || 1;

        // Орки масштабируются сильнее людей
        this.damage = this.baseDamage + (this.lvl - 1) * 4;   // +4 урона за уровень
        this.health = this.baseHealth + (this.lvl - 1) * 15;  // +15 здоровья за уровень
    }

    public getName(): string { return this.name; }
    public getDamage(): number { return this.damage; }
    public getHealth(): number { return this.health; }
    public getLvl(): number { return this.lvl; }
}