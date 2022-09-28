import {Language} from "./types";

export const BG: Language = { locale: 'bg-BG', language: 'Български', code: 'bg' }
export const EN: Language = { locale: 'en-US', language: 'English', code: 'en' }

export const languages = {
    'bg-BG': BG,
    'en-US': EN,
}

export const languageList = Object.values(languages)