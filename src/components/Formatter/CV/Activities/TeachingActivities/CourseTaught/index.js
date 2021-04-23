import React from "react";
import {
    any,
    FieldValueMapper,
    FormatterTracker,
    reftableValueParser,
    reftableValueFormatter,
    singleLineMultiFieldValueFormatter,
    genericFieldFormatter
} from "../../../../utils/helper";
import {tw} from "twind";
import {StyledSubsectionFormatterContainer} from "../../../../utils/styledComponents";

export default function CourseTaught(props) {
    const rawData = props.rawData;
    const formData = rawData.values;
    const schema = props.schema;

    if (props.isFullScreenViewMode === true) {
        const mappedValue = FieldValueMapper(formData, schema);
        const ft = new FormatterTracker(mappedValue);
        const {
            role: ro,
            geographical_scope: gs,
            course_code: cc,
            academic_session: as,
            start_date: sd,
            end_date: ed,
            course_title: cti,
            guest_lecture: gl,
            department: dp,
            organization: ori,
            other_organization: otori,
            other_organization_type: otorit,
            other_organization_location: otoril,
            course_level: cl,
            course_topic: cto,
            section: sec,
            number_of_students: nos,
            number_of_credits: noc,
            lecture_hours_per_week: lehpw,
            lab_hours_per_week: lahpw,
            tutorial_hours_per_week: thpw,
            'co-instructors': ci,
            student_rating_of_instruction: sroi
        } = ft.getFields();

        return (
            <div>
                {any(ro, cc, as, sd, ed) &&
                <p>
                    {singleLineMultiFieldValueFormatter([ro, cc, as, sd, ed], null, ['s'], [', ', ', '], [[2, 3, 4, ' ('], [3, 3, 4, ' - '], [4, 3, 4, ')']])}
                </p>}
                {any(cti, gl) &&
                <p>
                    {singleLineMultiFieldValueFormatter([cti, gl], null, null, [' ', ['(', ')']])}
                </p>}
                {any(dp) && <p>{dp.val}</p>}
                {any(ori, otori, otorit, otoril) &&
                <p>{ori.val && reftableValueParser(ori.val, false, true).map((val, index) => {
                    return reftableValueFormatter(val, index)
                })}
                    {singleLineMultiFieldValueFormatter([otori, otorit, otoril], null, null, [', ', ', '])}
                </p>}
                {any(cl, cto) && <p>
                    {singleLineMultiFieldValueFormatter([cl, cto], null, null, [', '])}
                </p>}
                {any(sec) && <p>{sec.lbl}: {sec.val}</p>}
                {any(nos, noc) && <p>
                    {singleLineMultiFieldValueFormatter([nos, noc], [true, true], null, [', '])}
                </p>}
                {any(lehpw, lahpw, thpw) && <p>
                    {singleLineMultiFieldValueFormatter([lehpw, lahpw, thpw], [true, true, true], null, [', ', ', '])}
                </p>}
                {any(ci) &&
                <div>
                    <p><strong>{ci.lbl}: </strong></p><p>
                    {ci.val.map((val, index) => {
                        return <span key={index}>
                                {singleLineMultiFieldValueFormatter([val.first_name, val.family_name], null, null, [' '])}
                            </span>
                    })}
                </p></div>}
                <StyledSubsectionFormatterContainer>
                    {any(sroi) &&
                    <div>
                        <p>{sroi.lbl}: </p>
                        {sroi.val.map((val, index) => {
                            return <div key={index}>
                                <p>{singleLineMultiFieldValueFormatter([val.course_code, val['term_or_full-year']], null, null, [', '])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.teaching_effectiveness_rating, val.department_mean_for_teaching_effectiveness], [true, true], null, [', '])}</p>
                                <p>{singleLineMultiFieldValueFormatter([val.number_of_students, val.response_ratio], [true, true], null, [', '])}</p>
                            </div>
                        })}
                    </div>}
                </StyledSubsectionFormatterContainer>
                {genericFieldFormatter(ft.getUnformattedField())}
            </div>
        )
    } else {
        const mappedValue = FieldValueMapper(rawData, schema, true);
        const ft = new FormatterTracker(mappedValue, true);
        const subsection = props.structureChain[0];

        const {
            first_name: fin,
            family_name: fan
        } = ft.getFields();
        if (subsection) {
            let formattedValue = null;
            switch (subsection) {
                case 'co-instructors':
                    formattedValue =
                        <p>{singleLineMultiFieldValueFormatter([fin, fan], null, null, [' '])}</p>;
                    break;
                case 'student_rating_of_instruction':
                    const {
                        course_code: cc,
                        'term_or_full-year': tofy,
                        teaching_effectiveness_rating: ter,
                        department_mean_for_teaching_effectiveness: dmfte,
                        number_of_students: nos,
                        response_ratio: rr
                    } = ft.getFields();

                    formattedValue = <div className={tw`space-y-1.5`}>
                        <p>{singleLineMultiFieldValueFormatter([cc, tofy], null, null, [', '])}</p>
                        <p>{singleLineMultiFieldValueFormatter([ter, dmfte], [true, true], null, [', '])}</p>
                        <p>{singleLineMultiFieldValueFormatter([nos, rr], [true, true], null, [', '])}</p>
                    </div>
                    break;
                default:
                    formattedValue = genericFieldFormatter(ft.getUnformattedField(), true);
                    break;
            }
            return formattedValue
        } else {
            return (
                <React.Fragment>
                    {JSON.stringify(props.rawData)}
                </React.Fragment>
            )
        }
    }
}