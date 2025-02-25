import React from 'react';

const AttendenceofThatEmp = ({ attendances, index }) => {
    const { in_Time, out_Time } = attendances;

    // Formatting the time
    const formattedInTime = new Date(in_Time).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const formattedOutTime = new Date(out_Time).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    // Apply conditional styling: First row is white, even rows get blue
    const rowClass = (index + 1) % 2 === 0
        ? "bg-[#e3edf9] rounded-[6px]"
        : "bg-white";

    return (
        <tr className={` ${rowClass}`}>
            <td className=" text-center py-10 px-20">{formattedInTime}</td>
            <td className=" text-center py-10 px-20">{formattedOutTime}</td>
        </tr>
    );
};

export default AttendenceofThatEmp;


