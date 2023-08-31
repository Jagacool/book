import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import axios from "axios";

const formvalidationSchema = yup.object({
    book_name: yup
        .string()
        .required().min(4),
    book_count: yup
        .number()
        .required(),
    author: yup
        .string()
        .required().min(4),
    description: yup
        .string()
        .required().min(5)
})

function AddBook() {
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const myFormik = useFormik({
        initialValues: {
            book_name: "",
            book_count: "",
            author: "",
            description: ""
        },
        validationSchema: formvalidationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.post(`https://638dfe2b4190defdb753283c.mockapi.io/books`, values);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
            navigate("/portal/book");
        },
    })

    return (
        <>
            <form className="container" onSubmit={myFormik.handleSubmit}>
                <div className="row mt-4 ps-5">
                    <div className="col-lg-5  mt-5 m-auto">
                        {/* Your input fields and form controls */}
                        {/* ... */}
                        <div className="d-sm-flex  justify-content-end mt-3">
                            <button disabled={isLoading} type="submit" className="btn btn-primary create-btn">
                                {isLoading ? "isLoading" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddBook;
