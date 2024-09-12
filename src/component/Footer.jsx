const Footer = () => {
  return (
    <footer className="bg-transparent border-t-4 border-gray-300 text-xl bottom-0 py-12">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-2">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex gap-4 mb-2">
          <a href="#" className="text-blue-700 hover:text-blue-900">Privacy Policy</a>
          <a href="#" className="text-blue-700 hover:text-blue-900">Terms of Service</a>
          <a href="#" className="text-blue-700 hover:text-blue-900">Contact Us</a>
        </div>
        <div className="text-gray-600 text-xs">
          Designed with <span className="text-red-500">❤️</span> by Dibya ranjan
        </div>
      </div>
    </footer>
  );
};

export default Footer;
