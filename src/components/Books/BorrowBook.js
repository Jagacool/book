import { useFormik } from 'formik';
import React, { useEffect } from 'react';
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
  const params = useParams();

  useEffect(() => {
  const getUsers = async () => {
    try {
      const details = await axios.get(`https://638dfe2b4190defdb753283c.mockapi.io/books/${params.id}`);
      myFormik.setValues(details.data);
    } catch (error) {
      console.log(error);
    }
  };
    getUsers();
  }, [getUsers]);

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
        {/* Form content */}
        {/* ... */}
      </div>
    </form>
  );
}

export default BorrowBook;
