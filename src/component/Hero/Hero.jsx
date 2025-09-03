

function Hero() {
    return (
        <main>


            <section className="w-full bg-gray-900 py-20 p-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                    {/* Left: Text */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Your <span className="text-teal-400">Cloud Drive</span>,
                            Simplified.
                        </h1>
                        <p className="mt-6 text-lg text-gray-300">
                            Store, access, and share files instantly. CloudDrive gives you
                            speed, security, and unlimited access — wherever you go.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button className="px-6 py-3 rounded-full bg-teal-400 text-gray-900 font-medium hover:bg-teal-500 transition-colors">
                                Get Started Free
                            </button>
                            <button className="px-6 py-3 rounded-full border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900 transition-colors">
                                See Features
                            </button>
                        </div>
                    </div>

                    {/* Right: Hero Image / Mockup */}
                    <div className="flex-1 flex justify-center">
                        {/* add video or image later */}
                        {/* <img
                            src=""
                            alt="Drive Illustration"
                            className="w-[400px] md:w-[500px] rounded-lg shadow-2xl"
                        /> */}
                    </div>
                </div>
            </section>
            {/* <LandingCTA/> */}
        </main>

    );
}

export default Hero;
