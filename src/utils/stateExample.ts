import { Year, RichText, Diary, Month, FileData } from "../types"
import { getDaysCount } from "./utils"

const year2020 = new Year(
    2020,
    '有成就的一年',
    ['高兴', '恋爱', '升职'],
    new RichText('今年我爱上了一个可爱的女孩，我很幸福。'),
    [
        new Month(
            1,
            '放假之月',
            ['放假', '春节', '开心'],
            new RichText('这个月考完试了，放寒假，很开心！'),
            [
                new Diary(
                    1,
                    '元旦放假',
                    ['迪士尼'],
                    new RichText('今天元旦放假，去了迪士尼！很开心！')
                ), new Diary(
                    2,
                    '元旦放假第二天',
                    ['迪士尼'],
                    new RichText('今天元旦放假，去了迪士尼！很开心！')
                )
            ]
        )
    ]
)

const year2021 = new Year(
    2021,
    '有成就的一年',
    ['高兴', '恋爱', '升职'],
    new RichText('今年我爱上了一个可爱的女孩，我很幸福。'),
    []
)

const fileDataParser = (fileData: FileData) => {
    const years = fileData.years.map(year => {
        const months = new Array(12).fill({}).map((_, monthIndex) => {
            const month = year.months.filter(m => m.index - 1 === monthIndex).shift()
                || new Month(monthIndex + 1)
            const diarys = new Array(getDaysCount(year.index, month.index))
                .fill({})
                .map((_, diaryIndex) => (
                    month.diarys.filter(d => d.index - 1 === diaryIndex).shift() || new Diary(diaryIndex + 1)
                ))
            return {
                ...month,
                diarys
            }
        })
        return {
            ...year,
            months
        }
    })
    return {
        ...fileData,
        years
    }
}

const getStateExample = () => {
    return fileDataParser(new FileData(
        '0.0.1',
        Date.now().toString(),
        [
            year2020,
            year2021
        ]
    ))
}

export { year2020, year2021, getStateExample }