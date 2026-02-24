'use client'

import { Github, Globe, Code2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-neutral-100 p-2 sm:p-4 border-t border-gray-100">
            <div className="mx-auto flex flex-col md:flex-row justify-between items-center">

                <div className="flex flex-col items-center md:items-start gap-1">

                    <p className="text-[11px] text-gray-600">
                        Built with Next.js & Laravel Sanctum
                    </p>
                </div>


                {/* Права частина: Посилання */}
                <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com/dropson"
                        target="_blank"
                        className="group flex items-center gap-2 text-sm text-gray-500 hover:text-[#4F8EF7] transition-colors"
                    >
                        <Github size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">GitHub</span>
                    </Link>


                </div>

            </div>
        </footer>
    );
}
