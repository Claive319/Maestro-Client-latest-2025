import React from 'react';

const EachAttendance = ({ employee = [] }) => {
  // Ensure we have an array; if employee is an object, convert it
  const employeeArray = Array.isArray(employee)
    ? employee
    : Object.values(employee);

  // Group attendance records by date
  const groupedByDate = {};
  employeeArray.forEach((att) => {
    const { date } = att;
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(att);
  });

  return (
    <>
      {Object.keys(groupedByDate).map((date) => (
        <React.Fragment key={date}>
          {/* Render date header spanning all columns */}
          <tr className="bg-gray-300">
            <td colSpan={4} className="text-center font-bold py-4 text-lg">
              {date}
            </td>
          </tr>
          {groupedByDate[date].map((att, index) => {
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

            // Apply alternating row colors
            const rowClass = (index + 1) % 2 === 0 ? "bg-[#e3edf9] rounded-[6px]" : "bg-white";

            return (
              <tr key={`${date}-${att.name}-${index}`} className={`border-2 ${rowClass}`}>
                <td className="border-2 px-10 text-center font-bold align-middle">
                  {att.name || "N/A"}
                </td>
                <td className="border-2 px-20 text-center py-10 text-lg font-semibold">
                  {formattedInTime || "N/A"}
                </td>
                <td className="border-2 px-20 text-center py-10 text-lg font-semibold">
                  {formattedOutTime || "N/A"}
                </td>
              </tr>
            );
          })}
        </React.Fragment>
      ))}
    </>
  );
};


export default EachAttendance;
