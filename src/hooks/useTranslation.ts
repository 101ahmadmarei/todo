import {useLanguage} from "@/components/language-provider";
import enTranslations from "@/locales/en.json";
import arTranslations from "@/locales/ar.json";

type TranslationKey = string;
type TranslationParams = Record<string, string | number>;

const translations = {
    en: enTranslations,
    ar: arTranslations,
};

export const useTranslation = () => {
    const {language} = useLanguage();

    const t = (key: TranslationKey, params?: TranslationParams): string => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            value = value?.[k];
        }

        if (typeof value !== 'string') {
            console.warn(`Translation key "${key}" not found for language "${language}"`);
            return key;
        }

        // Replace parameters in the translation string
        if (params) {
            return value.replace(/\{\{(\w+)\}\}/g, (match: string, paramKey: string) => {
                return params[paramKey]?.toString() || match;
            });
        }

        return value;
    };

    return {t, language};
};
