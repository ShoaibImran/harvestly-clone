import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function contact() {
  return (
    <>
      <div className="background-contact">
        <Navbar />
        <div className="text-center mt-36">
          <h1 className="text-8xl text-white font-extrabold">
            <span className="bg-primary py-1 px-2 mr-2 leading-8">CONTACT</span>
            US
          </h1>
        </div>
      </div>
      <div>
        <section class="bg-white">
          <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 class="mb-4 text-6xl tracking-tight font-extrabold text-center text-gray-900">
              Contact Us
            </h2>
            <p class="font-montserrat font-medium mb-8 lg:mb-16 text-center text-gray-500 sm:text-xl">
              Got a issue? Want to send feedback about a beta feature? Need
              details about our Business plan? Let us know.
            </p>
            <form action="#" class="space-y-8">
              <div>
                <label
                  htmlFor="email"
                  class="text-2xl block mb-2 font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  class="text-2xl block mb-2 font-medium text-gray-900"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm "
                  placeholder="Let us know how we can help you"
                  required
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  htmlFor="message"
                  class="block mb-2 text-2xl font-medium text-gray-900"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 "
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="py-3 px-5 text-2xl font-medium text-center rounded-lg bg-primary sm:w-fit focus:ring-4 focus:outline-none "
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
