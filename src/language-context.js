import {createContext} from 'react';

export const language = {
    EN: {
        language: 'EN',
        color: '#EF689F',
        submitBtnColor: '#e01b6b',
        cancelBtnColor: '#F5AECB'
    },
    FR: {
        language: 'FR',
        color: '#7BAAF8',
        submitBtnColor: '#3498DB',
        cancelBtnColor: '#7FB3D5',
    },
    SP: {
        language: 'SP',
        color: '#4d9f3c',
        submitBtnColor: '#1d9402',
        submitBtnContent: 'Enviar',
        cancelBtnColor: '#78a26f',
        cancelBtnContent: 'Cancelar'
    }
}

export const LanguageContext = createContext({
    language: language.EN,
    toggleLanguage: () => {
    },
});