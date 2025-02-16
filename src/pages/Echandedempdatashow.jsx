import React from 'react';

const Echandedempdatashow = ({exch}) => {
    const {employee_to_be_switch,employee_to_be_switch_with} = exch
    return (
        <div>
            <h1 className='font-extrabold text-3xl text-center'><span className='text-red-600'>{employee_to_be_switch}</span> switched Shift with <span className='text-red-600'>{employee_to_be_switch_with}</span> </h1>
        </div>
    );
};

export default Echandedempdatashow;