import React from 'react';
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { Highlighter } from "@/components/ui/highlighter";

export default function Education() {
    return (
        <section id="education" className="w-full bg-white text-black min-h-screen flex flex-col justify-center">
            <div className="section-wrap">
                <div className="text-center">
                    <div className="inline-block mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <Highlighter action="underline" color="#FFD700">
                                Qualifications
                            </Highlighter>
                        </h2>
                    </div>
                    <div className="relative flex max-w-lg mx-auto flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:p-14">
                        <Tree
                            className="w-full bg-background overflow-hidden rounded-md"
                            initialExpandedItems={["Education", "HPTU", "HimXII", "HimX", "Certifications", "Cisco", "IBM", "AWS", "Experience"]}
                        >
                            <Folder element="🎓 My Education" value="Education">
                                <Folder element="Himachal Pradesh Technical University (HPTU)" value="HPTU">
                                    <File value="BTECH">
                                        <p>B.Tech – Computer Science & Engineering (2023–2027)</p>
                                    </File>
                                </Folder>
                                <Folder element="Him Academy Public School, Vikasnagar" value="HimXII">
                                    <File value="XII">
                                        <p>Senior Secondary (Class XII), Science (Non-Medical) – 2021</p>
                                    </File>
                                </Folder>
                                <Folder element="Him Academy Public School, Vikasnagar" value="HimX">
                                    <File value="X">
                                        <p>Secondary (Class X) – 2019</p>
                                    </File>
                                </Folder>
                            </Folder>
                            <Folder element="🏆 Achievements & Leadership" value="Achievements">
                                <File value="Hackathon">
                                    <p>Engineering Day Hackathon Organizer</p>
                                </File>
                                <File value="Team-Lead">
                                    <p>Project Team Lead & Technical Coordinator</p>
                                </File>
                            </Folder>
                            <Folder element="💼 Professional Experience" value="Experience">
                                <Folder element="Zippin Full-Stack Solutions" value="Zippin">
                                    <File value="Zippin-Role">
                                        <p>Founder & Lead Developer (Jan 2023 – Present)</p>
                                    </File>
                                    <File value="Zippin-1">
                                        <p>Developed 'Hotspot' & 'Wellfire' multi-store inventory systems</p>
                                    </File>
                                    <File value="Zippin-2">
                                        <p>Built a Gym Management Platform with automated renewals</p>
                                    </File>
                                    <File value="Zippin-3">
                                        <p>Full E-Commerce Marketplace with Amazon-style UI</p>
                                    </File>
                                </Folder>
                                <Folder element="College Research & Projects" value="Research">
                                    <File value="AI-Attendance">
                                        <p>AI Attendance System – Facial Recognition based logging</p>
                                    </File>
                                    <File value="Face-Recon">
                                        <p>Face Recognition Surveillance – Real-time tracking</p>
                                    </File>
                                    <File value="Virtual-Class">
                                        <p>Virtual Class Platform – Video + Document collaboration</p>
                                    </File>
                                </Folder>
                            </Folder>
                        </Tree>
                    </div>
                </div>
            </div>
        </section>
    );
}