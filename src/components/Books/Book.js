import React, { useState, useEffect, useContext, useMemo } from 'react'
import Booklist from './BooksList';
import { Link } from "react-router-dom"
import axios from "axios";
import LoginContext from '../Context/LoginContext';

function Book() {
    const [isLoading, setLoading] = useState(true);
    const logindata = useContext(LoginContext);
    const [bookdata, setbookData] = useState([]);
    const [search, setSearch] = useState("");
    
    const handlesearch = (data, search) => {
        const filteredData = data.filter((d) => {
            d.book_name = d.book_name.toLowerCase();
            if (d.book_name.includes(search)) {
                return true;
            }
            return false;
        });
        return filteredData;
    }
    
    const filteredData = useMemo(() => handlesearch(bookdata, search), [bookdata, search]);

    useEffect(() => {
        getUsers();
    }, []); // No dependencies required here since this runs only once

    let getUsers = async () => {
        try {
            const users = await axios.get("https://638dfe2b4190defdb753283c.mockapi.io/books");
            setbookData(users.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const DeleteBook = async (id) => {
        const confirm = window.confirm("Do you want to delete this record?")

        if (confirm) {
            await axios.delete(`https://638dfe2b4190defdb753283c.mockapi.io/books/${id}`);
            getUsers();
        }
    };

    return (
        <>
            {/* Your JSX */}
        </>
    )
}

export default Book;
