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
});

function EditBooks() {
  const [isLoading, setLoading] = useState(false);
  const params = useParams();

  const getUsers = async () => {
    try {
      setLoading(true);
      const details = await axios.get(`https://638dfe2b4190defdb753283c.mockapi.io/books/${params.id}`);
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
    },
    validationSchema: formvalidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`https://638dfe2b4190defdb753283c.mockapi.io/books/${params.id}`, values);
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
        <div className="col-lg-5  mt-5 m-auto">
          {/* Form content */}
          <input
            type="text"
            className={`form-control ${myFormik.touched.book_name && myFormik.errors.book_name ? 'is-invalid' : 'is-valid'}`}
            value={myFormik.values.book_name}
            name="book_name"
            placeholder="Name"
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
          />
          {/* ...other input fields */}
          <button disabled={isLoading} type="submit" className="btn btn-primary create-btn">
            {isLoading ? 'Loading...' : 'Update'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditBooks;
