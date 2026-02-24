'use client'

import { Dna, Dumbbell, Table, Activity } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from 'next/link';
import { Hint } from "../hint";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', icon: Dumbbell, title: "Workouts", label: 'Generate your own workout' },
        { href: '/create-workout', icon: Dna, title: 'New Workout', label: 'Create custom workout' },
        { href: '/programs', icon: Table, title: 'Programs', label: 'Browse Programs' },
        { href: '/statistics', icon: Activity, title: 'Statistics', label: 'View your statistics' },
        { href: '/leaderboard', icon: Dumbbell, title: 'Leaders', label: 'Leaderboard' },
    ]

    return (
        <div className="w-full bg-white dark:bg-[#232324]/95 backdrop-blur-xl border-t border-gray-100 dark:border-slate-800">
            <nav className="mx-auto w-full max-w-screen-xl px-2 py-2 flex justify-center items-center gap-1 sm:gap-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <div key={item.href} className="flex-1 min-w-0 flex justify-center">
                            <Hint label={item.label}>
                                <Link
                                    href={item.href}
                                    className={`relative w-full max-w-[120px] sm:max-w-none flex flex-col items-center gap-1 p-1 sm:p-2 px-1 sm:px-6 rounded-xl transition-all duration-300 border-2
                                        ${isActive
                                            ? 'border-gray-100 bg-gray-50/50 dark:bg-white/5 md:scale-110'
                                            : 'border-transparent md:hover:scale-110 md:hover:bg-gray-50 dark:md:hover:bg-white/5 text-gray-500'
                                        }`}
                                >

                                    <div className={`flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full transition-all
                                        ${isActive
                                            ? 'bg-gradient-to-br from-[#4F8EF7] to-[#25CB78] text-white shadow-md shadow-[#4F8EF7]/20'
                                            : 'text-gray-400'
                                        }`}
                                    >
                                        <Icon size={20} className="sm:w-[24px] sm:h-[24px]" strokeWidth={isActive ? 2.5 : 2} />
                                    </div>

                                    <span className={`w-full text-center text-[9px] sm:text-xs truncate px-0.5
                                        ${isActive
                                            ? "font-bold bg-gradient-to-br from-[#4F8EF7] to-[#25CB78] bg-clip-text text-transparent"
                                            : "text-gray-500 font-medium"
                                        }`}
                                    >
                                        {item.title}
                                    </span>
                                </Link>
                            </Hint>
                        </div>
                    );
                })}
            </nav>
        </div>
    )
}
