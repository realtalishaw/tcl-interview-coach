"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Crown, Home, LineChart, Mic2, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Insights", href: "/insights", icon: LineChart },
  { name: "Speaking Practice", href: "/speaking", icon: Mic2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col border-r bg-white">
      <div className="p-6">
        <div className="flex items-center gap-2 font-semibold">
          <Crown className="h-6 w-6 text-pink-500" />
          <span>TCL Interview</span>
        </div>
      </div>

      <div className="flex-1 px-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    pathname === item.href && "bg-pink-50 text-pink-500"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-100" />
            <div className="text-sm">
              <div className="font-medium">Jane Doe</div>
              <div className="text-gray-500">Contestant</div>
            </div>
          </div>
          <div className="flex gap-1">
            <Link href="/settings">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  pathname === "/settings" && "bg-pink-50 text-pink-500"
                )}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}