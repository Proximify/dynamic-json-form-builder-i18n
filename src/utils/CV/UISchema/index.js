import GenericFieldTemplate from '../../../component/dynamic-json-form-builder/components/utils/GenericFieldTemplate';
import {
    StringInputWidget, NumberInputWidget, PhoneInputWidget
} from "../../../component/dynamic-json-form-builder/components/SingleField";
import SelectionFieldWidget from "../../../component/dynamic-json-form-builder/components/SelectionField";
import {
    CurrencyFieldTemplate,
    FundBundleFieldTemplate,
    FundFieldTemplate
} from "../../../component/dynamic-json-form-builder/components/FundField/templates";
import {
    CurrencyFieldWidget,
    FundFieldWidget
} from "../../../component/dynamic-json-form-builder/components/FundField";
import {
    MultiLangFieldWidget,
    MultiLangTextAreaFieldWidget
} from '../../../component/dynamic-json-form-builder/components/MultiLangField'
import MultiLangFieldTemplate from '../../../component/dynamic-json-form-builder/components/MultiLangField/template';
import {
    ObjectFieldTemplate,
    ObjectItemTemplate
} from '../../../component/dynamic-json-form-builder/components/ObjectField/ObjectFieldTemplate';
import ArrayFieldTemplate from '../../../component/dynamic-json-form-builder/components/ArrayField/ArrayFieldTemplate';
import FileFieldTemplate from "../../../component/dynamic-json-form-builder/components/FileField/FileFieldTemplate";
import FileFieldWidget from "../../../component/dynamic-json-form-builder/components/FileField";

const customTemplates = {
    genericFieldTemplate: GenericFieldTemplate
}

const customArrayTemplate = {
    arrayFieldTemplate: ArrayFieldTemplate
}

const customWidgets = {
    fundFieldWidget: FundFieldWidget,
    currencyFieldWidget: CurrencyFieldWidget,
    multiLangFieldWidget: MultiLangFieldWidget,
    selectionFieldWidget: SelectionFieldWidget,

    stringInputWidget: StringInputWidget,
    numberInputWidget: NumberInputWidget,
    phoneInputWidget: PhoneInputWidget

};

const schemas = {
    "personal_information": {
        "identification": {
            "title": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
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
                "ui:ObjectFieldTemplate": ObjectFieldTemplate,
                "month": {
                    "ui:FieldTemplate": ObjectItemTemplate
                },
                "day": {
                    "ui:FieldTemplate": ObjectItemTemplate
                }
            },
            "sex": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            },
            "designated_group": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            },
            "correspondence_language": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            },
            "canadian_residency_status": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            },
            "applied_for_permanent_residency": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            },
            "permanent_residency_start_date": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "numberInputWidget"
            },
            "country_of_citizenship": {
                "ui:ArrayFieldTemplate": customArrayTemplate["arrayFieldTemplate"],
                "items": {
                    "country_of_citizenship": {
                        "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                        "ui:widget": "selectionFieldWidget"
                    }
                }
            }
        },
        "language_skill": {
            "language": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            },
            "read": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            },
            "write": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            },
            "speak": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            },
            "understand": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            },
            "peer_review": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            }
        },
        "address": {
            "address_type": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            }
        },
        "telephone": {
            "phone_type": {
                "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
                "ui:widget": "selectionFieldWidget"
            }
        }
    },
    "recognitions": {
        "recognition_type": {
            "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
            "ui:widget": "selectionFieldWidget"
        }
    },
    "user_profile": {
        "researcher_status": {
            "ui:FieldTemplate": customTemplates["genericFieldTemplate"],
            "ui:widget": "selectionFieldWidget"
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