import React from 'react';

const DeptBasedEmps = ({base}) => {
    const {count, title} = base;
    
    return (
        <div>
            <h1> <span className='text-red-700'>{title}</span> -<span className='text-lime-600'>{count}</span> </h1>
            
        </div>
    );
};

export default DeptBasedEmps;