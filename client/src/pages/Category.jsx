import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormField from "../components/FormField";
import {
  createCategory,
  getCategoriesList,
} from "../services/category.services";
import { errorMessage, successMessage } from "../utils/utils";

const Category = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [categories, setCategories] = useState({
    records: [],
    count: 0,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
  });

  const initialValues = {
    name: "",
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await createCategory(values);
      if (result?.statusCode === 201) {
        setSubmitting(false);
        successMessage(result?.message);
        await getAllCategories();
        setIsShowForm(false);
      } else {
        errorMessage(result?.message);
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  const getAllCategories = async () => {
    const result = await getCategoriesList();
    setCategories(result?.data);
  };

  return (
    <div className="h-full">
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsShowForm(true)}
        >
          Add Category
        </button>
      </div>

      {isShowForm && (
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Add Category
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <FormField
                    label="Category Name"
                    name="name"
                    type="text"
                    placeholder="Enter category name"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {categories?.count > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>
              </tr>
            </thead>
            <tbody>
              {categories?.records?.map((category) => (
                <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap"
                  >
                    {category?.name}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isShowForm && (
          <div className="flex justify-center items-center h-full">
            <p className=" font-medium p-10">No categories found</p>
          </div>
        )
      )}
    </div>
  );
};

export default Category;
