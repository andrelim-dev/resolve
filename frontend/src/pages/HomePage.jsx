import { useEffect } from "react";
import { Zap, Eye, MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

const features = [
  {
    icon: <Zap size={20} />,
    title: "Fast Resolution",
    description:
      "Our optimized workflows ensure your tickets are routed to the right team immediately.",
  },
  {
    icon: <Eye size={20} />,
    title: "Full Transparency",
    description:
      "Track every step of the process with real-time updates and detailed status logs.",
  },
  {
    icon: <MessageSquare size={20} />,
    title: "Direct Communication",
    description:
      "Communicate directly with resolution staff through integrated, secure messaging.",
  },
];

export default function HomePage() {
  useEffect(() => {
    document.title = "Resolve | Home";
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6fc] font-inter">
      <Navbar />

      <main className="flex-1">
        <Hero />

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
