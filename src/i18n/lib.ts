export const langs = ['en', 'es'] as const

export type LangKey = (typeof langs)[number]

export type StringValues = Partial<Record<LangKey, string>>

export function validateLocale(locale: string): LangKey {
    if (langs.includes(locale as LangKey)) {
        return locale as LangKey
    }

    return 'en'
}
export class I18NString {
    values: StringValues

    constructor(values: StringValues) {
        this.values = values
    }

    getLang(lang: LangKey): string {
        if (this.values[lang]) {
            return this.values[lang] as string
        }

        if (this.values.en) {
            return this.values.en
        }

        if (this.values.es) {
            return this.values.es
        }

        return ''
    }
}

export class Strings<T extends Record<string, I18NString>> {
    lang: LangKey
    strigns: T
    constructor(lang: LangKey, strings: T) {
        this.lang = lang
        this.strigns = strings
    }

    get(key: keyof T): string {
        return this.strigns[key]!.getLang(this.lang)
    }
}
