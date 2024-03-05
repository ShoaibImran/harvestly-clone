"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function product() {
  const error = () => toast.error("Some unexpected error occured");
  const productUpdated = () => toast.success("Product updated successfully!");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [image, setImage] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [productStock, setProductStock] = useState("");

  const router = useRouter();

  const getProductDetails = async (productId) => {
    try {
      const userId = localStorage.getItem("_id");
      const reponse = await axios.get(
        `/api/products/getProduct?userId=${userId}&productId=${productId}`
      );
      setProduct(reponse.data);
      setProductName(reponse.data.name);
      setProductDescription(reponse.data.description);
      setProductPrice(reponse.data.price);
      setImage(reponse.data.image);
      setProductStock(reponse.data.stock);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const productId = router.query.product;
      getProductDetails(productId);
    }
  }, [router.isReady]);

  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setProfilePicture(reader.result);
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem("_id");
      const response = await axios.put("/api/products/putProduct", {
        userId,
        productId: product._id,
        productName: data.productName,
        productDescription: data.productDescription,
        productPrice: data.productPrice,
        productImage: profilePicture,
        productStock: data.productStock,
      });
      if ((response.status = 200)) {
        productUpdated();
      }
    } catch (err) {
      error();
      console.log(err);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden max-h-screen font-montserrat">
        <SideBar />
        <main className="ml-60 max-h-screen overflow-auto">
          <div className="p-12">
            <h1 className="text-3xl font-bold pb-8">Edit Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <label
                htmlFor="subject"
                className="text-2xl block mb-2 font-medium text-gray-900"
              >
                Product Image
              </label>
              <input type="file" accept="image/*" onChange={convertToBase64} />
              <Image
                src={profilePicture || image}
                width={200}
                height={200}
                className="mt-4"
                alt="img"
              />
              <div>
                <label
                  htmlFor="subject"
                  className="text-2xl block mb-2 font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  defaultValue={productName}
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                  placeholder="for eg. Harvestly Farms"
                  {...register("productName", {
                    required: "Name is required",
                  })}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-2xl font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  value={productDescription}
                  id="message"
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 "
                  placeholder="Tell users more about your farm"
                  {...register("productDescription", {
                    required: "Description is required",
                  })}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="text-2xl block mb-2 font-medium text-gray-900"
                >
                  Price
                </label>
                <input
                  defaultValue={productPrice}
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                  placeholder="Contact"
                  {...register("productPrice", {
                    required: "Price is required",
                  })}
                />
                <label
                  htmlFor="subject"
                  className="text-2xl block mb-2 mt-8 font-medium text-gray-900"
                >
                  Stock Avaliable
                </label>
                <input
                  value={productStock}
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                  placeholder="Contact"
                  {...register("productStock", {
                    required: "Stock is required",
                  })}
                />
              </div>

              <button
                type="submit"
                className="py-3 px-5 text-2xl font-medium text-center rounded-lg bg-primary sm:w-fit focus:ring-4 focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
        </main>
        <ToastContainer />
      </div>
    </>
  );
}

export default product;
