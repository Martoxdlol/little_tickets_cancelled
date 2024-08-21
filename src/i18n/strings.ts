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
        slugErrorMessage: new I18NString({
            en: 'Must be between 4 and 56 characters, and only contain letters, numbers, and dashes',
            es: 'Debe tener entre 4 y 56 caracteres, y solo contener letras, números y guiones',
        }),
        nameErrorMessage: new I18NString({
            en: 'Must be between 1 and 255 characters',
            es: 'Debe tener entre 1 y 255 caracteres',
        }),
        genericErrorMessage: new I18NString({
            en: 'An error occurred',
            es: 'Ocurrió un error',
        }),
        channels: new I18NString({
            en: 'Channels',
            es: 'Canales',
        }),
        createChannel: new I18NString({
            en: 'Create channel',
            es: 'Crear canal',
        }),
    })
}

export type AppStrings = ReturnType<typeof createAppStrings>
