import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const formvalidationSchema = yup.object({
  book_name: yup.string().required().min(4),
  book_count: yup.number().required(),
  author: yup.string().required().min(4),
  description: yup.string().required().min(5),
  name: yup.string().required().min(4),
  id: yup.number().required(),
  email: yup.string().required(),
  contact: yup.number().required(),
});

function ReturnBook() {
  const [isLoading, setLoading] = useState(false);
  const [bookCount, setBookCount] = useState();
  const params = useParams();

  const getUsers = async () => {
    try {
      const details = await axios.get(
        `https://638dfe2b4190defdb753283c.mockapi.io/books/${params.id}`
      );
      setBookCount(details.data.book_count);
      myFormik.setValues(details.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []); // Include getUsers in the dependency array

  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      book_name: '',
      book_count: '',
      author: '',
      description: '',
      name: '',
      id: '',
      email: '',
      contact: '',
    },
    validationSchema: formvalidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(
          `https://638dfe2b4190defdb753283c.mockapi.io/books/${params.id}`,
          values
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      navigate('/portal/book');
    },
  });

  return (
    <form className="container" onSubmit={myFormik.handleSubmit}>
      <div className="row mt-4 ps-5">
        <div className="col-lg-5  mt-5 ">
          <h3>Enter Your Details:</h3>
          {/* Input fields for user details */}
          {/* Example: */}
          <input
            type="text"
            className={`form-control ${
              myFormik.touched.name && myFormik.errors.name ? 'is-invalid' : ''
            }`}
            value={myFormik.values.name}
            name="name"
            placeholder="Name"
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
          />
          {/* ...other input fields for user details */}
        </div>
        <div className="col-lg-5  m-5">
          <h3>Book Details:</h3>
          {/* Input fields for book details */}
          {/* Example: */}
          <input
            type="text"
            className={`form-control ${
              myFormik.touched.book_name && myFormik.errors.book_name
                ? 'is-invalid'
                : ''
            }`}
            value={myFormik.values.book_name}
            name="book_name"
            placeholder="Book Name"
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
          />
          {/* ...other input fields for book details */}
          <div className="d-sm-flex  justify-content-end mt-3">
            <button
              disabled={isLoading}
              onClick={() => {
                myFormik.setValues({
                  ...myFormik.values,
                  book_count: bookCount + 1,
                });
                myFormik.handleSubmit();
              }}
              type="submit"
              className="btn btn-primary create-btn"
            >
              {isLoading ? 'Loading...' : 'Return'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ReturnBook;
