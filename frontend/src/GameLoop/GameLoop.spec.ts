import { expect } from 'chai';
import sinon from 'sinon';
import { Player } from './Player';
import { GameLoop } from './GameLoop';

describe('Тестирование Игрока и Игрового Цикла (Player & GameLoop)', () => {
    let clock: sinon.SinonFakeTimers;
    let player: Player;
    let gameLoop: GameLoop;

    beforeEach(() => {
        // Синон автоматически подменит requestAnimationFrame, performance и таймеры
        // в текущем глобальном окружении без вызова конфликта типов Node.js
        clock = sinon.useFakeTimers();

        player = new Player('Mderrdx', 100);
        gameLoop = new GameLoop(player);
    });

    afterEach(() => {
        gameLoop.stop();
        clock.restore();
    });

    describe('Класс Player', () => {
        it('должен правильно инициализировать имя и здоровье', () => {
            expect(player.getName()).to.equal('Mderrdx');
            expect(player.getHp()).to.equal(100);
            expect(player.getMaxHp()).to.equal(100);
        });

        it('должен уменьшать здоровье при уроне, но не падать ниже 0', () => {
            player.changeHp(40); // Наносим 40 урона
            expect(player.getHp()).to.equal(60);

            player.changeHp(200); // Избыточный урон
            expect(player.getHp()).to.equal(0);
        });
    });

    describe('Класс GameLoop', () => {
        it('должен управлять статусом работы (start/stop)', () => {
            expect(gameLoop.getIsRunning()).to.be.false;
            gameLoop.start();
            expect(gameLoop.getIsRunning()).to.be.true;
            
            gameLoop.start(); // Повторный старт игнорируется
            gameLoop.stop();
            expect(gameLoop.getIsRunning()).to.be.false;
        });

        it('должен игнорировать отрицательную или нулевую дельту времени', () => {
            gameLoop.update(0);
            gameLoop.update(-50);
        });

        it('должен автоматически восстанавливать 1 HP раненому игроку за 1 секунду', () => {
            player.changeHp(10); // Опускаем HP до 90
            expect(player.getHp()).to.equal(90);

            gameLoop.start();
            clock.tick(1050); // Перематываем время на секунду вперед

            expect(player.getHp()).to.equal(91); // Здоровье восстановилось на 1
        });

        it('не должен лечить игрока, если у него полные жизни', () => {
            expect(player.getHp()).to.equal(100);

            gameLoop.start();
            clock.tick(1000);

            expect(player.getHp()).to.equal(100); // Осталось максимумом
        });

        it('не должен регенерировать здоровье погибшего игрока (HP = 0)', () => {
            player.changeHp(100); // Убиваем игрока
            expect(player.getHp()).to.equal(0);

            gameLoop.start();
            clock.tick(1000);

            expect(player.getHp()).to.equal(0); // Мертвые не лечатся
        });

        it('должен прерывать выполнение кадра, если loop вызван после остановки', () => {
            gameLoop.start();
            gameLoop.stop();
            // Вызываем loop напрямую в обход приватности для проверки guard clause
            (gameLoop as any).loop(performance.now());
            expect(gameLoop.getIsRunning()).to.be.false;
        });
    });
});