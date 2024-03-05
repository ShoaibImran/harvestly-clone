"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IoMenu } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setEmail, setProfilePic } from "@/store/slices/userSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { status, data: session } = useSession();
  if (typeof window !== "undefined") {
    localStorage.setItem("_id", session?.user?.sub);
    sessionStorage.setItem("_id", session?.user?.sub);
  }

  const [isOpen, setIsOpen] = useState(false);
  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () => {
    await signOut();
    localStorage.clear();
    sessionStorage.clear();
  };

  useEffect(() => {
    if (session && status == "authenticated") {
      dispatch(setEmail(session?.user?.email));
    }
  }, []);

  return (
    <>
      <div className="flex justify-between md:px-16 px-4 pt-6">
        <Link className="flex" href="/">
          <Image src={logo} width={100} height={100} />
        </Link>
        <div className="md:block hidden text-3xl mt-6 font-bold">
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/aboutus" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:underline">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-3 md:block hidden">
          {status === "unauthenticated" ? (
            <div className="flex gap-4">
              <button className="py-3 px-4 bg-[#5BBC1C] rounded-full text-white font-medium">
                <Link href="/login" className="text-3xl">
                  Login
                </Link>
              </button>
            </div>
          ) : (
            <div>
              <div onClick={handleMenuClick}>
                <IoMenu size={40} className="cursor-pointer" />
              </div>
              {isOpen && (
                <div className="bg-white absolute p-4 rounded-md text-2xl space-y-4">
                  <ul>
                    <li>
                      <Link href="/farmer/profile">Farmer </Link>
                    </li>
                    <hr />
                    <li>
                      <Link href="/user/profile">User</Link>
                    </li>
                    <hr />
                    <li>
                      <button onClick={handleLogOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
