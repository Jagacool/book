import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookView() {
    const params = useParams();
    const [details, setBookData] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get(`https://638dfe2b4190defdb753283c.mockapi.io/books/${params.id}`);
            setBookData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container py-5 h-100 ">
            {/* ... your component code */}
        </div>
    );
}

export default BookView;
