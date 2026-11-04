import { Player } from './Player';

export class GameLoop {
    private lastTime: number = 0;
    private isRunning: boolean = false;
    private requestId: number | null = null;
    
    private player: Player;
    private hpRegenAccumulator: number = 0; // Накопитель миллисекунд

    public constructor(player: Player) {
        this.player = player;
    }

    public start(): void {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.requestId = requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    public stop(): void {
        this.isRunning = false;
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }

    private loop(timestamp: number): void {
        if (!this.isRunning) return;

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);

        this.requestId = requestAnimationFrame((nextTimestamp) => this.loop(nextTimestamp));
    }

    /**
     * Метод обновления времени
     */
    public update(deltaTime: number): void {
        if (deltaTime <= 0) return;

        this.hpRegenAccumulator += deltaTime;
        
        // Если накопилась 1 секунда (1000 мс)
        if (this.hpRegenAccumulator >= 1000) {
            const currentHp = this.player.getHp();
            const maxHp = this.player.getMaxHp();
            
            // Регенерируем здоровье только если игрок ранен, но ещё жив
            if (currentHp > 0 && currentHp < maxHp) {
                this.player.changeHp(-1); // Лечим на 1 единицу (- урон = хилинг)
            }
            
            this.hpRegenAccumulator -= 1000;
        }
    }

    public getIsRunning(): boolean {
        return this.isRunning;
    }
}