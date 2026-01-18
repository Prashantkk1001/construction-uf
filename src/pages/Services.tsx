import { Link } from "react-router-dom";
import {
  ArrowRight,
  Home,
  Building2,
  Wrench,
  Palette,
  Construction,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectInterior from "@/assets/project-interior.jpg";
import projectInfrastructure from "@/assets/project-infrastructure.jpg";
import serviceHero from "../assets/services-hero.jpg";

/* -------------------- DATA -------------------- */

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description:
      "From luxury villas to apartment complexes, we build homes that combine comfort, style, and durability.",
    image: projectResidential,
    features: [
      "Custom home design and construction",
      "Multi-story residential buildings",
      "Luxury villa developments",
      "Affordable housing projects",
      "Smart home integration",
    ],
  },
  {
    icon: Building2,
    title: "Commercial Projects",
    description:
      "Modern office buildings, retail spaces, and commercial complexes designed for success.",
    image: projectCommercial,
    features: [
      "Office buildings and tech parks",
      "Shopping malls and retail spaces",
      "Hotels and hospitality projects",
      "Industrial facilities",
      "Mixed-use developments",
    ],
  },
  {
    icon: Wrench,
    title: "Renovation & Remodeling",
    description:
      "Transform existing spaces with our comprehensive renovation and remodeling services.",
    image: projectResidential,
    features: [
      "Complete home renovations",
      "Office space modernization",
      "Historical building restoration",
      "Structural repairs and upgrades",
      "Energy-efficient retrofits",
    ],
  },
  {
    icon: Palette,
    title: "Interior Design & Fitouts",
    description:
      "Creating stunning interiors that reflect your personality and enhance functionality.",
    image: projectInterior,
    features: [
      "Residential interior design",
      "Commercial fitout services",
      "Custom furniture and fixtures",
      "Lighting design",
      "Material and finish selection",
    ],
  },
  {
    icon: Construction,
    title: "Infrastructure & Civil Works",
    description:
      "Roads, bridges, and civil engineering projects that connect communities.",
    image: projectInfrastructure,
    features: [
      "Road construction and expansion",
      "Bridge and flyover construction",
      "Drainage and water supply",
      "Foundation and earthwork",
      "Site development",
    ],
  },
];

/* -------------------- ANIMATIONS -------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

/* -------------------- COMPONENT -------------------- */

const Services = () => {
  return (
    <div className="pt-16">
      {/* ================= HERO BANNER ================= */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <img
          src={serviceHero}
          alt="Construction Services"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="container mt-10  mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="text-accent  text-white uppercase tracking-widest text-sm font-medium">
              Our Services
            </span>

            <h1 className="font-display text-5xl sm:text-6xl text-white mt-4 mb-6 leading-tight">
              Comprehensive <br className="hidden sm:block" />
              Construction Solutions
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              We deliver end-to-end construction services including residential,
              commercial, interior, renovation, and infrastructure projects—
              executed with precision and professional project management.
            </p>

            <Button asChild size="lg" className=" text-white group">
              <Link to="/contact">
                Request a Consultation
                <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className=" absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="mt-10 section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-28">
            {services.map((service, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-2xl overflow-hidden shadow-xl group ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="w-14 h-14 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
                      <service.icon className="w-7 h-7 text-accent" />
                    </div>
                  </div>
                </motion.div>

                {/* Content Card */}
                <div className= {index % 2 === 1 ? "lg:order-1" : "mt-0"}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card/70 backdrop-blur rounded-2xl p-8 shadow-soft border border-border"
                  >
                    <h2 className="font-display text-4xl text-foreground mb-4">
                      {service.title}
                    </h2>

                    <p className="text-muted-foreground text-lg mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button asChild size="lg" className="group">
                      <Link to="/contact">
                        Get Quote
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
