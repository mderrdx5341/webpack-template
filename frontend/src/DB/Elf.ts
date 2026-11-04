import { IEnemies, EnemyConfig } from './IEnemies';

export class Elf implements IEnemies {
    private name: string = "Elf";
    private lvl: number;
    private damage: number;
    private health: number;

    public constructor(config?: EnemyConfig) {
        this.lvl = config?.lvl || 1;
        this.damage = 8 + (this.lvl - 1) * 3;
        this.health = 15 + (this.lvl - 1) * 7;
    }

    public getName(): string { return this.name; }
    public getDamage(): number { return this.damage; }
    public getHealth(): number { return this.health; }
    public getLvl(): number { return this.lvl; }
}