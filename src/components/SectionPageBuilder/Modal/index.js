import React from "react";
import {tw} from "twind";

export function ModalFullScreen(props) {
    const {content} = props;

    return (
        <div className={tw`inset-0 z-50 h-full w-full fixed bg-gray-200 flex overflow-y-auto`}>
            {/*<div style={{left: '0px', top: '0px', zIndex: 50, overflowY: "auto", height: '100%', width: '100%', position: "fixed", backgroundColor: "#E5E7EB"}}>*/}
            {/*    {content}*/}
            {/*</div>*/}

            <div className={tw`w-1/5`}>Reports Dropdown</div>
            <div className={tw`w-3/5`}>
                {content}
            </div>
            <div className={tw`w-1/5`}/>



        </div>
    );
}
