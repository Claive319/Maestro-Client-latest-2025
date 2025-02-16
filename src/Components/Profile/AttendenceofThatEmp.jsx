import React from 'react';

const AttendenceofThatEmp = ({ attendances }) => {
    const groupedAttendances = {};

    // Grouping attendances by day_of_attendence
    attendances.forEach(att => {
        const { day_of_attendence } = att;
        if (!groupedAttendances[day_of_attendence]) {
            groupedAttendances[day_of_attendence] = [];
        }
        groupedAttendances[day_of_attendence].push(att);
    });
    return (
        <>
            {Object.keys(groupedAttendances).map((day) => {
                const dayAttendances = groupedAttendances[day];
                return dayAttendances.map((att, index) => {
                    const formattedInTime = new Date(att.in_Time).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    });
                

                    const formattedOutTime = new Date(att.out_Time).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    });

                    return (
                        <tr key={`${day}-${index}`} className='border-2'>
                            {/* Merging day_of_attendence cell using rowSpan */}
                            {index === 0 && (
                                <td rowSpan={dayAttendances.length} className='border-2 px-10 text-center font-bold align-middle'>
                                    {day}
                                </td>
                            )}
                            <td className='border-2 px-20 text-center py-10 text-lg font-semibold'>{formattedInTime}</td>
                            <td className='border-2 px-20 text-center py-10 text-lg font-semibold'>{formattedOutTime}</td>
                        </tr>
                    );
                });
            })}
        </>
    );
};

export default AttendenceofThatEmp;