import React from 'react';

const AverageAttendence = ({ att }) => {
    const { Average_Duty_Hour, name, department, Designation_title , title} = att
    return (
        <tr>
            
            <td className="border-2 px-10">{name}</td>
            
            <td className="border-2 text-center">{title}</td>
            <td className="border-2 text-center">{Designation_title}</td>
            <td className="border-2 px-10">{Average_Duty_Hour}</td>
            
            
           
            {/* <td className="border-2 text-center px-12">{dutyHour}</td> */}


        </tr>
    );
};

export default AverageAttendence;