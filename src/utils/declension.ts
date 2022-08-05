/**
 * функция склоняет слова в зависимости от числа
 * @param number - число по которому склоняем
 * @param titles - массив склоняемых(3 слова)
 * @returns - возвращаем просклоняемую строку
 */
export function getDeclensionWordFromNumber(
  number: number,
  titles: [string, string, string]
) {
  const decCache: [number] | [] = [];

  function decOfNum(number: number, titles: [string, string, string]) {
    const decCases = [2, 0, 1, 1, 1, 2];

    if (!decCache[number])
      decCache[number] =
        number % 100 > 4 && number % 100 < 20
          ? 2
          : decCases[Math.min(number % 10, 5)];
    return titles[decCache[number]];
  }

  return decOfNum(number, titles);
}
