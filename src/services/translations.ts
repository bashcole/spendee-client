export const fetchTranslations = async (locale: string) => {
    try {
        // @ts-ignore
        return (await import(`../../public/locales/${locale}/translation.json`)).default;

    } catch (e) {
        return {}
    }
}