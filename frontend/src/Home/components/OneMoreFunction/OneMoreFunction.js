import React from 'react';
import PleaseLogIn from '../../../features/utils/PleaseLogIn/PleaseLogIn';


const OneMoreFunction = () => {

    
let getData = async (callback) => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    callback(data);
}
let updateData = (someData) => {
    console.log('Page was sucessfully');
    console.log('Response: ');
    
     console.log(someData)
}

getData(updateData)
    return (
        <div>
            <PleaseLogIn />
        </div>
    );
};

export default OneMoreFunction;