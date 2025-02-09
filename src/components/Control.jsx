import React from "react";

export const Control = ({buttonTitle , Timerfunction}) =>{
    return (
        <>
            <button onClick={Timerfunction} className="rounded text-white py-3 text-lg  px-10     bg-[#4b5563] ">
                {buttonTitle}
            </button>
        </>
    )
}
// #182232