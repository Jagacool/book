import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Add this import
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
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-9">
                    <h2 className='m-auto' style={{ textAlign: "center" }}>BOOK DETAILS</h2>
                    <div className="card m-auto mt-3" style={{ width: "30rem" }}>
                        <div className="card-header text-center text-uppercase">
                            <strong>{details.book_name}</strong>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Author : {details.author}</li>
                            <li className="list-group-item">Count : {details.book_count}</li>
                            <li className="list-group-item">Description : {details.description}</li>
                        </ul>
                    </div>
                    <div className="d-sm-flex  justify-content-end mt-3">
                        <Link to="/portal/book" className="btn btn-sm btn-primary shadow-sm">BACK</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookView;
