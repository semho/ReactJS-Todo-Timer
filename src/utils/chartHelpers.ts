type TBar = {
  [id: string]: number;
};

/**
 * Преобразуем отношение секунд потраченых на работу к принятому числу за максимальное значение в процентах
 * @param max - число, выражающее максимальное значение, как 100%
 * @param value - число в секундах потраченных на задачи
 * @returns - возвращаем в процентах
 */
export function getPercentages(max: number, value: number): number {
  if (value === undefined) {
    return 1;
  }

  if (max === 0) return 1;
  const ratio = Math.round((value / max) * 100);

  if (ratio > 100) return 100;
  if (ratio < 1) return 1;

  return ratio;
}

/**
 * функция получает объект, перебирает его свойства и возвращает максимальное число свойства
 * @param obj - объект с свойствами
 * @returns - возвращает максимальное число  значения свойства объектов
 */
export function getMaxValueObj(obj: TBar): number {
  let max = -Infinity;

  for (const x in obj) {
    if (obj[x] > max) max = obj[x];
  }

  if (max < 0) return 0;

  return max;
}

/**
 * Функция преобразовывает число в минутах в строку в формате "ХХ час ХХ мин"
 * @param min - принимает число минут всего
 * @returns - возвращает строку вида (часы минуты)
 */
export function getTimeFromMinutes(min: number): string {
  const hours = Math.trunc(min / 60 / 60);
  const minutes = Math.trunc(min / 60) % 60;
  if (hours === 0) {
    return minutes + ' мин';
  }
  return hours + ' ч ' + minutes + ' м';
}
