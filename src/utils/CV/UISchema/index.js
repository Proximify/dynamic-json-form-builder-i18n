import GenericFieldTemplate from '../../../component/dynamic-json-form-builder/components/utils/GenericFieldTemplate';
import {
    StringInputWidget, NumberInputWidget, PhoneInputWidget,DateInputWidget,MonthDayInputWidget
} from "../../../component/dynamic-json-form-builder/components/SingleField";
import {
    MultiColSelectionWidget,
    SingleSelectionWidget,
    SingleLargeSelectionWidget, MultiColLargeSelectionWidget, DOBSelectionWidget
} from "../../../component/dynamic-json-form-builder/components/SelectionField";
import {
    CurrencyFieldTemplate,
    FundBundleFieldTemplate,
    FundFieldTemplate
} from "../../../component/dynamic-json-form-builder/components/FundField/FundFieldTemplates";
import {
    CurrencyFieldWidget,
    FundFieldWidget
} from "../../../component/dynamic-json-form-builder/components/FundField";
import {
    MultiLangFieldWidget,
    MultiLangTextAreaFieldWidget
} from '../../../component/dynamic-json-form-builder/components/MultiLangField'
import MultiLangFieldTemplate from '../../../component/dynamic-json-form-builder/components/MultiLangField/MultiLanFieldTemplate';
import {
    ObjectFieldTemplate,
    ObjectItemTemplate
} from '../../../component/dynamic-json-form-builder/components/ObjectField/ObjectFieldTemplate';
import ReorderableArrayFieldTemplate from '../../../component/dynamic-json-form-builder/components/ArrayField/ArrayFieldTemplate';
import FileFieldTemplate from "../../../component/dynamic-json-form-builder/components/FileField/FileFieldTemplate";
import FileFieldWidget from "../../../component/dynamic-json-form-builder/components/FileField";

const customTemplates = {
    genericFieldTemplate: GenericFieldTemplate
}

const customArrayTemplate = {
    arrayFieldTemplate: ReorderableArrayFieldTemplate
}

const customWidgets = {
    fundFieldWidget: FundFieldWidget,
    currencyFieldWidget: CurrencyFieldWidget,
    multiLangFieldWidget: MultiLangFieldWidget,

    stringInputWidget: StringInputWidget,
    numberInputWidget: NumberInputWidget,
    phoneInputWidget: PhoneInputWidget,
    dateInputWidget:DateInputWidget,
    monthDayInputWidget:MonthDayInputWidget,

    singleSelectionWidget: SingleSelectionWidget,
    multiColSelectionWidget: MultiColSelectionWidget,
    singleLargeSelectionWidget: SingleLargeSelectionWidget,
    multiColLargeSelectionWidget: MultiColLargeSelectionWidget,
    dobSelectionWidget: DOBSelectionWidget
};

const schemas = {
    "personal_information": {
        "identification": {
            "title": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "family_name": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "stringInputWidget"
            },
            "first_name": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "stringInputWidget"
            },
            "middle_name": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "stringInputWidget"
            },
            "previous_family_name": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "stringInputWidget"
            },
            "previous_first_name": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "stringInputWidget"
            },
            "date_of_birth": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "monthDayInputWidget"
            },
            "sex": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "designated_group": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "correspondence_language": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "canadian_residency_status": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "applied_for_permanent_residency": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "permanent_residency_start_date": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "dateInputWidget"
            },
            "country_of_citizenship": {
                "ui:ArrayFieldTemplate": customArrayTemplate["arrayFieldTemplate"],
                "items": {
                    "country_of_citizenship": {
                        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                        "ui:widget": "singleSelectionWidget"
                    }
                }
            }
        },
        "language_skill": {
            "language": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "read": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "write": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "speak": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "understand": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            },
            "peer_review": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            }
        },
        "address": {
            "address_type": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            }
        },
        "telephone": {
            "phone_type": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "singleSelectionWidget"
            }
        }
    },
    "recognitions": {
        "recognition_type": {
            "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
            "ui:widget": "singleSelectionWidget"
        }
    },
    "user_profile": {
        "researcher_status": {
            "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
            "ui:widget": "singleSelectionWidget"
        }
    }
}

export const UISchema = (section, subSection, form) => {
    // console.log("----", section, subSection, form);
    if (!section) {
        return undefined;
    } else {
        if (!subSection) {
            return schemas[section] ?? undefined;
        } else {
            if (!form) {
                return schemas[section][subSection] ?? undefined
            } else {
                return schemas[section][subSection][form] ?? undefined
            }
        }
    }
}