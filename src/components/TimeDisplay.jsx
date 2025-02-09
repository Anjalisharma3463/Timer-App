import React from "react"; 
export const TimeDisplay = ({ time, editState, handleEditField, handleInputChange, handleSave , ConvertsecTotimer }) => {
    const timeObj = ConvertsecTotimer(time);

    return (
        <div className="flex space-x-2  pr-4 text-3xl">
            {["hrs", "min", "sec"].map((field, index) => (
                <div key={field} className="flex items-center">
                    {editState.field === field ? (
                        <input
                            type="text"
                            value={editState.value}
                            onChange={handleInputChange}
                            onBlur={handleSave}
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                            autoFocus
                            className="text-center w-16 border-b-2 border-blue-500 outline-none"
                        />
                    ) : (
                        <span className="cursor-pointer text-3xl font-bold" onClick={() => handleEditField(field)}>
                            {timeObj[field]}
                        </span>
                    )}
                    {index < 2 && <span>:</span>}
                </div>
            ))}
        </div>
    );
};