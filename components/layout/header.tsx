
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { ICONS_NAV, NAV_LINKS } from "@/lib/constants/layout/header";



export const Header = () => {


  return (
    <header className="top-0 z-50 w-full border-b bg-background/90 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left: Mobile Menu + Desktop AnimDex + Nav */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-transparent"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetTitle className="text-2xl font-bold text-primary mb-4 p-3">
                AnimDex
              </SheetTitle>
              <div className="flex flex-col gap-4">
                <nav className="flex flex-col gap-2">
                  {NAV_LINKS.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      asChild
                      className="justify-start text-base font-medium hover:bg-transparent"
                    >
                      <Link className="ps-6" href={link.href}>
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop: AnimDex + Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/">
              <span className="text-2xl font-bold text-primary">AnimDex</span>
            </Link>

            <nav className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  asChild
                  className="hover:text-foreground text-sm font-medium"
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* Center: Mobile AnimDex */}
        <Link href="/" className="md:hidden">
          <span className="text-3xl font-bold text-primary">AnimDex</span>
        </Link>

        {/* Right: User Icon */}
        <div className="flex items-center gap-2">
          {ICONS_NAV.map((icon) => (
            <Link key={icon.href} href={icon.href}>
              <Button
                variant="ghost"
                key={icon.href}
                className="flex items-center gap-2"
              >
                {icon.icon}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
