import { I18NString, type LangKey, Strings } from './lib'

export function createAppStrings(lang: LangKey) {
    return new Strings(lang, {
        newTicket: new I18NString({
            en: 'New ticket',
            es: 'Nuevo ticket',
        }),
    })
}

export type AppStrings = ReturnType<typeof createAppStrings>
