/**
 * Преобразуем строку id дня недели в число
 * @param idDay - строка с id днем недели
 * @returns - восвращаем только число
 */
export function getNumberDay(idDay: string): number {
  const numberDay = Number(idDay.replace(/[^\d]/gi, ''));

  return numberDay;
}
