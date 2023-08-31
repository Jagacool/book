import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
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

function BorrowBook() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const details = await axios.get(`https://638dfe2b4190defdb753283c.mockapi.io/books/${params.id}`);
        // Set your formik values here
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [params.id]); // Include params.id in the dependency array

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
        await axios.put(`https://638dfe2b4190defdb753283c.mockapi.io/books/${params.id}`, values);
      } catch (error) {
        console.log(error);
      }
      navigate('/portal/book');
    },
  });

  return (
    <form className="container" onSubmit={myFormik.handleSubmit}>
      <div className="row mt-4 ps-5">
        <div className="col-lg-5 mt-5 m-auto">
          {/* Form content */}
          {/* ... */}
          <button disabled={isLoading} type="submit" className="btn btn-primary create-btn">
            {isLoading ? 'Loading...' : 'Update'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default BorrowBook;
