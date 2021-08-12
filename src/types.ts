class RichText {
    data = ''
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
    constructor(
        index: number,
        title: string = '',
        tags: string[] = [],
        summary: RichText = new RichText(''),
        diarys: Diary[] = []
    ) {
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
        months: Month[] = []
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
        years: Year[] = []
    ) {
        this.formatVersion = formatVersion
        this.savedTime = savedTime
        this.years = years
    }
}

export {
    RichText,
    Diary,
    Month,
    Year,
    FileData
}