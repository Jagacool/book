import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookView() {
    const params = useParams();
    const [books, setBooks] = useState([]); // Change variable name to 'books'

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(`https://638dfe2b4190defdb753283c.mockapi.io/Teacher/${params.id}`);
                setBooks(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getUsers();
    }, [params.id]);

    return (
        <div>
            {/* Use 'books' instead of 'details' in your component */}
            <div className="card-header text-center text-uppercase">
                <strong>{books.name}</strong>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Email: {books.email}</li>
                <li className="list-group-item">Contact: {books.contact}</li>
                <li className="list-group-item">Address: {books.address}</li>
            </ul>

            <div className="d-sm-flex justify-content-end mt-3">
                <Link to="/portal/member" className="btn btn-sm btn-primary shadow-sm">BACK</Link>
            </div>
            {/* Rest of your component code */}
        </div>
    );
}

export default BookView;
