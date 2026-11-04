import { EnemyConstructor } from './IEnemies';
import { Human } from './Human';
import { Org } from './Org';
import { Elf } from './Elf';

// Регистрируем соответствие текстового ключа и самого класса (чертежа)
export const EnemyRegistry: Record<string, EnemyConstructor> = {
    'Human': Human,
    'Org': Org,
    'Elf': Elf
    // Сюда будете просто дописывать новых врагов по мере создания файлов
};