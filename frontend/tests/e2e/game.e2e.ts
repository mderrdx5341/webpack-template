import { expect } from 'chai';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import path from 'path';

describe('E2E Тестирование Игрового Цикла в Браузере', function () {
    // Тяжелые тесты могут идти долго, увеличиваем таймаут Mocha до 15 секунд
    this.timeout(15000); 

    let driver: WebDriver;

    before(async () => {
        // Мы убираем .usingServer(), заставляя Selenium запустить Chrome локально.
        // Встроенный Selenium Manager сам посмотрит на ваш Chrome 156 и скачает нужный ChromeDriver.
        driver = await new Builder()
            .forBrowser('chrome')
            .build();
    });

    after(async () => {
        // Обязательно закрываем браузер после тестов
        if (driver) {
            await driver.quit();
        }
    });

    it('должен отобразить имя игрока и автоматически восстановить здоровье через 1 секунду', async () => {
        // Получаем абсолютный путь к нашему локальному index.html
        //const fileUrl = 'file://' + path.resolve('www/index.html');
        
        // Браузер открывает страницу
        //await driver.get(fileUrl);
        await driver.get('http://localhost:8080');

        // Ждем, пока элемент с именем появится на экране
        const nameEl = await driver.wait(until.elementLocated(By.id('player-name')), 3000);
        const nameText = await nameEl.getText();
        
        // 1. Проверяем, что имя игрока отрисовалось корректно
        expect(nameText).to.equal('Mderrdx');

        const hpEl = await driver.findElement(By.id('player-hp'));
        
        // 2. Проверяем, что стартовое здоровье равно 85 (после нанесенного в main.ts урона)
        let hpText = await hpEl.getText();
        expect(hpText).to.equal('85');

        // 3. Ждем 1200 миллисекунд (1.2 секунды) реального времени, пока идет игровой цикл
        await driver.sleep(1200);

        // 4. Проверяем, что здоровье успешно регенерировало до 86!
        hpText = await hpEl.getText();
        expect(hpText).to.equal('86');
    });
});