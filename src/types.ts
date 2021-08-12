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
        diarys: Diary[] = (Array(getDaysCount(yearIndex, index))
            .fill(0)
            .map((_, i) => new Diary(i + 1))
        )
    ) {
        this.yearIndex = yearIndex
        this.index = index
        this.title = title
        this.tags = tags
        this.summary = summary
        this.diarys = diarys
    }
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
        months: Month[] = Array(12).fill(0).map((_, m) => new Month(index, m + 1))
    ) {
        this.index = index
        this.title = title
        this.tags = tags
        this.summary = summary
        this.months = months
    }
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
    years
    constructor(
        years: Year[] = [new Year((new Date).getFullYear())]
    ) {
        this.years = years
    }
}

export {
    RichText,
    Diary,
    Month,
    Year,
    FileData,
    Data
}