const contentType = process.env.REACT_APP_CONTENT_TYPE ?? 'members';
const contentId = process.env.REACT_APP_CONTENT_ID ?? '3';
const viewType = process.env.REACT_APP_VIEW_TYPE ?? 'cv';

export const handleOnPrimaryItemChangeBtnClick = (state, setState, structureChain, getFormFn) => {
    const newSection = [...state.sections];
    const targetForm = getFormFn(newSection, structureChain);
    if (targetForm) {
        targetForm.primaryItemUpdate = true;
        setState({
            ...state,
            sections: newSection
        })
    } else {
        console.error("cannot find target form when primary button click")
    }
}

export const handleOnPrimaryItemCancelBtnClick = (state, setState, structureChain, getFormFn) => {
    const newSection = [...state.sections];
    const targetForm = getFormFn(newSection, structureChain);
    if (targetForm) {
        targetForm.primaryItemUpdate = false;
        setState({
            ...state,
            sections: newSection
        })
    } else {
        console.error("cannot find target form when cancel primary button click")
    }
}

export const handleOnPrimaryItemSetBtnClick = (state, setState, structureChain, getFormFn, itemIndex, api) => {
    const newSection = [...state.sections];
    const targetForm = getFormFn(newSection, structureChain);
    if (targetForm) {
        const formData = new FormData();
        formData.append('action', 'setPrimaryItem');
        formData.append('data[itemId]', targetForm.section_data[itemIndex].id);
        formData.append('data[sectionId]', targetForm.section_id);
        formData.append('contentType', contentType);
        formData.append('contentId', contentId);
        formData.append('viewType', viewType);

        api.post('http://127.0.0.1:8000/profiles.php', formData, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then((response) => {
            if (response.data === true) {
                targetForm.section_data.forEach((secData, index) => {
                    if (index === itemIndex){
                        secData['attributes'] = {primary: true}
                    }else {
                        if (secData['attributes']){
                            delete secData.attributes;
                        }
                    }
                })
                console.log(targetForm, itemIndex);
                targetForm.primaryItemUpdate = false;
                setState({
                    ...state,
                    sections: newSection
                })
            }
        }, (error) => {
            console.error(error);
            targetForm.primaryItemUpdate = false;

            setState({
                ...state,
                sections: newSection
            })
        });
    } else {
        console.error("cannot find target form when set primary button click")
    }
}