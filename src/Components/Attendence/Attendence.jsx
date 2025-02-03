import { useEffect, useState } from "react";

const Attendence = ({ att }) => {
    const { id, name, in_Time, out_Time,duration } = att;
    
    
    // const dutyHour = {formattedOutTime}- {formattedInTime}
    // const dutyHour = formattedOutTime- formattedInTime;
    // const dutyHour = parseInt(formattedOutTime2 - formattedInTime1)  ;


    // const formattedInTime1 = new Date(in_Time).toLocaleTimeString('en-GB', {
    //     hour: '2-digit',
    //     minute: '2-digit'
    //   });
    //   const formattedOutTime2 = new Date(out_Time).toLocaleTimeString('en-GB', {
    //     hour: '2-digit',
    //     minute: '2-digit'
    //   });

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

    return (
        <tr>
            <td className="border-2 px-10">{id}</td>
            <td className="border-2 px-10">{duration}</td>
            <td className="border-2 text-center">{name}</td>
            <td className="border-2 text-center px-12">{formattedInTime}</td>
            <td className="border-2 text-center px-12">{formattedOutTime}</td>
            {/* <td className="border-2 text-center px-12">{dutyHour}</td> */}
            

        </tr>
    );
};

export default Attendence;