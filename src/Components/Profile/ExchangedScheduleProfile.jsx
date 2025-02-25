import React from 'react';

const ExchangedScheduleProfile = ({ exch }) => {
    const { exchanged_date, employee_to_be_switch, employee_to_be_switch_with } = exch
    return (
        <tr className="border-2">
            <td className="border-2 px-20 py-10 text-center w-[300px]">{exchanged_date}</td>
            <td className="border-2 text-center">{employee_to_be_switch}</td>
            
            <td className="border-2 text-center">{employee_to_be_switch_with}</td>
            
        </tr>
    );
};

export default ExchangedScheduleProfile;