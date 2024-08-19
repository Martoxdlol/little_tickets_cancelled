import { I18NString, type LangKey, Strings } from './lib'

export function createAppStrings(lang: LangKey) {
    return new Strings(lang, {
        newTicket: new I18NString({
            en: 'New ticket',
            es: 'Nuevo ticket',
        }),
        onboardingTitle: new I18NString({
            en: 'Please complete onboarding',
            es: 'Complete su bienvenida',
        }),
        welcome: new I18NString({
            en: 'Welcome',
            es: 'Bienvenido/a',
        }),
        myAccount: new I18NString({
            en: 'My account',
            es: 'Mi cuenta',
        }),
        logout: new I18NString({
            en: 'Logout',
            es: 'Cerrar sesión',
        }),
        createOrganization: new I18NString({
            en: 'Create organization',
            es: 'Crear organización',
        }),
        joinExistingOrganization: new I18NString({
            en: 'Join existing organization',
            es: 'Unirse a organización existente',
        }),
        noPendingInvitations: new I18NString({
            en: 'No pending invitations',
            es: 'No hay invitaciones pendientes',
        }),
    })
}

export type AppStrings = ReturnType<typeof createAppStrings>
