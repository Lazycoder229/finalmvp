function Footer() {
  return (
    <footer className="bg-gray-500 text-gray-200 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-2 flex justify-center items-center">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} PeerConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
