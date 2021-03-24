import React, {useState} from 'react';
import './SingleField.css'
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextareaAutosize from 'react-textarea-autosize';
import {handleOnPrimaryItemSetBtnClick} from "../../../SectionPageBuilder/helper/sectionPageBuilderHelper";
import api from "../../../SectionPageBuilder/helper/api";

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

const handleValueChange = (value, rawErrors, setValue, onChange, isElapsedTime = false) => {
    // console.log(value)
    if (!rawErrors || rawErrors.length === 0) {
        setValue(value);
    } else {
        setValue(value);
        if (!isElapsedTime) {
            onChange(value ?? undefined)
        } else {
            if (!value.Min && !value.Sec) {
                onChange(undefined)
            } else {
                const time = `${value.Min ? Number(value.Min) : value.Min}:${value.Sec ? Number(value.Sec) : value.Sec}`
                onChange(time)
            }
        }
    }
}

export function StringInputWidget(props) {
    // console.log(props)
    const [value, setValue] = useState(props.value ?? "");
    return (
        <TextareaAutosize
            className={"singleFieldInput"}
            style={{resize: 'none'}}
            minRows={1}
            // type={"textarea"}
            maxLength={props.schema.max_char_count ?? undefined}
            // onKeyDown={event => {(event.key === 'Enter') ?}}
            id={props.schema.id}
            value={value}
            required={props.required}
            onChange={event => handleValueChange(event.target.value, props.rawErrors, setValue, props.onChange)}
            onBlur={() => props.onChange(value !== "" ? value : undefined)}
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
            isAllowed={(values) => values.value >= 0 ? values : null}
            thousandSeparator={false}
            onValueChange={value => handleValueChange(value.value, props.rawErrors, setValue, props.onChange)}
            onBlur={() => props.onChange(value !== "" ? value : undefined)}
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

export function ElapsedTimeWidget(props) {
    const [value, setValue] = useState(props.value ? {
        Min: props.value.split(':')[0],
        Sec: props.value.split(':')[1]
    } : {Min: undefined, Sec: undefined});

    return (
        <div className="flex space-x-4"
             onBlur={() => {
                 if (!value.Min && !value.Sec) {
                     if (props.value !== undefined)
                         props.onChange(undefined)
                 } else {
                     const time = `${value.Min ? Number(value.Min) : value.Min}:${value.Sec ? Number(value.Sec) : value.Sec}`
                     if (props.value !== time)
                         props.onChange(time)
                 }
             }}>
            <NumberFormat
                className={"multiFieldInput w-1/2"}
                type="text"
                suffix={" Min"}
                decimalScale={0}
                id={`${props.schema.id}`}
                value={value.Min}
                placeholder="Min."
                isAllowed={(values) => values.value >= 0 ? values : null}
                onValueChange={(values) => {
                    handleValueChange({
                        Min: values.value,
                        Sec: value.Sec
                    }, props.rawErrors, setValue, props.onChange, true)
                }}
            />
            <NumberFormat
                className={"multiFieldInput w-1/2"}
                type="text"
                suffix={" Sec"}
                decimalScale={0}
                id={props.schema.id}
                value={value.Sec}
                placeholder="Sec."
                isAllowed={(values) => values.value < 60 ? values : null}
                onValueChange={(values) => {
                    handleValueChange({
                        Min: value.Min,
                        Sec: values.value
                    }, props.rawErrors, setValue, props.onChange, true)
                }}
            />
        </div>
    )
}

export function DateInputWidget(props) {
    const {value} = props;
    const [date, setDate] = useState(value ? new Date(value.split('-')[0], value.split('-')[1] - 1, value.split('-')[2]) : null);

    const handleChange = (dateValue) => {
        if (!dateValue) {
            props.onChange(undefined);
        } else {
            const year = dateValue.getFullYear();
            const month = dateValue.getMonth() + 1;
            const date = dateValue.getDate();
            props.onChange(year + '-' + month + '-' + date);
        }
    }

    return (
        <DatePicker selected={date}
                    onChange={(date) => {
                        setDate(date);
                        return handleChange(date);
                    }}
                    dateFormat="yyyy/MM/dd"
            // locale={locale(i18n.language === 'fr' ? 'fr' : 'en')}
            // placeholderText={i18n.language === "fr" ? "aaaa/m/j" : "yyyy/mm/dd"}
                    locale={'en'}
                    placeholderText={'yyyy/mm/dd'}
                    dropdownMode="scroll"
                    showMonthDropdown={true}
                    showYearDropdown={true}
                    scrollableYearDropdown={true}
                    todayButton="Today"
        />
    );
}

export function MonthDayInputWidget(props) {
    // const date = props.value ? props.value.split("/") : null;
    // const [state, setState] = useState(date ? {date: new Date(new Date().getFullYear(), date[0], date[1])} : {date: undefined});
    const {value} = props;
    const [date, setDate] = useState(value ? new Date(1000, value.split('/')[0] - 1, value.split('/')[1]) : null);
    // const {i18n} = useTranslation();

    const handleChange = (dateValue) => {
        if (!dateValue) {
            props.onChange(undefined);
        } else {
            const month = dateValue.getMonth() + 1;
            const date = dateValue.getDate();
            props.onChange(month + '/' + date);
        }
    }

    return (
        <DatePicker selected={date}
                    onChange={(date) => {
                        setDate(date);
                        return handleChange(date);
                    }}
                    dateFormat="MM/dd"
                    dateFormatCalendar="MMM"
            // locale={locale(i18n.language === 'fr' ? 'fr' : 'en')}
            // placeholderText={i18n.language === "fr" ? "m/j" : "mm/dd"}
                    locale={'en'}
                    placeholderText={'mm/dd'}
                    showMonthDropdown={true}
        />
    );
}

export function YearMonthInputWidget(props) {
    const {value} = props;
    // const [date, setDate] = useState(value ? new Date(value.split('/')[0], value.split('/')[1] - 1) : null);
    const [state, setState] = useState(
        () => {
            const hasDate = value ? value.split('/').length >= 3 : false;
            return {
                date: value ? new Date(value.split('/')[0], value.split('/')[1] - 1, hasDate ? value.split('/')[2] : 1) : null,
                hasDate: hasDate
            }
        }
    );

    const handleChange = (dateValue, hasDate) => {
        // console.log("handle change", dateValue, hasDate)
        if (!dateValue) {
            props.onChange(undefined);
        } else {
            const year = dateValue.getFullYear();
            const month = dateValue.getMonth();
            const date = dateValue.getDate();
            props.onChange(`${year}/${month + 1}${hasDate ? `/${date}` : ''}`);
        }
    }


    return (
        <DatePicker selected={state.date}
                    onChangeRaw={event => {
                        if (event.target.value === undefined) {
                            return;
                        }
                        if (event.target.value === '') {
                            setState({
                                ...state,
                                date: null,
                                hasDate: false
                            })
                            handleChange(undefined);
                        } else {
                            const newHasMonth = event.target.value.split('/').length > 2 || (event.target.value.split('/').length === 2 && event.target.value.slice(-1) !== '/');
                            const newHasDate = event.target.value.split('/').length >= 3 && event.target.value.slice(-1) !== '/';
                            const newDate = new Date(event.target.value.split('/')[0], newHasMonth ? event.target.value.split('/')[1] - 1 : 0, newHasDate ? event.target.value.split('/')[2] : 1);

                            if (newHasDate !== state.hasDate) {
                                console.log("monthday state change", state, newHasMonth, newHasDate);
                                setState({
                                    ...state,
                                    date: newDate,
                                    hasDate: newHasDate
                                })
                                handleChange(newDate, newHasDate);
                            } else {
                                // console.log(`date is ${JSON.stringify(newDate) === JSON.stringify(state.date) ? 'same' : "not same"}`)
                                if (JSON.stringify(newDate) !== JSON.stringify(state.date)) {
                                    // console.log(newDate.getFullYear(), newDate.getMonth(), newDate.getDay(), newDate)
                                    setState({
                                        ...state,
                                        date: newDate,
                                    })
                                    handleChange(newDate, newHasDate);
                                }
                            }
                        }
                    }}
                    onSelect={(date) => {
                        setState({
                            ...state,
                            date: date
                        })
                        handleChange(date, state.hasDate);
                    }}
                    dateFormat={!state.hasDate ? `yyyy/MM` : 'yyyy/MM/dd'}
            // locale={locale(i18n.language === 'fr' ? 'fr' : 'en')}
            // placeholderText={i18n.language === "fr" ? "aaaa/m" : "yyyy/mm"}
                    locale={'en'}
                    placeholderText={'yyyy/mm'}
                    showMonthYearPicker={!state.hasDate}
        />
    );
}

export function YearInputWidget(props) {
    const {value} = props;
    const [state, setState] = useState(
        () => {
            const hasMonth = value ? value.split('/').length >= 2 : false;
            const hasDate = value ? value.split('/').length >= 3 : false;
            return {
                date: value ? new Date(value.split('/')[0], hasMonth ? value.split('/')[1] - 1 : 0, hasDate ? value.split('/')[2] : 1) : null,
                hasMonth: hasMonth,
                hasDate: hasDate
            }
        }
    );
    // console.log(date, value.split('/')[0], hasMonth, hasDate)
    const handleChange = (dateValue, hasMonth, hasDate) => {
        // console.log("handle change", dateValue, hasMonth, hasDate)
        if (!dateValue) {
            props.onChange(undefined);
        } else {
            const year = dateValue.getFullYear();
            const month = dateValue.getMonth();
            const date = dateValue.getDate();
            props.onChange(`${year}${hasMonth ? `/${month + 1}` : ''}${hasDate ? `/${date}` : ''}`);
        }
    }

    return (
        <DatePicker selected={state.date}
                    onChangeRaw={event => {
                        const value = event.target.value;
                        if (value === undefined) {
                            return;
                        }
                        if (value === '') {
                            setState({
                                ...state,
                                date: null,
                                hasMonth: false,
                                hasDate: false
                            })
                            handleChange(undefined);
                        } else {
                            const regExp = new RegExp('^([0-9]{2,4}/?)([0-9]{0,2}/?)([0-9]{0,2})$');
                            if (regExp.test(value)) {
                                if (regExp.test(value)) {
                                    const newHasMonth = value.split('/').length > 2 || (value.split('/').length === 2 && value.slice(-1) !== '/');
                                    const newHasDate = value.split('/').length >= 3 && value.slice(-1) !== '/';
                                    const newDate = new Date(value.split('/')[0], newHasMonth ? value.split('/')[1] - 1 : 0, newHasDate ? value.split('/')[2] : 1);

                                    if (newHasMonth !== state.hasMonth || newHasDate !== state.hasDate) {
                                        console.log("monthday state change", state, newHasMonth, newHasDate);
                                        setState({
                                            ...state,
                                            date: newDate,
                                            hasMonth: newHasMonth,
                                            hasDate: newHasDate
                                        })
                                        handleChange(newDate, newHasMonth, newHasDate);
                                    } else {
                                        // console.log(`date is ${JSON.stringify(newDate) === JSON.stringify(state.date) ? 'same' : "not same"}`)
                                        if (JSON.stringify(newDate) !== JSON.stringify(state.date)) {
                                            // console.log(newDate.getFullYear(), newDate.getMonth(), newDate.getDay(), newDate)
                                            setState({
                                                ...state,
                                                date: newDate,
                                            })
                                            handleChange(newDate, newHasMonth, newHasDate);
                                        }
                                    }
                                }
                            }

                        }
                    }}
                    onSelect={(date) => {
                        setState({
                            ...state,
                            date: date
                        })
                        handleChange(date, state.hasMonth, state.hasDate);
                    }}
                    dateFormat={state.hasMonth ? (state.hasDate ? "yyyy/MM/dd" : `yyyy/MM`) : `yyyy`}
            // locale={locale(i18n.language === 'fr' ? 'fr' : 'en')}
            // placeholderText={i18n.language === "fr" ? "aaaa" : "yyyy"}
                    locale={'en'}
                    placeholderText={'yyyy'}
                    showYearPicker={!state.hasMonth}
                    showMonthYearPicker={!state.hasDate}
                    showMonthDropdown={state.hasMonth}
                    showYearDropdown={state.hasMonth}
                    scrollableYearDropdown={state.hasMonth}
        />
    );
}

export function BooleanInputWidget(props) {
    const {value, id, onChange} = props;

    const onChangeValue = (event) => {
        onChange(event.target.value)
    }

    return <div className="singleFieldInput flex space-x-5" onChange={onChangeValue}>
        <input type="radio" value="0" name={`${id}`} checked={value ? value === "0" : false}/> No
        <input type="radio" value="1" name={`${id}`} checked={value ? value === "1" : false}/> Yes
    </div>


}