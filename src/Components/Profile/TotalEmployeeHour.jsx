import React from 'react';

const TotalEmployeeHour = ({total}) => {
    const {name, Month_name, total_hours}= total
    return (
        <div>
            <h1 className='text-2xl font-extrabold text-center'><span className='text-red-600'>{name}'s </span> <span className='text-lime-600'>{Month_name}'s</span> total duty hour was <span className='text-orange-700'>{total_hours}</span> hours</h1>
        </div>
    );
};

export default TotalEmployeeHour;