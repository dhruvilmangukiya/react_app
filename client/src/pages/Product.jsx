import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FormField from "../components/FormField";
import { getCategoriesList } from "../services/category.services";
import { errorMessage, successMessage } from "../utils/utils";
import {
  createProduct,
  deleteProduct,
  getProductsList,
  updateProduct,
} from "../services/product.services.";

const Product = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [productId, setProductId] = useState("");
  const [initialValues, setInitialValues] = useState({
    description: "",
    amount: 0,
    category: "",
  });
  const [categories, setCategories] = useState({
    records: [],
    count: 0,
  });
  const [products, setProducts] = useState({
    records: [],
    count: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(3);

  const showTableValue = [
    {
      name: "description",
      label: "Description",
    },
    {
      name: "amount",
      label: "Amount",
    },
    {
      name: "category?.name",
      label: "Category",
    },
  ];

  const getNestedValue = (obj, path) => {
    return path.split("?.").reduce((acc, key) => acc?.[key], obj);
  };

  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required"),
    amount: Yup.number()
      .required("Amount is required")
      .min(1, "Amount must be at least 1"),
    category: Yup.string().required("Category is required"),
  });

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, [filter, currentPage]);

  const getAllCategories = async () => {
    const result = await getCategoriesList();
    setCategories(result?.data);
  };

  const getAllProducts = async () => {
    const skip = (currentPage - 1) * limit;
    const categoryQuery = filter ? `&category=${filter}` : "";
    const result = await getProductsList(
      `?skip=${skip}&limit=${limit}${categoryQuery}`
    );
    setProducts(result?.data);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = isEditMode
        ? await updateProduct(productId, values)
        : await createProduct(values);
      if ([201, 200].includes(result?.statusCode)) {
        setSubmitting(false);
        successMessage(result?.message);
        await getAllProducts();
        setIsShowForm(false);
        setIsEditMode(false);
        setProductId("");
        setInitialValues({
          description: "",
          amount: 0,
          category: "",
        });
      } else {
        errorMessage(result?.message);
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteProduct(id);
    if (result?.statusCode === 200) {
      successMessage(result?.message);
      await getAllProducts();
    } else {
      errorMessage(result?.message);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div
          className={`flex ${
            !isShowForm ? "justify-between" : "justify-end"
          }  items-center`}
        >
          {!isShowForm && (
            <div className="mt-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">All Categories</option>
                {categories?.records?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            disabled={isShowForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsShowForm(true)}
          >
            Add Product
          </button>
        </div>

        {isShowForm && (
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                {isEditMode ? "Edit" : "Add"} Product
              </h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <FormField
                      label="Description"
                      name="description"
                      type="text"
                      placeholder="Enter description"
                    />
                    <FormField
                      label="Amount"
                      name="amount"
                      type="number"
                      placeholder="Enter amount"
                    />
                    <Field
                      as="select"
                      name="category"
                      className="p-2 border w-full rounded"
                    >
                      <option value="" hidden>
                        Select Category
                      </option>
                      {categories?.records?.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="!mt-1 text-sm text-red-500"
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

        {products?.count > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                  {showTableValue.map((item, index) => (
                    <th scope="col" className="px-6 py-3">
                      {item?.label}
                    </th>
                  ))}
                  {["Edit", "Delete"].map((item) => (
                    <th scope="col" className="px-6 py-3">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products?.records?.map((product) => (
                  <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50">
                    {showTableValue.map((item, index) => (
                      <td className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap">
                        {getNestedValue(product, item.name)}
                      </td>
                    ))}

                    <td className="px-6 py-4">
                      <Link
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                        onClick={() => {
                          setIsEditMode(true);
                          setIsShowForm(true);
                          setProductId(product?._id);
                          setInitialValues({
                            description: product?.description,
                            amount: product?.amount,
                            category: product?.category?._id,
                          });
                        }}
                      >
                        Edit
                      </Link>
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        href="#"
                        className="font-medium text-red-600 hover:underline"
                        onClick={async () => handleDelete(product?._id)}
                      >
                        Delete
                      </Link>
                    </td>
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

      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={Math.ceil(products.count / limit)}
          previousLabel="< Prev"
          containerClassName="flex justify-center mt-4 space-x-2"
          pageClassName="px-3 py-1 border rounded"
          activeClassName="bg-blue-500 text-white"
          previousClassName="px-3 py-1 border rounded"
          nextClassName="px-3 py-1 border rounded"
        />
      </div>
    </div>
  );
};

export default Product;
