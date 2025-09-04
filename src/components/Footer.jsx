// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 text-center py-4 mt-10 border-t border-gray-700">
      <p className="text-sm">
        © {new Date().getFullYear()} MyDrive. Built with ❤️ using React & Node.js.
      </p>
    </footer>
  );
}
