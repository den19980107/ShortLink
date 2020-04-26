import React from 'react';
import Card from './Card';
const loginMethods = ["facebook", "google"]

const CardList = () => {
    return (
        <div>
            {loginMethods.map((method, indx) => {
                return <Card key={indx} type={method}></Card>
            })}
        </div>
    );
};

export default CardList;