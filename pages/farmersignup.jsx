"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import logo from "../assets/logo.png";
import Image from "next/image";

function signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [pending, setPending] = useState(false);

  const onSubmit = async (data) => {
    try {
      setPending(true);
      const response = axios.post("/api/users/signup", {
        email: data.email,
        password: data.password,
        role: "farmer",
      });
      console.log(response);
      router.push("/login");
    } catch (err) {
      setPending(false);
      console.log(err);
    }
  };
  return (
    <div>
      <div className="bg-primary flex flex-col lg:flex-row  h-full lg:h-screen p-3 font-montserrat">
        <div className=" w-full lg:w-1/2 bg-grey-lighter flex rounded flex-col order-2 lg:order-1 bg-white">
          <div className="container w-full lg:w-4/6 mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded text-black w-full">
              <h1 className="mb-8 text-3xl text-center font-semibold">
                Welcome 👋
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex my-5 bg-gray-200 rounded-md p-3 items-center space-x-2">
                  <input
                    type="email"
                    id="name"
                    className="outline-none bg-transparent"
                    name="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                <div className="flex my-5 bg-gray-200 rounded-md p-3 items-center space-x-2">
                  <input
                    type="password"
                    id="password"
                    className="outline-none w-full bg-transparent"
                    name="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <button
                  type="submit"
                  className="w-full font-medium flex justify-between p-3 items-center  bg-primary text-center py-3 rounded bg-green text-white hover:bg-primary-600 focus:outline-none my-1"
                >
                  <h2>
                    {pending ? <span>Signing Up</span> : <span>Sign Up</span>}
                  </h2>
                </button>
              </form>

              <div className=" my-4 flex w-full justify-between">
                <h2>Have an account?</h2>
                <Link
                  href="/login"
                  className="flex text-lg font-medium text-blue-700 items-center space-x-2"
                >
                  <h2>Log In</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full lg:w-1/2 order-1 flex items-center lg:order-2 justify-center">
          <Image
            src={logo}
            className="w-48 my-5 lg:w-80 bg-white rounded-full"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default signup;
