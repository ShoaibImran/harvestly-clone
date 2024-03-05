"use client";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

function products() {
  const productDeleted = () => toast.error("Product deleted successfully!");
  const [products, setProducts] = useState([]);
  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem("_id");
      const response = await axios.get("/api/users/getUserDetails", {
        params: {
          userId: userId,
        },
      });
      setProducts(response.data?.user?.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const userId = localStorage.getItem("_id");
      const response = await axios.delete("/api/products/deleteProduct", {
        data: {
          userId,
          productId: productId,
        },
      });
      if (response.status === 200) {
        productDeleted();
        getUserDetails();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="relative overflow-hidden max-h-screen font-montserrat">
        <SideBar />
        <main className="ml-60 max-h-screen overflow-auto">
          <div className="p-12">
            <Link href="/farmer/products/new">
              <button
                href="/farmer/products/new"
                className="flex gap-2 bg-primary p-2 rounded-lg font-medium"
              >
                New Product
                <span className="mt-1">
                  <FaPlus />
                </span>
              </button>
            </Link>
            <div className="p-12">
              <h1 className="text-4xl font-extrabold">Products</h1>
              <div className="mt-8">
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  {products.map((product) => (
                    <tbody key={product._id}>
                      <tr>
                        <td className="border px-4 py-2">{product.name}</td>
                        <td className="border px-4 py-2">${product.price}</td>
                        <td className="border px-4 py-2 flex gap-3">
                          <Link href={`/farmer/products/${product._id}`}>
                            <CiEdit size={30} color="green" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <MdDeleteForever size={30} color="red" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </main>
        <ToastContainer />
      </div>
    </>
  );
}

export default products;
