'use client';

import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Globe,
  LayoutDashboard,
  Link2,
  LogOut,
  Mail,
  Menu,
  Moon,
  Settings,
  Sun,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can add actual dark mode logic here
    document.documentElement.classList.toggle('dark');
  };

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'JP', name: '日本語' },
    { code: 'CN', name: '中文' },
    { code: 'KR', name: '한국어' }
  ];

  return (
    <nav className="fixed top-0 w-screen bg-white dark:bg-neutral-800 z-50 border-b border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between px-4 md:px-16 h-16">
        {/* Left: Company Name + Hamburger + Search */}
        <div className="flex items-center gap-4 flex-grow">
          {/* Company Name - Desktop/Tablet Only */}
          <div className="hidden md:flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              NEXT japanese
            </h1>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
             
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Search Bar
          <form className="flex w-full max-w-xs sm:max-w-sm md:max-w-md">
            <input
              type="text"
              placeholder="Search products"
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-100 dark:bg-neutral-800 text-sm outline-none"
            />
          </form> */}
        </div>

        {/* Right: Icons & Profile - Desktop/Tablet Only */}
        <div className="hidden md:flex items-center gap-4">
        

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">{currentLanguage}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="hidden group-hover:flex absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-700 rounded-md flex-col z-50">
              <h6 className="px-4 py-2 font-semibold text-gray-900 dark:text-white">Language</h6>
              <div className="border-t border-neutral-200 dark:border-neutral-700" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLanguage(lang.code)}
                  className={`flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer text-left w-full ${
                    currentLanguage === lang.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <span className="text-sm font-medium">{lang.code}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* <CreateButton /> */}
          <IconLink icon={<LayoutDashboard className="h-5 w-5" />} />
          <DropdownWrapper
            icon={<Mail className="h-5 w-5" />}
            badgeColor="bg-green-600"
            title="Messages"
            items={[
              {
                img: '/assets/images/faces/face4.jpg',
                label: 'Mark sent you a message',
                sub: '1 minute ago',
              },
              {
                img: '/assets/images/faces/face2.jpg',
                label: 'Cregh sent you a message',
                sub: '15 minutes ago',
              },
              {
                img: '/assets/images/faces/face3.jpg',
                label: 'Profile picture updated',
                sub: '18 minutes ago',
              },
            ]}
          />
          <DropdownWrapper
            icon={<Bell className="h-5 w-5" />}
            badgeColor="bg-red-500"
            title="Notifications"
            items={[
              {
                icon: <Calendar className="text-green-500" />,
                label: 'Event today',
                sub: 'Just a reminder that you have an event',
              },
              {
                icon: <Settings className="text-red-500" />,
                label: 'Settings',
                sub: 'Update dashboard',
              },
              {
                icon: <Link2 className="text-yellow-500" />,
                label: 'Launch Admin',
                sub: 'New admin wow!',
              },
            ]}
          />
          <ProfileDropdown />
        </div>
      </div>

      {/* Mobile Dropdown - Only for mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4">
          {/* <CreateButton /> */}
          <IconLink icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
          <IconLink icon={<BarChart3 className="h-5 w-5" />} label="Analytics" />
          <ProfileDropdown />
        </div>
      )}
    </nav>
  );
}


function IconLink({ icon, label }) {
  return (
    <Link href="#" className="p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center gap-2">
      {icon}
      {label && <span className="text-sm">{label}</span>}
    </Link>
  );
}

function ProfileDropdown() {
  return (
    <div className="relative group">
      <div className="flex items-center gap-2 cursor-pointer">
        <Image
          src="/assets/images/faces/face15.jpg"
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full"
        />
        <p className="hidden sm:block text-sm font-medium text-gray-900 dark:text-white">Henry Klein</p>
        <ChevronDown className="hidden sm:block h-4 w-4" />
      </div>
      <div className="hidden group-hover:flex absolute right-0 top-full mt-2 w-64 bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-700 rounded-md flex-col z-50">
        <h6 className="px-4 py-2 font-semibold text-gray-900 dark:text-white">Profile</h6>
        <div className="border-t border-neutral-200 dark:border-neutral-700" />
        <DropdownItem icon={<Settings className="text-green-500" />} label="Settings" />
        <DropdownItem icon={<LogOut className="text-red-500" />} label="Log out" />
        <p className="text-center text-sm py-2 text-neutral-500">Advanced settings</p>
      </div>
    </div>
  );
}

function DropdownItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
      <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <p className="text-sm text-gray-900 dark:text-white">{label}</p>
    </div>
  );
}

function DropdownWrapper({ icon, badgeColor, title, items }) {
  return (
    <div className="relative group">
      <div className="relative p-2 cursor-pointer rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800">
        {icon}
        <span className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${badgeColor}`} />
      </div>
      <div className="hidden group-hover:flex absolute right-0 top-full mt-2 w-72 bg-white dark:bg-neutral-900 shadow-lg border border-neutral-200 dark:border-neutral-700 rounded-md flex-col z-50">
        <h6 className="px-4 py-2 font-semibold text-gray-900 dark:text-white">{title}</h6>
        <div className="border-t border-neutral-200 dark:border-neutral-700" />
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          >
            {item.img ? (
              <Image
                src={item.img}
                alt={item.label}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
              <p className="text-xs text-neutral-500">{item.sub}</p>
            </div>
          </div>
        ))}
        <p className="text-center text-sm py-2 text-neutral-500">See all {title.toLowerCase()}</p>
      </div>
    </div>
  );
}
