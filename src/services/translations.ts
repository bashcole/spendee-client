export const fetchTranslations = async (locale: string) => {
    try {
        // console.log('ENV CHECK')
        // console.log(process.env)

        // @ts-ignore
        return (await import(`../../public/locales/${locale}/translation.json`)).default;

        // const resp = await fetch(`${process.env.FRONTEND_URL}/locales/${locale}/translation.json`)
        // return await resp.json()

    } catch (e) {
        return {}
    }
}