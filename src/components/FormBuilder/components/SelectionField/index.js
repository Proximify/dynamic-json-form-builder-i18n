import React from 'react';
import {components} from "react-windowed-select";
import {
    StyledSelect,
    StyledWindowedSelect,
    StyledMultiColWindowedSelect,
    StyledMultiColWindowedSelectMenuItem,
    StyledMultiColWindowedSelectValueContainer
} from "../utils/styledComponents";
import {css} from 'styled-components/macro'
import tw from "twin.macro";

const handleChange = (value, onChange) => {
    onChange(!value ? undefined : JSON.stringify(value.value))
}

export function SingleSelectionWidget(props) {
    const {options, value} = props;
    return (
        <StyledSelect
            id={props.schema.id}
            getOptionLabel={option => option.value[1] ?? option.label}
            options={options.enumOptions}
            defaultValue={value ?
                options.enumOptions[options.enumOptions.map(element =>
                    element.value.toString()
                ).indexOf(value.toString())]
                : null}
            onChange={value => handleChange(value, props.onChange)}
            isClearable={true}
        />
    );
}

export function MultiColSelectionWidget(props) {
    const {options, value} = props;
    const formatOptionLabel = ({label, value}) => (
        <table>
            <tbody>
            <tr>
                {
                    value.map((val, index) => {
                        return index > 0 ?
                            <td key={index} css={[tw`w-40 p-1`]}>{val}</td>
                            : null
                    })
                }
            </tr>
            </tbody>
        </table>
    );

    return (
        <StyledSelect
            id={props.schema.id}
            options={options.enumOptions}
            onChange={value => handleChange(value, props.onChange)}
            formatOptionLabel={formatOptionLabel}
            defaultValue={value ?
                options.enumOptions[options.enumOptions.map(element =>
                    element.value.toString()
                ).indexOf(value.toString())]
                : null}
            isClearable
        />
    );
}

export function SingleLargeSelectionWidget(props) {
    const {value} = props;
    const lovOptions = props.formContext.lovOptions[props.schema.subtype_id].map(opt => {
        return {label: opt.toString(), value: opt}
    });
    const lovValue = value ? JSON.parse(value) : undefined;
    return (
        <StyledWindowedSelect
            className='react-select-container'
            classNamePrefix="react-select"
            id={props.schema.id}
            getOptionLabel={option => option.value[1] ?? option.label}
            options={lovOptions}
            defaultValue={lovValue ?
                lovOptions[lovOptions.map(element =>
                    element.value.toString()
                ).indexOf(lovValue.toString())]
                : null}
            onChange={value => handleChange(value, props.onChange)}
            isClearable={true}/>);
}

export function MultiColLargeSelectionWidget(props) {
    const {value} = props;
    const lovOptions = props.formContext.lovOptions[props.schema.subtype_id].map(opt => {
        return {label: opt.toString(), value: opt}
    });
    const lovValue = value ? JSON.parse(value) : undefined;

    const formatOptionLabel = ({label, value}) => (
        <table css={[tw`w-full border-b`]}>
            <tbody>
            <tr css={[tw`flex`]}>
                {
                    value.map((val, index) => {
                        return index > 0 &&
                            <StyledMultiColWindowedSelectMenuItem
                                key={index}
                                numberOfCol={value.length - 1}>{val}
                            </StyledMultiColWindowedSelectMenuItem>
                    })
                }
            </tr>
            </tbody>
        </table>
    );

    const SingleValue = ({children, ...props}) => {
        const value = [...props.data.value];
        value.shift();
        return (<StyledMultiColWindowedSelectValueContainer numberOfCol={value.length - 1}>
            <components.SingleValue {...props}>
                {value.map((val, index) => {
                    return <p key={index} css={[tw`overflow-scroll`]}>{val}</p>
                })}
            </components.SingleValue>
        </StyledMultiColWindowedSelectValueContainer>)
    };

    return (
        <StyledMultiColWindowedSelect
            className='react-select-container'
            classNamePrefix="react-select"
            id={props.schema.id}
            components={{SingleValue}}
            options={lovOptions}
            onChange={value => handleChange(value, props.onChange)}
            defaultValue={lovValue ?
                lovOptions[lovOptions.map(element =>
                    element.value.toString()
                ).indexOf(lovValue.toString())]
                : null}
            formatOptionLabel={formatOptionLabel}
            isClearable={true}
        />
    );
}