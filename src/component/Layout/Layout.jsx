
// layout component -- for centered layout basically it will define the width how much we will take

import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

function Layout(){



    return(
        <>
            <div className="max-w-7xl mx-auto px-4 bg-gray-900">
                <Header/>
                <main className="mt-6">
                    <Outlet/>
                </main>
                <div className="max-w-7xl p-8">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Layout