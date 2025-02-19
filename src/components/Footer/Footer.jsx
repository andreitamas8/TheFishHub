import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <footer className="bg-oxford-blue text-white py-8 px-4 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:flex lg:justify-between lg:items-center">
        {/* Newsletter */}
        <div className="text-center md:text-right lg:w-1/3 bg-charcoal-blue p-4 rounded-md drop-shadow-md">
          <p className="mb-2 text-center">Subscribe to our newsletter</p>
          <div className="flex gap-2 justify-center lg:justify-end">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-md text-black bg-offwhite max-w-[250px] w-full"
            />
            <button className="bg-silver hover:bg-dark-green hover:text-white transition text-black px-4 py-2 rounded-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start space-x-6 lg:w-1/3 lg:justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-3xl hover:text-pink-400 transition" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-3xl hover:text-blue-400 transition" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-3xl hover:text-red-400 transition" />
          </a>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col text-center justify-center items-center md:text-left space-y-2 lg:w-1/3 lg:text-right">
          <Link to="/about" className="hover:text-blue-300 transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-blue-300 transition">
            Contact
          </Link>
          <Link to="/faq" className="hover:text-blue-300 transition">
            FAQ
          </Link>
          <Link to="/blog" className="hover:text-blue-300 transition">
            Blog
          </Link>
          <Link to="/fish-care" className="hover:text-blue-300 transition">
            Fish Care Tips
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-6">
        © {new Date().getFullYear()} TheFishHub. All rights reserved.
      </div>
    </footer>
  );
};
