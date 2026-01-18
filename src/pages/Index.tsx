import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/services/api";

import heroImage from "@/assets/hero-construction.jpg";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectInfrastructure from "@/assets/project-infrastructure.jpg";
import projectInterior from "@/assets/project-interior.jpg";

/* ================= TYPES ================= */

interface ProjectInfo {
  happyClients: number;
  completedProjects: number;
  experienceYears: number;
}

/* ================= STATIC DATA ================= */

const services = [
  { title: "Residential Construction", description: "Building dream homes with quality craftsmanship.", icon: "🏠" },
  
  {
    title: "3D Plan & Line Plan",
    description:
      "Accurate 2D line plans and realistic 3D elevation designs to help you visualize your project clearly before construction begins.",
    icon: "📐",
  },{ title: "Commercial Projects", description: "Modern offices and commercial buildings.", icon: "🏢" },
  { title: "Renovation Works", description: "Upgrading spaces with modern designs.", icon: "🔨" },
  { title: "Interior Design", description: "Stylish and functional interiors.", icon: "🎨" },
  { title: "Infrastructure", description: "Roads, bridges & civil engineering.", icon: "🛤️" },
];

const projects = [
  { image: projectResidential, title: "Luxury Villa", category: "Residential" },
  { image: projectCommercial, title: "Tech Park Tower", category: "Commercial" },
  { image: projectInfrastructure, title: "Highway Expansion", category: "Infrastructure" },
  { image: projectInterior, title: "Premium Penthouse", category: "Interior" },
];

/* ================= PAGE ================= */

const Index = () => {
  const [stats, setStats] = useState<ProjectInfo>({
    happyClients: 0,
    completedProjects: 0,
    experienceYears: 0,
  });

  /* ================= FETCH STATS FROM ADMIN ================= */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/about");
        if (res.data?.projectInfo) {
          setStats(res.data.projectInfo);
        }
      } catch (err) {
        console.warn("Stats API not available");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="pt-20 bg-white">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[90vh] flex items-center">
        <img
          src={heroImage}
          alt="Construction site"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm mb-6">
              {/* Building Excellence Since 2005 */}
            </span>

            <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Building Your Dreams <br />
              <span className="text-orange-400">Into Reality</span>
            </h1>

            <p className="text-white/90 text-lg sm:text-xl mb-8">
              From homes to commercial projects, we deliver quality construction with trust and precision.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link to="/contact">
                  Get Free Quote <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Link to="/projects">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROJECT STATS (ADMIN CONTROLLED) ================= */}
      <section className="bg-gradient-to-r from-emerald-50 to-cyan-50 py-20">
        <div className="container mx-auto px-6">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Project Statistics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <StatCard
              icon={Award}
              label="Completed Projects"
              value={`${stats.completedProjects}+`}
              color="emerald"
            />

            <StatCard
              icon={Users}
              label="Happy Clients"
              value={`${stats.happyClients}+`}
              color="amber"
            />

            <StatCard
              icon={Clock}
              label="Years Experience"
              value={`${stats.experienceYears}+`}
              color="slate"
            />

          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete construction solutions tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((s, i) => (
              <Card key={i} className="hover:shadow-xl transition">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">{s.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A glimpse of our recent construction work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <Link
                key={i}
                to="/projects"
                className="relative group overflow-hidden rounded-xl shadow-lg h-80"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-orange-400 text-sm uppercase">{p.category}</span>
                  <h3 className="text-white text-2xl font-bold">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-orange-500 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              <a href="tel:7038859141">Call: 7038859141</a>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;

/* ================= STAT CARD ================= */

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  color: "emerald" | "amber" | "slate";
}) => (
  <div className={`bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border-2 border-${color}-100`}>
    <label className={`block text-lg font-semibold text-${color}-700 mb-4`}>
      {label}
    </label>
    <div className={`text-4xl font-extrabold text-${color}-700 mb-4`}>
      {value}
    </div>
    <Icon className={`w-10 h-10 text-${color}-500`} />
  </div>
);
