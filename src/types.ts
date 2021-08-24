import { getDaysCount } from "./utils/utils"

class RichText {
    data

    constructor(data = '') {
        this.data = data
    }
}

class Diary {
    index
    title
    tags
    content

    constructor(
        index: number,
        title: string = '',
        tags: string[] = [],
        content: RichText = new RichText('')
    ) {
        this.index = index
        this.title = title
        this.tags = tags
        this.content = content
    }
}

class Month {
    index
    title
    tags
    summary
    diarys
    yearIndex

    constructor(
        yearIndex: number,
        index: number,
        title: string = '',
        tags: string[] = [],
        summary: RichText = new RichText(''),
        diarys: Diary[] = []
    ) {
        this.yearIndex = yearIndex
        this.index = index
        this.title = title
        this.tags = tags
        this.summary = summary
        this.diarys = diarys
    }
    // getDiary(index: number) {
    //     return this.diarys.filter(diary => diary.index === index).shift()
    // }
}

class Year {
    index
    title
    tags
    summary
    months

    constructor(
        index: number,
        title: string = '',
        tags: string[] = [],
        summary: RichText = new RichText(''),
        months: Month[] = []
    ) {
        this.index = index
        this.title = title
        this.tags = tags
        this.summary = summary
        this.months = months
    }
    // getMonth(index: number) {
    //     return this.months.filter(month => month.index === index).shift()
    // }
}

class FileData {
    formatVersion
    savedTime
    years

    constructor(
        formatVersion: string,
        savedTime: string,
        years: Year[]
    ) {
        this.formatVersion = formatVersion
        this.savedTime = savedTime
        this.years = years
    }
}

class Data {
    bookName
    years
    password

    constructor(
        bookName: string = '新日记本',
        years: Year[] = [new Year((new Date).getFullYear())],
        password: string = ''
    ) {
        this.bookName = bookName
        this.years = years
        this.password = password
    }
    // getYear(index: number) {
    //     return this.years.filter(year => year.index === index).shift()
    // }
}

class Path {
    year: number = Infinity
    month: number = Infinity
    date: number = Infinity
    constructor(path?: Path) {
        path && this.set()
            .year(path.year)
            .month(path.month)
            .date(path.date)
    }
    set() {
        const _this = this
        const setter = {
            year(index: number) {
                _this.year = index
                return setter
            },
            month(index: number) {
                _this.month = index
                return setter
            },
            date(index: number) {
                _this.date = index
                return setter
            },
            done() {
                return _this
            }
        }
        return setter
    }
    toString() {
        return `${this.year}/${this.month}/${this.date}`
    }
}

export {
    RichText,
    Diary,
    Month,
    Year,
    FileData,
    Data,
    Path
}