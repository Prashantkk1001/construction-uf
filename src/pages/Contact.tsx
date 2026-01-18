import { useEffect, useState } from "react";
import serviceHero from "../assets/services-hero.jpg";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= TYPES ================= */

interface ContactData {
  phone: string;
  email: string;
  address: string;
  workingTime: string;
  mapUrl: string;
  social: {
    instagram: string;
    facebook: string;
    whatsapp: string;
    twitter: string;
  };
}

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

/* ================= COMPONENT ================= */

const Contact = () => {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [form, setForm] = useState<EnquiryData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  /* ================= FETCH CONTACT ================= */

  useEffect(() => {
    fetch("http://localhost:5000/api/contact")
      .then((res) => res.json())
      .then(setContact)
      .catch(() => console.log("Contact API error"));
  }, []);

  /* ================= FORM HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await fetch("http://localhost:5000/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setSuccess("✅ Message sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO BANNER (PROJECT STYLE) ================= */}
      

<section className="relative min-h-[70vh] flex items-center overflow-hidden mt-20">
        {/* Background Image */}
        <img
          src={serviceHero}
          alt="Construction Services"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="uppercase tracking-widest text-sm text-orange-400 font-semibold">
              Contact Us
            </span>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Let’s Discuss Your <br className="hidden md:block" />
            Next Construction Project
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed">
             Whether you’re planning residential, commercial, interior, or
            infrastructure work, our team is ready to guide you with expert
            consultation, transparent pricing, and reliable execution.
            </p>
          </motion.div>
        </div>

       {/* Bottom Fade */}
        <div className=" absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>








      {/* ================= INFO CARDS ================= */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <InfoCard icon={<Phone />} title="Phone" value={contact?.phone} index={1} />
          <InfoCard icon={<Mail />} title="Email" value={contact?.email} index={2} />
          <InfoCard icon={<MapPin />} title="Address" value={contact?.address} index={3} />
          <InfoCard icon={<Clock />} title="Working Time" value={contact?.workingTime} index={4} />
        </div>
      </section>

      {/* ================= FORM + MAP ================= */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-14">
          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-card rounded-2xl shadow-xl border border-border p-10 space-y-5"
          >
            <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>

            <Input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" />
            <Input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" />
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
            <Input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              required
              className="w-full rounded-lg border border-border p-3 focus:ring-2 focus:ring-gray-900 outline-none"
            />

            <button
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium flex justify-center items-center gap-2 hover:bg-gray-800 transition"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-green-600 font-medium">{success}</p>
            )}
          </motion.form>

          {/* MAP */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl border border-border min-h-[420px]"
          >
            {contact?.mapUrl && (
              <iframe
                src={contact.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Office Location"
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= SOCIAL ================= */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto flex justify-center gap-6 text-white">
          {contact?.social?.instagram && (
            <SocialIcon href={contact.social.instagram}><Instagram /></SocialIcon>
          )}
          {contact?.social?.facebook && (
            <SocialIcon href={contact.social.facebook}><Facebook /></SocialIcon>
          )}
          {contact?.social?.twitter && (
            <SocialIcon href={contact.social.twitter}><Twitter /></SocialIcon>
          )}
          {contact?.social?.whatsapp && (
            <SocialIcon href={contact.social.whatsapp}><MessageCircle /></SocialIcon>
          )}
        </div>
      </section>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const InfoCard = ({
  icon,
  title,
  value,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string;
  index: number;
}) => (
  <motion.div
    custom={index}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    whileHover={{ y: -6 }}
    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center"
  >
    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-900 text-white flex items-center justify-center">
      {icon}
    </div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-gray-600 text-sm">{value || "-"}</p>
  </motion.div>
);

const Input = (props: any) => (
  <input
    {...props}
    required
    className="w-full rounded-lg border border-border p-3 focus:ring-2 focus:ring-gray-900 outline-none"
  />
);

const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all"
  >
    {children}
  </a>
);

export default Contact;
