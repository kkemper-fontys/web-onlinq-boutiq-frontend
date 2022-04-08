import { Storage } from "@capacitor/storage";

// give the users current language back to the frontend from the local storage
export const getLanguage = async () => {
    const language = await Storage.get({
        key: "language",
    });
    if (language.value === null) {
        return initialLanguage;
    } else {
        return language.value;
    }
};

// change the users language in the local storage
export const putInCart = async (lang) => {
    await Storage.set({
        key: "language",
        value: lang,
    });
};