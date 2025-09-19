'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Users, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AdminSidebar = () => {
    const pathname = usePathname();
    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: BarChart },
        { href: '/admin/farmers', label: 'Farmer Management', icon: Users },
        { href: '/admin/content', label: 'Content Management', icon: FileText },
    ];

    return (
        <aside className="w-64 flex-col border-r bg-gray-900 text-white p-4 hidden md:flex">
            <div className="flex items-center gap-2 mb-8">
                <span className="text-2xl font-bold">🌾 Admin Panel</span>
            </div>
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-gray-800',
                            { 'bg-gray-800 font-bold text-white': pathname === item.href }
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};