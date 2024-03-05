import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";

export default function products() {
    return (
        <>
            <section>
                <div className="background-products">
                    <Navbar />
                    <div className="text-center mt-36">
                        <h1 className="text-8xl text-white font-extrabold">
                            <span className="bg-primary py-1 px-2 mr-2 leading-8">Browse</span>
                            PRODUCTS
                        </h1>
                    </div>
                </div>

                {/* BODY */}
                <div>
                    <Products />
                </div>

                <div>
                    <Footer />
                </div>
            </section>
            

        </>
    )
}
