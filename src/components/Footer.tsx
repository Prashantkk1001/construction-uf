import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";

/* ================= TYPES ================= */

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  twitter?: string;
}

interface ContactData {
  phone: string;
  email: string;
  address: string;
  workingTime: string;
  mapUrl: string;
  social: SocialLinks;
}

/* ================= COMPONENT ================= */

const Footer = () => {
  const [contact, setContact] = useState<ContactData | null>(null);

  /* ================= FETCH CONTACT ================= */
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("https://construction-backend-wtf2.onrender.com/api/contact");
        if (!res.ok) return;
        const data = await res.json();
        setContact(data);
      } catch {
        console.log("Contact API not available");
      }
    };

    fetchContact();
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* ================= MAIN FOOTER ================= */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* ================= COMPANY INFO ================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center font-bold">
              RK
            </div>
            <div>
              <h3 className="font-bold text-lg">RK Constructions</h3>
              <p className="text-xs opacity-70">Building Dreams</p>
            </div>
          </div>

          <p className="text-sm opacity-80 leading-relaxed">
            RK Construction transforms visions into remarkable structures
            with quality craftsmanship and innovative solutions.
          </p>

          {/* ================= SOCIAL ICONS ================= */}
          <div className="flex gap-4">
            {contact?.social?.facebook && (
              <a
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}

            {contact?.social?.instagram && (
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}

            {contact?.social?.twitter && (
              <a
                href={contact.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}

            {contact?.social?.whatsapp && (
              <a
                href={`https://wa.me/${contact.social.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div>
          <h4 className="font-semibold mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* ================= SERVICES ================= */}
        <div>
          <h4 className="font-semibold mb-5">Our Services</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li>Residential Construction</li>
            <li>Home 3D & Line Plan Design</li>
            <li>Commercial Projects</li>
            <li>Renovation Works</li>
            <li>Interior Design</li>
            <li>Infrastructure</li>
          </ul>
        </div>

        {/* ================= CONTACT ================= */}
        <div>
          <h4 className="font-semibold mb-5">Contact Us</h4>

          <ul className="space-y-4 text-sm opacity-80">
            {contact?.address && (
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="break-words">{contact.address}</span>
              </li>
            )}

            {contact?.phone && (
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-accent">
                  {contact.phone}
                </a>
              </li>
            )}

            {contact?.email && (
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-accent break-all">
                  {contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-primary-foreground/10 py-6 text-center text-sm opacity-60">
        © {new Date().getFullYear()} RK Constructions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
