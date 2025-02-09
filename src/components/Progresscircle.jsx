import React from "react";

export const ProgressCircle = ({ time, initialTime, children }) => {
    const radius = 90; // Circle radius
    const circumference = 2 * Math.PI * radius; // Full stroke length
    const progress = (time / initialTime) * 100; // Progress percentage
    const strokeDashoffset = circumference * (1 - progress / 100); // Stroke offset

    return (
        <svg width="220" height="220" viewBox="0 0 220 220">
            {/* Background Circle */}
            <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="#1e3a8a"
                strokeWidth="10"
                fill="none"
                opacity="0.3"
            />
            {/* Progress Circle */}
            <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="#3b82f6"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 110 110)"
            />
            
            {/* Custom Content */}
            <foreignObject x="50" y="85" width="150" height="70">
                <div 
                    className="flex items-center justify-center text-white font-bold text-3xl"
                    xmlns="http://www.w3.org/1999/xhtml"
                >
                    {children}
                </div>
            </foreignObject>
        </svg>
    );
};
