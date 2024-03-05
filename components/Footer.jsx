import Image from "next/image";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <>
      <footer className="shadow mt-16">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href=""
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Image src={logo} width={70} height={70} className=""></Image>
              <span className="self-center text-4xl font-semibold whitespace-nowrap">
                Harvestly
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-xl font-medium text-gray-700 sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />
          <span className="block text-xl text-gray-700 sm:text-center">
            © 2023{" "}
            <a href="#" className="hover:underline">
              Harvestly™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
