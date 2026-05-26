/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "motion/react";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { RESUME_DATA } from "./data";

function Home() {
  return (
    <>
      <Header />
      <section className="mt-16">
        <h2 className="text-sm font-mono text-[#1a1a1a]/50 uppercase mb-8 tracking-wider">Professional Summary</h2>
        <p className="text-[#1a1a1a]/80 leading-relaxed font-sans text-lg max-w-2xl">
          {RESUME_DATA.summary}
        </p>
      </section>
    </>
  );
}

function SkillsPage() {
  return (
    <section>
      <h2 className="text-2xl font-medium mb-12 tracking-tight flex items-center gap-4 text-[#1a1a1a]">
        <span className="text-blue-600">02</span> Technical Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(RESUME_DATA.skills).map(([category, items]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-[#e5e7eb] p-6 bg-white shadow-sm hover:border-blue-500 transition-all rounded-sm group"
          >
            <h3 className="text-xs font-mono text-[#1a1a1a]/50 uppercase mb-4 tracking-wider flex items-center gap-2 group-hover:text-blue-600 transition-colors">
              {category.replace('_', ' ')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-[#f3f4f6] text-[#1a1a1a] text-xs font-sans font-medium rounded-sm border border-[#e5e7eb]">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <section>
      <h2 className="text-2xl font-medium mb-12 tracking-tight flex items-center gap-4 text-[#1a1a1a]">
        <span className="text-blue-600">03</span> Selected Projects
      </h2>
      <div className="space-y-24">
        {RESUME_DATA.projects.map((proj) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={proj.name} 
            className="grid md:grid-cols-2 gap-8 items-center border border-[#e5e7eb] p-8 hover:border-blue-500 transition-colors bg-white rounded-sm"
          >
            <div>
              <h3 className="font-sans font-medium text-xl text-[#1a1a1a] mb-2">{proj.name}</h3>
              <p className="text-sm text-[#1a1a1a]/70 mb-4 font-mono">{proj.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tech?.map(t => <span key={t} className="text-[10px] bg-gray-100 px-2 py-1 rounded-sm font-mono text-gray-600">{t}</span>)}
              </div>
              <div className="flex gap-4 text-xs font-mono text-[#1a1a1a]/50 mt-auto pt-4 border-t border-[#f3f4f6]">
                {proj.github && <a href={`https://${proj.github}`} className="hover:text-blue-600" target="_blank" rel="noreferrer">GITHUB</a>}
                {proj.live && <a href={`https://${proj.live}`} className="hover:text-blue-600" target="_blank" rel="noreferrer">LIVE</a>}
              </div>
            </div>
            <div className="aspect-video bg-gray-100 rounded-sm overflow-hidden">
                <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function EducationPage() {
  return (
    <section>
      <h2 className="text-2xl font-medium mb-12 tracking-tight flex items-center gap-4 text-[#1a1a1a]">
        <span className="text-blue-600">04</span> Education & Activities
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h3 className="font-mono text-xs text-[#1a1a1a]/50 uppercase tracking-wider">Education</h3>
          {RESUME_DATA.education.map((edu) => (
            <div key={edu.school} className="border-l-2 border-blue-500 pl-4">
              <a href={edu.url} target="_blank" rel="noreferrer" className="block font-sans font-medium text-[#1a1a1a] hover:text-blue-600 text-lg">{edu.school}</a>
              <p className="text-sm text-[#1a1a1a]/70 font-mono mt-1">{edu.degree}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-[#1a1a1a]/50 font-mono">{edu.duration}</p>
                <p className="text-sm font-sans font-bold text-blue-600">{edu.gpa}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <h3 className="font-mono text-xs text-[#1a1a1a]/50 uppercase tracking-wider">Hackathons</h3>
          <ul className="space-y-4 text-sm font-sans text-[#1a1a1a]/80">
            {RESUME_DATA.hackathons.map((h) => <li key={h} className="bg-white p-3 border border-[#f3f4f6] text-sm">{h}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/education" element={<EducationPage />} />
          </Routes>
          <footer className="border-t border-gray-800 mt-24 pt-8 text-center text-xs text-gray-500 font-mono">
            CHAVVA AKSHAY KUMAR REDDY — 2026
          </footer>
        </div>
      </Layout>
    </BrowserRouter>
  );
}