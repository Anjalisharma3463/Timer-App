import React, { useState, useEffect } from "react";
import { Control } from "./Control";
import { ProgressCircle } from "./Progresscircle";
import {TimeDisplay} from  "./TimeDisplay";

export const Timer = () => {
    const [initialTime, setInitialTime] = useState(300); // Default: 5 minutes (300 sec)
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [editState, setEditState] = useState({ field: null, value: "" });
    const [savedTime, setSavedTime] = useState(initialTime);

    // Convert seconds to hours, minutes, and seconds
    const ConvertsecTotimer = (time) => {
        const hrs = String(Math.floor(time / 3600)).padStart(2, "0");
        const min = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
        const sec = String(time % 60).padStart(2, "0");

        return { hrs, min, sec };
    };

    // Timer controls
    const Startfunction = () => setIsRunning(true);
    const Pausefunction = () => setIsRunning(false);
    const Resetfunction = () => {
        setIsRunning(false);
        setTime(savedTime);
    };

    // Timer countdown logic
    useEffect(() => {
        if (isRunning && time > 0) {
            const interval = setInterval(() => setTime((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, time]);

    // Handle field click (to switch to edit mode)
    const handleEditField = (field) => {
        setEditState({ field, value: ConvertsecTotimer(time)[field] });
    };

    // Handle input change
    const handleInputChange = (e) => {
        const newValue = e.target.value.replace(/\D/g, "").slice(0, 2); // Allow only numbers
        setEditState((prev) => ({ ...prev, value: newValue }));
    };

    const handleSave = () => {
        const timeObject = ConvertsecTotimer(time);
        timeObject[editState.field] = editState.value;

        const newTotalSeconds =
            parseInt(timeObject.hrs) * 3600 +
            parseInt(timeObject.min) * 60 +
            parseInt(timeObject.sec);
        
        setSavedTime(newTotalSeconds);
        setTime(isNaN(newTotalSeconds) ? 0 : newTotalSeconds);
        setEditState({ field: null, value: "" });
    };

    return (
        <div className='flex flex-col text-white items-center justify-center w-70 sm:w-100 h-100 rounded-lg bg-[#1e293b]' >
            {/* Progress Circle (Now it wraps TimeDisplay) */}
            <ProgressCircle time={time} initialTime={savedTime} >
                <TimeDisplay
                    time={time}
                    editState={editState}
                    handleEditField={handleEditField}
                    handleInputChange={handleInputChange}
                    handleSave={handleSave}
                    ConvertsecTotimer = {ConvertsecTotimer}
                />
            </ProgressCircle>

            {/* Timer controls */}
            <div className="flex mt-4 space-x-4">
                <Control Timerfunction={isRunning ? Pausefunction : Startfunction} buttonTitle={isRunning ? "Pause" : "Start"} />
                <Control Timerfunction={Resetfunction} buttonTitle="Reset" />
            </div>
        </div>
    );
};
