
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 ">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Cloud<span className="text-teal-400">Drive</span>
                    </h2>
                    <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                        Secure, fast, and reliable cloud storage built for modern teams
                        and individuals.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Product</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-teal-400">Features</a></li>
                        <li><a href="#" className="hover:text-teal-400">Pricing</a></li>
                        <li><a href="#" className="hover:text-teal-400">Security</a></li>
                        <li><a href="#" className="hover:text-teal-400">Integrations</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-teal-400">About</a></li>
                        <li><a href="#" className="hover:text-teal-400">Blog</a></li>
                        <li><a href="#" className="hover:text-teal-400">Careers</a></li>
                        <li><a href="#" className="hover:text-teal-400">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-teal-400"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-teal-400"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-teal-400"><Linkedin size={20} /></a>
                        <a href="#" className="hover:text-teal-400"><Github size={20} /></a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-800 mt-8">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} CloudDrive. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-teal-400">Privacy Policy</a>
                        <a href="#" className="hover:text-teal-400">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
