import React from 'react';
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { Highlighter } from "@/components/ui/highlighter";

export default function Certifications() {
  return (
    <section id="certifications" className="w-full bg-white text-black py-20">
      <div className="section-wrap">
        <div className="text-center">
          <div className="inline-block mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              <Highlighter action="underline" color="#FFD700">
                Resume Overview
              </Highlighter>
            </h2>
          </div>

          <div className="relative flex max-w-2xl mx-auto flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-8 md:p-14">
            <Tree
              className="w-full bg-background overflow-hidden rounded-md"
              initialExpandedItems={[
                'Summary',
                'Technical Skills',
                'Experience',
                'Education',
                'Achievements',
              ]}
            >
              <Folder element="Professional Summary" value="Summary">
                <File value="summary-1">
                  <p>
                    Innovative Full-Stack Software Engineer (MERN) with strong expertise in building scalable web applications, e-commerce systems, and enterprise dashboards. Known for turning complex business needs into elegant software solutions, blending technical mastery with entrepreneurial vision.
                  </p>
                </File>
                <File value="summary-2">
                  <p>
                    Proven track record of leading development projects — from attendance systems powered by AI, restaurant inventory platforms, and gym membership management systems. Seeking a Full-Stack Developer role where I can apply my skills to deliver business-centric, scalable solutions.
                  </p>
                </File>
              </Folder>

              <Folder element="Technical Skills" value="Technical Skills">
                <File value="skills-frontend">
                  <p>Frontend: React.js, Next.js, Tailwind CSS, Redux, Framer Motion</p>
                </File>
                <File value="skills-backend">
                  <p>Backend: Node.js, Express.js, REST APIs</p>
                </File>
                <File value="skills-database">
                  <p>Database: MongoDB (Mongoose), MySQL, NoSQL concepts</p>
                </File>
                <File value="skills-ai">
                  <p>Data & AI: Python (NumPy, Pandas, OpenCV), AI/ML basics, DBMS, DSA</p>
                </File>
              </Folder>

              <Folder element="Professional Experience" value="Experience">
                <Folder element="Zippin Full-Stack Solutions" value="Zippin">
                  <File value="zippin-role">
                    <p>Founder & Lead Developer (Jan 2023 – Present)</p>
                  </File>
                  <File value="zippin-1">
                    <p>Developed multi-store inventory systems for food chains and cafés (Hotspot, Wellfire) with store-wise dashboards, revenue analytics, and order management.</p>
                  </File>
                  <File value="zippin-2">
                    <p>Designed Gym Management Platform with automated renewals, membership analytics, and expiry countdowns.</p>
                  </File>
                  <File value="zippin-3">
                    <p>Created a full e-commerce marketplace with Amazon-style UI, product variations, review support, category filters, and dynamic carts.</p>
                  </File>
                </Folder>
                <Folder element="College Research & Projects" value="Research">
                  <File value="ai-attendance">
                    <p>AI Attendance System: Facial recognition for secure student attendance logging.</p>
                  </File>
                  <File value="face-recognition">
                    <p>Face Recognition Surveillance: Camera-based real-time recognition for security tracking.</p>
                  </File>
                  <File value="virtual-class">
                    <p>Virtual Class Platform: Collaborative tool with multi-user video and document sharing.</p>
                  </File>
                </Folder>
              </Folder>

              <Folder element="Education" value="Education">
                <File value="education-x">
                  <p>Secondary (Class X) – 2019, Him Academy Public School, Vikasnagar</p>
                </File>
                <File value="education-xii">
                  <p>Senior Secondary (Class XII), Science (Non-Medical) – 2021, Him Academy Public School, Vikasnagar</p>
                </File>
                <File value="education-btech">
                  <p>B.Tech – Computer Science & Engineering (2023 – 2027), Himachal Pradesh Technical University (HPTU)</p>
                </File>
              </Folder>

              <Folder element="Achievements & Leadership" value="Achievements">
                <File value="languages">
                  <p>Languages: English, Hindi.</p>
                </File>
                <File value="interests">
                  <p>Interests: Tech startups, UI/UX design, AI for real-world applications.</p>
                </File>
                <File value="team-lead">
                  <p>Selected as group leader for multiple engineering project teams (DSA groups & AI/ML initiatives).</p>
                </File>
                <File value="hackathon">
                  <p>Organized Engineering Day Hackathon competition.</p>
                </File>
                <File value="entrepreneurship">
                  <p>Recognized for entrepreneurial projects pitched to businesses (Wellfire Restaurant, Café Hotspot).</p>
                </File>
              </Folder>
            </Tree>
          </div>
        </div>
      </div>
    </section>
  );
}
