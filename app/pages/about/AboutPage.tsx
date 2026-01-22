"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50 animate-fade-in-up">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-24">
        {/* Header */}
        <header className="text-center mb-20 animate-fade-in-up animate-delay-100">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Chai Hao Tzun
          </h1>
          <h2 className="text-xl font-light text-muted-foreground mb-6">
            蔡鎬駿
          </h2>
          <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            M.S. candidate in Computer Science at National Cheng Kung University, 
            specializing in AI, machine learning, and full-stack development with a passion 
            for building intelligent systems that solve real-world problems.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <a
              href="mailto:chaotzun@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              chaotzun@gmail.com
            </a>
            <a
              href="tel:+886976347703"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              +886-976-347-703
            </a>
            <a
              href="https://linkedin.com/in/hao-tzun-chai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </header>

        {/* Education */}
        <section className="mb-16 animate-fade-in-up animate-delay-200">
          <h3 className="text-2xl font-bold text-foreground mb-8">Education</h3>
          <div className="space-y-6">
            <Card className="border-zinc-100 shadow-none hover:border-zinc-200 transition-colors">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">
                      National Cheng Kung University
                    </h4>
                    <p className="text-base text-muted-foreground">
                      M.S. in Computer Science and Information Engineering
                    </p>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap ml-4">
                    2025 - Present
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-100 shadow-none hover:border-zinc-200 transition-colors">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">
                      National Cheng Kung University
                    </h4>
                    <p className="text-base text-muted-foreground">
                      B.S. in Computer Science and Information Engineering
                    </p>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap ml-4">
                    2021 - 2025
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-foreground mb-2">
                    GPA: 4.05/4.3
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-medium">Relevant Coursework:</span> Data Structures, 
                    Algorithms, Operating Systems, Linux System & Open-Source Software, 
                    Introduction to Artificial Intelligence
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Honors & Awards */}
        <section className="mb-16 animate-fade-in-up animate-delay-300">
          <h3 className="text-2xl font-bold text-foreground mb-8">Honors & Awards</h3>
          <div className="space-y-3">
            {[
              { title: "Outstanding Student Award (NCKU)", year: "2021" },
              { title: "Outstanding Overseas Graduate Award", year: "2025" },
              { title: "Outstanding Overseas Student Award", year: "2024" },
              { title: "Excellent Overseas Student Award", year: "2021 - 2024" },
            ].map((award, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b border-zinc-100 last:border-0"
              >
                <span className="text-base text-foreground">{award.title}</span>
                <span className="text-sm text-muted-foreground font-medium">
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Projects */}
        <section className="mb-16 animate-fade-in-up animate-delay-400">
          <h3 className="text-2xl font-bold text-foreground mb-8">Projects</h3>
          <div className="space-y-8">
            {/* MentalRAG */}
            <Card className="border-zinc-100 shadow-none hover:border-zinc-200 transition-colors">
              <CardContent className="pt-6">
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  MentalRAG (LLM-Powered Counseling Assistant)
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                      Developed a RAG-based mental health advisory system in collaboration 
                      with the Ministry of Education, enabling university faculty to access 
                      professional case-based guidance for student support.
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                      Implemented a GitLab CI pipeline to automate Docker image builds and 
                      registry deployment.
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                      Led system benchmarking, using Promptfoo to evaluate response quality 
                      for high-stakes mental health scenarios.
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                      Optimized RAG retrieval using LangChain, achieving a 12% increase in 
                      retrieval hit rate.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* EnHAR-LLM */}
            <Card className="border-zinc-100 shadow-none hover:border-zinc-200 transition-colors">
              <CardContent className="pt-6">
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  EnHAR-LLM: Energy-Aware Human Activity Recognition
                </h4>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  ACL Submission
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                      Developed a two-stage EnHAR-LLM framework that bridges signal restoration 
                      and semantic recognition, utilizing attention-based imputation to reconstruct 
                      coarse signals before fusing them with imputation stage representations and 
                      time-series embeddings for classification.
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                      Improved F1 score by 10.23% over state-of-the-art baselines and surpassed 
                      the higher-frequency (1Hz) baseline performance despite using 90% less data 
                      (0.1Hz vs 1Hz).
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                      Achieved a 95% relative F1 improvement under extreme downsampling (0.02Hz) 
                      using a Qwen backbone, successfully classifying minority high-movement 
                      activities such as bicycling.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Personal Finance Dashboard */}
            <Card className="border-zinc-100 shadow-none hover:border-zinc-200 transition-colors">
              <CardContent className="pt-6">
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  Personal Finance Dashboard
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                      Developed a reactive financial visualization platform using Next.js, React, 
                      TypeScript, and TailwindCSS.
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                      Architected a secure CI/CD pipeline via GitHub Actions to automate Docker 
                      image builds and deployment to Google Cloud Run.
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">•</span>
                    <span>
                      Enforced system reliability through comprehensive unit testing with Vitest 
                      and React Testing Library.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Skills */}
        <section className="mb-16 animate-fade-in-up animate-delay-500">
          <h3 className="text-2xl font-bold text-foreground mb-8">Skills</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Programming Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Python", "JavaScript", "C", "HTML", "CSS"].map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                AI & Machine Learning
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "PyTorch",
                  "Hugging Face Transformers",
                  "Large Language Models",
                  "RAG",
                  "LangChain",
                  "Scikit-learn",
                ].map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                DevOps & Cloud
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Docker",
                  "Google Cloud Platform",
                  "Cloud Run",
                  "CI/CD",
                  "GitHub Actions",
                  "GitLab CI",
                  "Linux",
                  "Git",
                  "Containerization",
                ].map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Web Development
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "React.js",
                  "Next.js",
                  "TailwindCSS",
                  "RESTful APIs",
                  "Frontend",
                  "Backend",
                ].map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        {/* Languages */}
        <section className="mb-16 animate-fade-in-up animate-delay-600">
          <h3 className="text-2xl font-bold text-foreground mb-8">Languages</h3>
          <div className="space-y-3">
            {[
              { language: "Mandarin", proficiency: "Native Proficiency" },
              { language: "English", proficiency: "Fluent (IELTS 8.5)" },
              { language: "Malay", proficiency: "Fluent (SPM Grade A)" },
            ].map((lang, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b border-zinc-100 last:border-0"
              >
                <span className="text-base font-medium text-foreground">
                  {lang.language}
                </span>
                <span className="text-sm text-muted-foreground">
                  {lang.proficiency}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

