import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
const BorrowBook = () => {
  const [bookCount, setBookCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getUsers();
  }, [bookCount, getUsers]);
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await axios.post("/api/books/borrow", values);
      setBookCount(bookCount - 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <h1>Borrow Book</h1>
      <Formik
        initialValues={{
          book_count: bookCount,
          author: "",
          description: "",
        }}
        validationSchema={Yup.object({
          book_count: Yup.number()
            .min(1)
            .max(bookCount)
            .required("Book count is required"),
          author: Yup.string().required("Author is required"),
          description: Yup.string().required("Description is required"),
        })}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="book_count">Book Count</label>
            <Field
              type="number"
              className={`form-control ${myFormik.touched.book_count &&
