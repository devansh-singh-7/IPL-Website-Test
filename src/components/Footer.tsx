'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from '../contexts/TranslationContext'
import { Mail, Phone, MapPin, Heart, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react'

type Props = Record<string, never>

const Footer: React.FC<Props> = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-20 pb-10">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-900/20">
                IPL
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Indian Penpals' League
              </span>
            </Link>
            <p className="text-neutral-400 leading-relaxed">
              {t('footer.about_text', 'Love, Friendship & Humanity — A confederation of friends united to serve communities.')}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-red-700 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t('footer.quick_links', 'Quick Links')}</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'nav.home' },
                { to: '/about', label: 'nav.about' },
                { to: '/our-team', label: 'nav.team' },
                { to: '/humanitarian-services', label: 'nav.humanitarian' },
                { to: '/news-events', label: 'nav.news' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="flex items-center gap-2 text-neutral-400 hover:text-red-400 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t('nav.events', 'Events')}</h3>
            <ul className="space-y-3">
              {[
                { to: '/friendship-meet', label: 'nav.meet' },
                { to: '/friends-day', label: 'nav.friendsDay' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="flex items-center gap-2 text-neutral-400 hover:text-red-400 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t('footer.contact_us', 'Contact Us')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                <p className="text-neutral-400 text-sm leading-relaxed">
                  103, Starview Apts., Opp. Corporate Park,<br />
                  V.N.Purav Marg, Chembur,<br />
                  Mumbai - 400071, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-600 shrink-0" />
                <a href="tel:+919892035187" className="text-neutral-400 hover:text-red-300 transition-colors text-sm">
                  +91 9892035187
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-600 shrink-0" />
                <a href="mailto:iplmumbai12395@gmail.com" className="text-neutral-400 hover:text-red-300 transition-colors text-sm">
                  iplmumbai12395@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm text-center md:text-left">
            © {currentYear} Indian Penpals' League. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
