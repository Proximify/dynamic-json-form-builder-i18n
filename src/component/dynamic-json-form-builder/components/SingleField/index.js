import React, {useState, useRef, useEffect} from 'react';
import './SingleField.css'
import {useTranslation} from 'react-i18next';
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const months = {
    en: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    fr: [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre'
    ]
}

const weekDays = {
    en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    fr: ['l', 'ma', 'me', 'j', 'v', 's', 'd']
}

const locale = (local) => {
    return {
        localize: {
            month: n => months[local][n],
            day: n => weekDays[local][n]
        },
        formatLong: {},
        match: () => {
            console.log("match");
        }
    }
}

const handleValueChange = (value, rawErrors, setValue, onChange) => {
    if (!rawErrors || rawErrors.length === 0) {
        setValue(value);
    } else {
        setValue(value);
        onChange(value ?? undefined)
    }
}

export function StringInputWidget(props) {
    const [value, setValue] = useState(props.value ?? "");
    return (
        <input
            className={"singleFieldInput"}
            type={"text"}
            id={props.schema.id}
            value={value}
            required={props.required}
            onChange={event => handleValueChange(event.target.value, props.rawErrors, setValue, props.onChange)}
            onBlur={() => props.onChange(value)}
        />
    );
}

export function NumberInputWidget(props) {
    const [value, setValue] = useState(props.value ?? undefined);
    return (
        <NumberFormat
            className={"singleFieldInput"}
            type="text"
            id={props.schema.id}
            value={value}
            thousandSeparator={false}
            onValueChange={value => handleValueChange(value.value, props.rawErrors, setValue, props.onChange)}
            onBlur={() => props.onChange(value)}
        />
    );
}

export function PhoneInputWidget(props) {
    const [value, setValue] = useState(props.value ?? undefined);
    return (
        <NumberFormat
            className={"singleFieldInput"}
            type="text"
            id={props.schema.id}
            value={value}
            format={"+# (###) ###-####"}
            mask={"_"}
            onValueChange={value => handleValueChange(value.value, props.rawErrors, setValue, props.onChange)}
            onBlur={() => props.onChange(value)}
        />
    );
}

export function DateInputWidget(props) {
    const date = props.value ? props.value.split("-") : null;
    const [state, setState] = useState(date ? {date: new Date(date[0], date[1], date[2])} : {date: new Date()});
    const {t, i18n} = useTranslation();

    // useEffect(() => {
    //     if (isFirstRun.current) {
    //         console.log(new Date())
    //         isFirstRun.current = false;
    //         return;
    //     }
    //     setState({...state, locale: i18n.language})
    //
    // }, [i18n.language])
    // const locale = (local) => {
    //     return {
    //         localize: {
    //             month: n => months[local][n],
    //             day: n => weekDays[local][n]
    //         },
    //         formatLong: {},
    //         match: () => {
    //             console.log("match");
    //         }
    //     }
    // }

    const handleOnBlur = () => {
        if (!state.date) {
            props.onChange(undefined);
        } else {
            const year = state.date.getFullYear();
            const month = state.date.getMonth() + 1;
            const date = state.date.getDate();
            props.onChange(year + '-' + month + '-' + date);
        }
    }

    return (
        <DatePicker selected={state.date ?? null}
                    onChange={date => setState({date: date})}
                    dateFormat="yyyy/MM/dd"
                    locale={locale(i18n.language === 'fr' ? 'fr' : 'en')}
                    placeholderText={i18n.language === "fr" ? "aaaa/m/j" : "yyyy/mm/dd"}
                    onBlur={handleOnBlur}
                    dropdownMode="scroll"
                    showMonthDropdown={true}
                    showYearDropdown={true}
                    scrollableYearDropdown={true}
                    todayButton="Today"
        />
    );
}

export function MonthDayInputWidget(props) {
    const date = props.value ? props.value.split("/") : null;
    const [state, setState] = useState(date ? {date: new Date(new Date().getFullYear(), date[0], date[1])} : {date: new Date()});
    const {t, i18n} = useTranslation();

    const handleOnBlur = () => {
        if (!state.date) {
            props.onChange(undefined);
        } else {
            const month = state.date.getMonth() + 1;
            const date = state.date.getDate();
            props.onChange(month + '/' + date);
        }
    }

    return (
        <DatePicker selected={state.date ?? null}
                    onChange={date => setState({date: date})}
                    dateFormat="MM/dd"
                    dateFormatCalendar="MMM"
                    locale={locale(i18n.language === 'fr' ? 'fr' : 'en')}
                    placeholderText={i18n.language === "fr" ? "m/j" : "mm/dd"}
                    onBlur={handleOnBlur}
        />
    );
}