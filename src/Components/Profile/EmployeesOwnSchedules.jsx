import React from 'react';

const EmployeesOwnSchedules = ({ sch }) => {
    const groupedSchedules = {};

    sch.forEach(att => {
        const { name } = att;
        if (!groupedSchedules[name]) {
            groupedSchedules[name] = [];
        }
        groupedSchedules[name].push(att);
    });
    return (
        <>
            {Object.keys(groupedSchedules).map((day) => {
                const daySchedules = groupedSchedules[day];
                return daySchedules.map((att, index) => (
                    <tr key={`${day}-${index}`} className='border-2'>
                        {/* Merging day_of_attendence cell using rowSpan */}
                        {index === 0 && (
                            <td rowSpan={daySchedules.length} className='border-2 px-10 text-center font-bold align-middle'>
                                {day}
                            </td>
                        )}
                        <td className='border-2 px-20 text-center py-10 text-lg font-semibold'>{att.From_t}</td>
                        <td className='border-2 px-20 text-center py-10 text-lg font-semibold'>{att.To_t}</td>
                    </tr>
                ));
            })}
        </>
    );
};

export default EmployeesOwnSchedules;