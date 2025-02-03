import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Schedule = ({ sch }) => {
    const { name,  } = sch;
    const getnames= name; 

    const [catchNames, setCatchNames] = useState([]);
    const [matchedNames, setMatchedNames] = useState([]);

    useEffect(() => {
        if (getnames) {
            
            const justNamesGrabber = [sch].filter(nname => nname.name === getnames);
            setCatchNames(justNamesGrabber);
        } else {
            setCatchNames(name); 
        }
    }, [getnames, sch]);

    useEffect(() => {
        if (catchNames.length > 0) {
            const keepOneNameContainer = catchNames.filter(nam => nam.name === getnames);
            setMatchedNames(keepOneNameContainer);
        } else {
            setMatchedNames([sch]); 
        }
    }, [catchNames, sch]);
    return (
        <tr>
           
            {matchedNames.map((item, index) => (
                <td key={index} className="border-2 text-center px-10">
                    {item.name} 
                </td>
            ))}
            {matchedNames.map((item, index) => (
                <td key={index} className="border-2 text-center px-12">{item.name}</td>
            ))}
           
   
        </tr>
    );
};

export default Schedule;