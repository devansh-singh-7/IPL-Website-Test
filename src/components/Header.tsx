'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from '../contexts/TranslationContext'
import { Menu, X, Search, ChevronDown, Globe } from 'lucide-react'

type Props = Record<string, never>
type NavLink = {
  path: string
  label: string
  hasDropdown?: boolean
  dropdownItems?: { path: string; label: string }[]
}

const Header: React.FC<Props> = () => {
  const { lang, toggleLanguage, t } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const desktopSearchRef = useRef<HTMLInputElement | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks: NavLink[] = [
    { path: '/', label: 'nav.home' },
    { path: '/about', label: 'nav.about' },
    { path: '/our-team', label: 'nav.team' },
    { path: '/humanitarian-services', label: 'nav.humanitarian' },
    {
      path: '/news-events',
      label: 'nav.news',
      hasDropdown: true,
      dropdownItems: [
        { path: '/news-events', label: 'nav.news' },
        { path: '/friendship-meet', label: 'nav.meet' },
        { path: '/friends-day', label: 'nav.friendsDay' },
      ],
    },
    { path: '/contact', label: 'nav.contact' },
  ] as const

  const isActive = (path: string) => pathname === path

  const isNewsActive = () => {
    return (
      pathname === '/news-events' ||
      pathname === '/friendship-meet' ||
      pathname === '/friends-day'
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      router.push(`/news-events?q=${encodeURIComponent(q)}`)
      setMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-red-700/90 backdrop-blur-md shadow-md py-2' : 'bg-red-800 py-4'
      }`}
    >
      <div className="container-custom mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-linear-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-red-500/30 transition-all duration-300">
            IPL
          </div>
          <span className={`font-bold text-xl tracking-tight text-white transition-colors ${scrolled ? 'md:block' : 'md:block'}`}>
            {t('home.hero_title', "Indian Penpals' League")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.path}
                className="relative group"
                onMouseEnter={() => setNewsDropdownOpen(true)}
                onMouseLeave={() => setNewsDropdownOpen(false)}
              >
                <button
                  className={`
                    px-4 py-2 text-sm font-medium rounded-full flex items-center gap-1 transition-all duration-200
                    ${isNewsActive()
                      ? 'text-white bg-red-700'
                      : 'text-white/90 hover:text-white hover:bg-red-700/40'}
                  `}
                >
                  {t(link.label as string)}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${newsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                <div
                  className={`
                    absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden
                    transition-all duration-200 origin-top-right
                    ${newsDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
                  `}
                >
                  <div className="p-1">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`
                          block px-4 py-2.5 text-sm rounded-lg transition-colors
                          ${isActive(item.path)
                            ? 'bg-red-700 text-white font-medium'
                            : 'text-neutral-800 hover:bg-red-50 hover:text-red-800'}
                        `}
                        onClick={() => setNewsDropdownOpen(false)}
                      >
                        {item.label.startsWith('nav.') ? t(item.label) : item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                href={link.path}
                className={`
                  px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                  ${isActive(link.path)
                    ? 'text-white bg-red-700'
                    : 'text-white/90 hover:text-white hover:bg-red-700/40'}
                `}
              >
                {t(link.label as string)}
              </Link>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden xl:block relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-white transition-colors" />
            <input
              ref={desktopSearchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('header.search_placeholder', 'Search...')}
              className="w-48 pl-9 pr-4 py-2 rounded-full bg-red-700/40 border-transparent text-sm text-white placeholder-white/70 focus:bg-red-700 focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all outline-none"
            />
          </form>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-red-500 text-white hover:border-red-400 hover:bg-red-700/50 transition-all duration-300"
            title="Switch Language"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-bold uppercase w-5 text-center">
              {lang}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-white hover:bg-red-700/40 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40 bg-red-800/95 text-white backdrop-blur-xl transition-transform duration-300 ease-in-out pt-24 px-6
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col gap-6 h-full overflow-y-auto pb-10">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('header.search_placeholder', 'Search...')}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-red-700/40 text-white placeholder-white/70 focus:ring-2 focus:ring-white/40 outline-none"
            />
          </form>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.path} className="space-y-2">
                  <div className="px-4 py-2 text-xs font-bold text-white/80 uppercase tracking-wider">
                    {t(link.label as string)}
                  </div>
                  <div className="pl-4 space-y-1 border-l-2 border-neutral-100 ml-4">
                    {link.dropdownItems?.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                          block px-4 py-3 rounded-lg text-base font-medium transition-colors
                          ${isActive(item.path)
                            ? 'bg-red-700 text-white'
                            : 'text-white/90 hover:bg-red-700/40 hover:text-white'}
                        `}
                      >
                        {item.label.startsWith('nav.') ? t(item.label) : item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-xl text-lg font-medium transition-colors
                    ${isActive(link.path)
                      ? 'bg-red-700 text-white'
                      : 'text-white/90 hover:bg-red-700/40 hover:text-white'}
                  `}
                >
                  {t(link.label as string)}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
