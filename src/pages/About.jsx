import React from "react";
import AboutSection from "../components/AboutSection";
import StandardNewsCard from "../components/StandardNewsCard";

export default function About() {
  return (
    <div className="pt-20 bg-yellow-50 min-h-screen">
      <AboutSection />
      <StandardNewsCard/>
    </div>
  );
}
