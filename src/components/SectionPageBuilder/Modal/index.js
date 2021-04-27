import React from "react";

export function ModalFullScreen(props) {
    const {content} = props;

    return (
        <>
            <div style={{left: '0px', top: '0px', zIndex: 50, overflowY: "auto", height: '100%', width: '100%', position: "fixed", backgroundColor: "#E5E7EB"}}>
                {content}
                {/*<div className={tw`h-full w-full mx-auto py-5`}>*/}
                {/*    <div className={tw`flex border-b-2 border-gray-200 py-3 items-center space-x-3`}>*/}
                {/*        <h1 className={tw`text-2xl font-semibold text-black ml-60`}>{title}</h1>*/}
                {/*        {content.props.formSchema && content.props.formSchema.form_description &&*/}
                {/*        <Tooltip*/}
                {/*            placement="right"*/}
                {/*            trigger="hover"*/}
                {/*            delayHide={200}*/}
                {/*            tooltip={*/}
                {/*                <div className={tw`mx-2 my-1`}>*/}
                {/*                    <p className={tw`mb-1`}><strong>{title}</strong></p>*/}
                {/*                    {content.props.formSchema &&*/}
                {/*                    <p>{content.props.formSchema.form_description ?? null}</p>}*/}
                {/*                </div>*/}
                {/*            }*/}
                {/*            hideArrow={true}*/}
                {/*            modifiers={[*/}
                {/*                {*/}
                {/*                    name: "offset",*/}
                {/*                    enabled: true,*/}
                {/*                    options: {*/}
                {/*                        offset: [0, 10]*/}
                {/*                    }*/}
                {/*                }*/}
                {/*            ]}*/}
                {/*        >*/}
                {/*            <AiOutlineQuestionCircle className={tw`text-red-600`} size={"1.5em"}/>*/}
                {/*        </Tooltip>}*/}
                {/*    </div>*/}
                {/*    <div className={tw`pt-2 pb-5 my-4`}>*/}
                {/*        {content}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

        </>
    );
}
