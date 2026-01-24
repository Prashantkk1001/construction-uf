import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import serviceHero from "../assets/services-hero.jpg";
import { motion } from "framer-motion";

/* ================= BACKEND URL ================= */
const BACKEND_URL =






"https://construction-backend-wtf2.onrender.com";

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

/* ================= IMAGE HELPER ================= */
const getImageUrl = (path?: string) => {
  if (!path) return serviceHero;

  // fix bad stored paths
  let clean = path.replace("/undefined", "");

  // already full URL
  if (clean.startsWith("http")) return clean;

  // relative path → attach backend
  return `${BACKEND_URL}${clean.startsWith("/") ? "" : "/"}${clean}`;
};

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

      const list: Project[] = Array.isArray(res.data)
        ? res.data
        : (res.data as any).projects || [];

      setProjects(list);
    } catch (err) {
      console.error("❌ Failed to load projects", err);
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
      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] flex items-center mt-20">
        <img
          src={serviceHero}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

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
            <h1 className="text-5xl font-bold text-white mt-4 mb-6">
              Completed Projects
            </h1>
            <p className="text-gray-300 text-lg">
              Residential, commercial, interior & infrastructure projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FILTER ================= */}
      {showCategories && (
        <section className="sticky top-20 bg-white border-y">
          <div className="container mx-auto px-6 py-6 flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowCategories(false);
                }}
                className={`px-6 py-3 rounded-full text-sm font-semibold
                  ${
                    activeCategory === cat
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {!showCategories && (
        <div className="text-center py-6">
          <button
            onClick={() => setShowCategories(true)}
            className="px-6 py-3 bg-gray-900 text-white rounded-full"
          >
            Show Categories
          </button>
        </div>
      )}

      {/* ================= PROJECT GRID ================= */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : filteredProjects.length === 0 ? (
            <p className="text-center text-gray-500">
              No projects found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((p) => (
                <div
                  key={p._id}
                  className="border rounded-2xl shadow hover:shadow-xl transition"
                >
                  <div className="h-60 overflow-hidden rounded-t-2xl">
                    <img
                      src={getImageUrl(p.images?.[0])}
                      onError={(e) =>
                        (e.currentTarget.src = serviceHero)
                      }
                      className="w-full h-full object-cover hover:scale-110 transition"
                    />
                  </div>

                  <div className="p-6">
                    <span className="text-xs text-gray-500">
                      {p.location}
                    </span>
                    <h3 className="text-xl font-bold mt-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {p.description}
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
        <Button asChild size="lg" className="bg-white text-gray-900">
          <Link to="/contact" className="flex gap-2">
            Start Your Project <ArrowRight />
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Projects;
