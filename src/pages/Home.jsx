import Features from "../component/Features/Features";
import Hero from "../component/Hero/Hero";
import LandingCTA from "../component/Hero/LandingCTA";

function Home(){


    return(
        <>
            <Hero />
            <Features />
            <div className="max-w-7xl p-8">
                <LandingCTA />
            </div>
        </>
    );
}

export default Home;