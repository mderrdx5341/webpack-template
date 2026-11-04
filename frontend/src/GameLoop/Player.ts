export class Player {
    private name: string;
    private hp: number;
    private maxHp: number;

    public constructor(name: string, maxHp: number = 100) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp; // При создании здоровье полное
    }

    // Геттеры для получения информации
    public getName(): string { return this.name; }
    public getHp(): number { return this.hp; }
    public getMaxHp(): number { return this.maxHp; }

    /**
     * Метод для изменения здоровья (урон передается со знаком +, лечение со знаком -)
     */
    public changeHp(amount: number): void {
        // Здоровье не может стать меньше 0 и больше maxHp
        this.hp = Math.max(0, Math.min(this.maxHp, this.hp - amount));
    }
}