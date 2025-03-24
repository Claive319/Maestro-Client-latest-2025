import React from 'react';

const Echandedempdatashow = ({exch}) => {
    const {employee_to_be_switch,employee_to_be_switch_with} = exch
    return (
        <div>
            <h1 className='text-2xl text-center font-bold mb-6 '><span className='text-red-600'>{employee_to_be_switch}</span> switched Shift with <span className='text-red-600'>{employee_to_be_switch_with}</span> </h1>
        </div>
    );
};

export default Echandedempdatashow;