import {
  Award,
  Users,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import serviceHero from "../assets/services-hero.jpg";

/* ================= TYPES ================= */
interface ConstructionInfo {
  name: string;
  description: string;
  image: string;
}

interface OwnerInfo {
  name: string;
  description: string;
  image: string;
  phone?: string;
  email?: string;
  location?: string;
}

interface ProjectInfo {
  completedProjects: number;
  happyClients: number;
  experienceYears: number;
}

interface AboutData {
  constructionInfo: ConstructionInfo;
  ownerInfo: OwnerInfo;
  projectInfo: ProjectInfo;
}

/* ================= FALLBACK ================= */
const DEFAULT_ABOUT_DATA: AboutData = {
  constructionInfo: {
    name: "RK Constructions",
    description:
      "We deliver high-quality residential, commercial, and infrastructure projects through precise planning, premium materials, and professional execution.",
    image: "",
  },
  ownerInfo: {
    name: "Founder & Managing Director",
    description:
      "A construction professional committed to quality, safety, and long-term client satisfaction through ethical leadership and innovation.",
    image: "",
    phone: "",
    email: "",
    location: "",
  },
  projectInfo: {
    completedProjects: 500,
    happyClients: 200,
    experienceYears: 20,
  },
};

/* ================= CORE VALUES ================= */
const coreValues = [
  {
    icon: Shield,
    title: "Quality & Safety",
    description: "Strict quality checks and industry-standard safety practices.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Well-planned execution to meet committed timelines.",
  },
  {
    icon: Users,
    title: "Client Focused",
    description: "Transparent communication and tailored solutions.",
  },
  {
    icon: Award,
    title: "Trusted Expertise",
    description: "Proven experience across diverse construction projects.",
  },
];

/* ================= ABOUT PAGE ================= */
const About = () => {
  const [aboutData, setAboutData] = useState<AboutData>(DEFAULT_ABOUT_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/about");
        if (res.data) {
          setAboutData({
            constructionInfo: {
              ...DEFAULT_ABOUT_DATA.constructionInfo,
              ...res.data.constructionInfo,
            },
            ownerInfo: {
              ...DEFAULT_ABOUT_DATA.ownerInfo,
              ...res.data.ownerInfo,
            },
            projectInfo: {
              ...DEFAULT_ABOUT_DATA.projectInfo,
              ...res.data.projectInfo,
            },
          });
        }
      } catch {
        setAboutData(DEFAULT_ABOUT_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-12 w-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
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
              About Us
            </span>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
              Building Trust <br className="hidden sm:block" />
              Delivering Excellence
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed">
              Learn more about our leadership, values, and commitment to
              delivering reliable, high-quality construction solutions.
            </p>
          </motion.div>
        </div>

       {/* Bottom Fade */}
        <div className=" absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Stat label="Happy Clients" value={`${aboutData.projectInfo.happyClients}+`} icon={Users} />
          <Stat label="Projects Completed" value={`${aboutData.projectInfo.completedProjects}+`} icon={Award} />
          <Stat label="Years Experience" value={`${aboutData.projectInfo.experienceYears}+`} icon={Clock} />
        </div>
      </section>

      {/* ================= OWNER ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Leadership</h2>
            <h3 className="text-xl font-semibold mb-4">
              {aboutData.ownerInfo.name}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {aboutData.ownerInfo.description}
            </p>

            <div className="space-y-3 text-gray-600">
              {aboutData.ownerInfo.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="text-orange-500" />
                  {aboutData.ownerInfo.phone}
                </div>
              )}
              {aboutData.ownerInfo.email && (
                <div className="flex items-center gap-3">
                  <Mail className="text-orange-500" />
                  {aboutData.ownerInfo.email}
                </div>
              )}
              {aboutData.ownerInfo.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="text-orange-500" />
                  {aboutData.ownerInfo.location}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            {aboutData.ownerInfo.image ? (
              <img
                src={aboutData.ownerInfo.image}
                alt="Owner"
                className="w-72 h-72 sm:w-96 sm:h-96 object-cover rounded-3xl shadow-xl"
              />
            ) : (
              <div className="w-72 h-72 sm:w-96 sm:h-96 bg-white rounded-3xl shadow-xl flex items-center justify-center text-6xl">
                👤
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Principles that guide every project we deliver
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((v, i) => (
              <CoreValueCard
                key={i}
                icon={v.icon}
                title={v.title}
                description={v.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const Stat = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -8, scale: 1.03 }}
    className="bg-white rounded-3xl p-10 text-center border border-gray-200 shadow-md hover:shadow-2xl transition-all"
  >
    <Icon className="w-14 h-14 mx-auto text-orange-500 mb-6" />
    <div className="text-4xl font-extrabold">{value}</div>
    <div className="mt-2 text-gray-500 uppercase tracking-widest text-xs">
      {label}
    </div>
  </motion.div>
);

const CoreValueCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    whileHover={{ y: -10 }}
    className="bg-white rounded-3xl p-10 text-center border border-gray-200 shadow-md hover:shadow-2xl transition-all"
  >
    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange-100 flex items-center justify-center">
      <Icon className="w-8 h-8 text-orange-500" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default About;
