import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  /* ================= SCROLL TO TOP ON ROUTE CHANGE ================= */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B1220]/95 backdrop-blur border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">

          {/* ================= LOGO + NAME ================= */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 h-full"
          >
            {/* Logo */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/rk-logo/rklogo-removebg-preview.png"
                alt="RK Constructions"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Construction Name */}
            <div className="flex flex-col justify-center leading-none">
              <span className="text-lg font-bold text-white tracking-wide">
                RK CONSTRUCTIONS
              </span>
              <span className="text-[11px] tracking-[3px] uppercase text-slate-400 mt-1">
                BUILDING DREAMS
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`relative font-medium transition-colors
                    ${
                      location.pathname === link.path
                        ? "text-[#F59E0B]"
                        : "text-slate-300 hover:text-white"
                    }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#F59E0B]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* ================= DESKTOP CTA ================= */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+917038859141"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition"
            >
              <Phone size={18} />
              <span className="font-medium">+91 70388 59141</span>
            </a>

            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg bg-[#F59E0B] text-black font-semibold hover:bg-[#fbbf24] transition"
            >
              Get Quote
            </Link>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle Menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden bg-[#0B1220]
          ${open ? "max-h-[500px] border-t border-white/10" : "max-h-0"}`}
      >
        <div className="px-6 py-6 space-y-5">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block text-lg font-semibold transition
                ${
                  location.pathname === link.path
                    ? "text-[#F59E0B]"
                    : "text-slate-300 hover:text-white"
                }`}
            >
              {link.name}
            </Link>
          ))}

          <a
            href="tel:+917038859141"
            className="flex items-center gap-2 text-slate-300 pt-4"
          >
            <Phone size={18} />
            +91 70388 59141
          </a>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block text-center mt-4 py-3 rounded-lg bg-[#F59E0B] text-black font-semibold"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
