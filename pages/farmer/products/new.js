import SideBar from "@/components/SideBar";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewProduct() {
  const error = () => toast.error("Some unexpected error occured");
  const productAdded = () => toast.success("Product created successfully!");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");

  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem("_id");
      const response = axios.post("/api/products/newProduct", {
        userId,
        productName: data.productName,
        productDescription: data.productDescription,
        productPrice: data.productPrice,
        productStock: data.productStock,
      });
      if ((response.status = 200)) {
        productAdded();
      }
    } catch (err) {
      error();
      console.log(err);
    }
  };
  return (
    <div className="relative overflow-hidden max-h-screen font-montserrat">
      <SideBar />
      <main className="ml-60 max-h-screen overflow-auto">
        <div className="p-12">
          <h1 className="text-3xl font-bold pb-8">New Product</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label
                htmlFor="subject"
                class="text-2xl block mb-2 font-medium text-gray-900"
              >
                Name
              </label>
              <input
                defaultValuevalue={productName}
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                placeholder="for eg. Harvestly Farms"
                {...register("productName", { required: "Name is Required" })}
              />
              {errors.productName && (
                <p className="text-red-500 mt-2 ml-2">
                  {errors.productName.message}
                </p>
              )}
            </div>
            <div class="sm:col-span-2">
              <label
                htmlFor="message"
                class="block mb-2 text-2xl font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                defaultValuevalue={productDescription}
                id="message"
                rows="6"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 "
                placeholder="Tell users more about your farm"
                {...register("productDescription", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.productDescription && (
                <p className="text-red-500 mt-2 ml-2">
                  {errors.productDescription.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="subject"
                class="text-2xl block mb-2 font-medium text-gray-900"
              >
                Price
              </label>
              <input
                defaultValue={productPrice}
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                placeholder="$300"
                {...register("productPrice", { required: "Price is required" })}
              />
              {errors.productPrice && (
                <p className="text-red-500 mt-2 ml-2">
                  {errors.productPrice.message}
                </p>
              )}
              <label
                htmlFor="subject"
                class="text-2xl mt-8 block font-medium text-gray-900"
              >
                Stock Avaliable
              </label>
              <input
                defaultValue={productStock}
                type="text"
                id="subject"
                class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                placeholder="qty."
                {...register("productStock", { required: "Stock is required" })}
              />
              {errors.productStock && (
                <p className="text-red-500 mt-2 ml-2">
                  {errors.productStock.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              class="py-3 px-5 text-2xl font-medium text-center rounded-lg bg-primary sm:w-fit focus:ring-4 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default NewProduct;
