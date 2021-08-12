/**
 * 根据年份和月份获取该月日数。
 * @param yearIndex 年份
 * @param monthIndex 月份
 * @returns 该月日数，入参取值不合法则返回 `undefined`
 */
export const getDaysCount = (yearIndex: number, monthIndex: number) => {
    const days = [undefined, 31, 28, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31]
    if (yearIndex % 4 === 0 && yearIndex % 100 !== 0 || yearIndex % 400 === 0) {
        days[2] = 29
    }
    return days[monthIndex]
}