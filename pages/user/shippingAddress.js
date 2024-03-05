import UserSideBar from "@/components/UserSideBar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

function shippingAddress() {
  const addressAdded = () => toast.success("Address added successfully!");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [zipCode, setZipCode] = useState("");

  const onSubmit = async (data) => {
    try {
      const userId = localStorage.getItem("_id");
      const response = await axios.post("/api/users/address/postAddress", {
        userId,
        street: data.street,
        city: data.city,
        state: data.state,
        phoneNo: data.phoneNo,
        zipCode: data.zipCode,
      });
      if ((response.status = 200)) {
        alert("Address added successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAddress = async () => {
    try {
      const userId = localStorage.getItem("_id");
      const response = await axios.get("/api/users/address/getAddress", {
        params: {
          userId: userId,
        },
      });
      setStreet(response.data?.data?.street);
      setCity(response.data?.data?.city);
      setState(response.data?.data?.state);
      setPhoneNo(response.data?.data?.phoneNo);
      setZipCode(response.data?.data?.zipCode);
    } catch (err) {
      console.log(err);
    }
  };

  getAddress();
  return (
    <>
      <div className="relative overflow-hidden max-h-screen font-montserrat">
        <UserSideBar />
        <main className="ml-60 max-h-screen overflow-auto p-12">
          <h1 className="text-3xl font-bold ">Shipping Address</h1>
          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label
                  htmlFor="subject"
                  className="text-2xl block mb-2 font-medium text-gray-900"
                >
                  Street Address
                </label>
                <input
                  defaultValue={street}
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm"
                  placeholder="for eg. Harvestly Farms"
                  required
                  {...register("street", {
                    required: "Street Address is required",
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="text-2xl block mb-2 font-medium text-gray-900"
                >
                  City
                </label>
                <input
                  defaultValue={city}
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                  placeholder="Contact"
                  required
                  {...register("city", {
                    required: "City is required",
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="text-2xl block mb-2 font-medium text-gray-900"
                >
                  State
                </label>
                <input
                  defaultValue={state}
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                  placeholder="Contact"
                  required
                  {...register("state", {
                    required: "State is required",
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="text-2xl block mb-2 font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  defaultValue={phoneNo}
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                  placeholder="Contact"
                  required
                  {...register("phoneNo", {
                    required: "Phone Number is required",
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="text-2xl block mb-2 font-medium text-gray-900"
                >
                  Zip Code
                </label>
                <input
                  defaultValue={zipCode}
                  type="text"
                  id="subject"
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                  placeholder="Contact"
                  required
                  {...register("zipCode", {
                    required: "Zip Code is required",
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

export default shippingAddress;
