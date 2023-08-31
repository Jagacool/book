import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookReader, faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import the required icons
import { Card } from './Card';

/*cards datalist*/
export function CardList() {
    const cardData = [
        {
            title: "BORROWED",
            count: 150,
            colors: "success",
            icon: faBook
        },
        {
            title: "RETURNED",
            count: 30,
            colors: "warning",
            icon: faBookReader
        },
        {
            title: "VISITORS",
            count: 350,
            colors: "info",
            icon: faUsers,
        },
        {
            title: "NEW MEMBER",
            count: "58",
            colors: "primary",
            icon: faUserPlus
        }
    ];
    return (
        <div className='row'>
            {cardData.map((dt) => <Card data={dt} />)}
        </div>
    );
}

export default CardList;
