import React from 'react';

const EmployeesOwnSchedules = ({sch}) => {
    const {From_t, To_t, name } = sch
    return (
        <div className='card shadow-2xl mx-auto text-center mt-10 pb-8 p-6'>
            <h1 className='font-extrabold text-3xl text-gray-900'>{name}'s Schedule</h1>
            <p>Duty Hour : {From_t}-{To_t}</p>
            
        </div>
    );
};

export default EmployeesOwnSchedules;