import React, {Component} from 'react';
import Form from "@rjsf/core";
import GenericFieldTemplate from './components/utils/GenericFieldTemplate';
import {
    NumberInputWidget,
    StringInputWidget,
    PhoneInputWidget,
    ElapsedTimeWidget,
    DateInputWidget,
    MonthDayInputWidget,
    YearMonthInputWidget,
    YearInputWidget,
    BooleanInputWidget,
    SliderInputWidget
} from "./components/SingleField";
import {
    SingleSelectionWidget,
    MultiColSelectionWidget,
    SingleLargeSelectionWidget,
    MultiColLargeSelectionWidget
} from "./components/SelectionField";
import {MultiLangFieldWidget} from './components/MultiLangField'
import {ReorderableArrayFieldTemplate, ArrayFieldTemplate} from './components/ArrayField/ArrayFieldTemplate';
import {ModalDeleteConfirm} from "./components/utils/Modals";
import HiddenFieldTemplate from "./components/HiddenField/HiddenFieldTemplate";
import HiddenFieldWidget from "./components/HiddenField";
import ReadOnlyFieldWidget from "./components/ReadOnlyFieldWidget";
import {css} from 'styled-components/macro'
import tw from "twin.macro";

const customWidgets = {
    multiLangFieldWidget: MultiLangFieldWidget,
    stringInputWidget: StringInputWidget,
    numberInputWidget: NumberInputWidget,
    phoneInputWidget: PhoneInputWidget,
    elapsedTimeWidget: ElapsedTimeWidget,
    dateInputWidget: DateInputWidget,
    monthDayInputWidget: MonthDayInputWidget,
    yearMonthInputWidget: YearMonthInputWidget,
    yearInputWidget: YearInputWidget,
    booleanInputWidget: BooleanInputWidget,
    sliderInputWidget: SliderInputWidget,
    singleSelectionWidget: SingleSelectionWidget,
    multiColSelectionWidget: MultiColSelectionWidget,
    singleLargeSelectionWidget: SingleLargeSelectionWidget,
    multiColLargeSelectionWidget: MultiColLargeSelectionWidget,
    hiddenFieldWidget: HiddenFieldWidget,
    readOnlyFieldWidget: ReadOnlyFieldWidget
};

const customTemplates = {
    genericFieldTemplate: GenericFieldTemplate,
    hiddenFieldTemplate: HiddenFieldTemplate
}

const customArrayTemplate = {
    reorderableArrayFieldTemplate: ReorderableArrayFieldTemplate,
    arrayFieldTemplate: ArrayFieldTemplate
}

class FormBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {shouldDeleteConfirmModalOpen: false, shouldDeleteForm: false, formData: this.props.formData ?? undefined, newForm: Object.keys(this.props.formData).length === 0};
        this.handleStateChange = this.handleStateChange.bind(this);
        document.addEventListener("keydown", this._handleKeyDown.bind(this));
    }

    /**
     * This function handle the form submit event
     * @param data
     */
    onFormSubmit = () => {
        this.onErrorMsgChange(null);
        this.props.onFormEditSubmit(this.state.formData);
    }

    componentDidUpdate() {
        if (this.state.shouldDeleteForm) {
            this.props.onFormEditDelete(this.state.formData)
        }
    }

    _handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    handleStateChange(newState) {
        this.setState(newState);
    }

    onErrorMsgChange = (errors) => {
        const errorMsgDiv = document.getElementById(`${this.props.formID}-errorMsg`);
        if (!errorMsgDiv)
            return;
        if (errors) {
            const errorList = errors.map(err => Object.values(err));
            errorList.forEach(err => {
                console.log(err)
                let errorMsg = document.createElement("div");
                errorMsg.className += "alert alert-danger";
                errorMsg.role = "alert";
                errorMsg.innerHTML = err;
                errorMsgDiv.appendChild(errorMsg);
            })
        } else {
            errorMsgDiv.innerHTML = "";
        }
    }

    validation = (formData, errors) => {
        const validations = this.props.validations;
        Object.keys(validations).forEach(fieldName => {
            const fieldValidations = validations[fieldName];
            if (Array.isArray(fieldValidations)) {
                fieldValidations.forEach(fieldValidation => {
                    if (!fieldValidation.validateMethod(formData)) {
                        errors[fieldName].addError(fieldValidation.getErrMsg(formData));
                    }
                })
            } else if (fieldValidations && fieldValidations.constructor === Object) {
                Object.keys(fieldValidations).forEach(subFieldName => {
                    const subFieldValidations = validations[fieldName][subFieldName];
                    if (Array.isArray(subFieldValidations)) {
                        subFieldValidations.forEach(subFieldValidation => {
                            if (formData[fieldName]) {
                                formData[fieldName].forEach((subsection, index) => {
                                    if (!subFieldValidation.validateMethod(subsection)) {
                                        errors[fieldName][index][subFieldName].addError(subFieldValidation.getErrMsg(subsection[subFieldName]));
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

        return errors;
    }

    render() {
        console.log(this.state)
        return (
            <>
                <Form
                    id={this.props.formID ?? null}
                    schema={this.props.formSchema ?? undefined}
                    uiSchema={this.props.uiSchema ?? undefined}
                    formData={this.state.formData}
                    formContext={
                        {...this.props.formContext} ?? undefined
                    }
                    widgets={customWidgets}
                    showErrorList={false}
                    liveValidate
                    onChange={({formData}) => {
                        this.setState({...this.state, formData: formData})
                        // TODO generic
                        // if (formData.hasOwnProperty('total_workload')) {
                        //     formData.total_workload = (Number(formData.undergraduate_teaching) + Number(formData.graduate_professional_teaching)).toString();
                        // }
                        console.log("data changed", formData);

                    }}
                    validate={this.validation}
                    // noValidate={true}
                    onError={(errors) => {
                        this.onErrorMsgChange(errors);
                    }}
                    onSubmit={this.onFormSubmit}>
                    <div css={[tw`my-4 mb-20 mx-1.5`]}>
                        <div id={`${this.props.formID}-errorMsg`}>
                        </div>
                        <div css={[tw`flex justify-between`]}>
                            <div css={[this.state.newForm ? tw`invisible`: tw``]}>
                                <button css={[tw`py-1 px-2 ml-16 border bg-color-warning rounded text-white`]}
                                        type="button"
                                        onClick={() => {
                                            this.setState({...this.state, shouldDeleteConfirmModalOpen: true})
                                        }}
                                >Delete
                                </button>
                            </div>
                            <div>
                                <button css={[tw`py-1 px-2 mr-4 border bg-color-revert rounded text-black`]}
                                        type="button"
                                        onClick={() => {
                                            this.props.onFormEditCancel();
                                        }}>
                                    Cancel
                                </button>
                                <button css={[tw`py-1 px-2 border bg-color-action rounded`]}
                                        type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
                {this.state.shouldDeleteConfirmModalOpen &&
                <ModalDeleteConfirm state={this.state} changeState={this.handleStateChange}/>}
            </>
        );
    }
}

export default FormBuilder;