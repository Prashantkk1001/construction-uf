import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import serviceHero from "../assets/services-hero.jpg";
import { motion } from "framer-motion";

/* ================= TYPES ================= */
type Section =
  | "Residential"
  | "Interior"
  | "3D Plan"
  | "Line Plan"
  | "Commercial"
  | "Infrastructure";

interface Project {
  _id: string;
  title: string;
  description: string;
  location: string;
  section: Section;
  images: string[];
}

/* ================= CATEGORIES ================= */
const categories: (Section | "All")[] = [
  "All",
  "Residential",
  "Commercial",
  "Interior",
  "Infrastructure",
  "3D Plan",
  "Line Plan",
];

/* ================= COMPONENT ================= */
const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<Section | "All">("All");
  const [loading, setLoading] = useState(true);
  const [showCategories, setShowCategories] = useState(true);

  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch {
        console.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* ================= FILTER ================= */
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.section === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO BANNER ================= */}


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
                Our Portfolio
            </span>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mt-4 mb-6 leading-tight">
               Showcasing Our <br className="hidden md:block" />
            Completed Projects
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed">
                 Explore our portfolio of residential, commercial, interior,
            infrastructure, 3D planning, and line plan projects—each crafted
            with precision, quality materials, and professional execution.
            </p>
          </motion.div>
        </div>

       {/* Bottom Fade */}
        <div className=" absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>






      {/* ================= CATEGORY FILTER ================= */}
      {showCategories && (
        <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-y border-gray-200">
          <div className="container mx-auto px-6 py-6 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowCategories(false);
                }}
                className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest transition-all
                  ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ================= SHOW FILTER BUTTON ================= */}
      {!showCategories && (
        <div className="text-center py-6">
          <button
            onClick={() => setShowCategories(true)}
            className="px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold uppercase tracking-widest shadow-lg hover:bg-gray-800 transition"
          >
            Show Categories
          </button>
        </div>
      )}

      {/* ================= PROJECT GRID ================= */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">
                No projects found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="group bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden rounded-t-2xl">
                    <img
                      src={project.images?.[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <span className="absolute top-4 left-4 bg-black/80 text-white text-xs px-4 py-2 rounded-full uppercase tracking-widest">
                      {project.section}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-widest text-gray-500">
                      {project.location}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 bg-gray-900 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Let’s bring your vision to life with expert planning and quality
            construction.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            <Link to="/contact" className="flex items-center gap-2">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Projects;
