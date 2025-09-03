function LandingCTA() {
    return (
        <section className="w-full bg-gray-900 py-32 relative overflow-hidden">
            {/* Optional background circles / glow */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-teal-400/10 blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-3xl"></div>

            <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to experience <span className="text-teal-400">faster</span> & <span className="text-cyan-400">smarter</span> cloud storage?
                </h2>
                <p className="text-gray-300 text-lg mb-10">
                    Store, access, and share your files effortlessly with CloudDrive.
                    Get secure, real-time sync and unlimited access on all devices.
                </p>

                {/* CTA Button */}
                <a
                    href="/signup"
                    className="inline-block px-8 py-4 font-medium rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-gray-900 hover:from-teal-500 hover:to-cyan-600 transition-all shadow-lg"
                >
                    Get Started Now →
                </a>
            </div>
        </section>
    );
}

export default LandingCTA;
