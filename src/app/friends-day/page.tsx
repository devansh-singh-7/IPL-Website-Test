'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { useTranslation } from '@/contexts/TranslationContext'
import { Search, Calendar, MapPin, Users, ArrowRight } from 'lucide-react'

type EventItem = {
    year: number
    titleKey: string
    descKey: string
    locationKey: string
    attendees?: string
    image?: string
}

const events: EventItem[] = [
    { year: 2024, titleKey: 'friendsDay.2024_title', descKey: 'friendsDay.2024_desc', locationKey: 'friendsDay.loc_mumbai', attendees: '200+', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800' },
    { year: 2023, titleKey: 'friendsDay.2023_title', descKey: 'friendsDay.2023_desc', locationKey: 'friendsDay.loc_pune', attendees: '180+', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800' },
    { year: 2022, titleKey: 'friendsDay.2022_title', descKey: 'friendsDay.2022_desc', locationKey: 'friendsDay.loc_online', attendees: '500+', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800' },
    { year: 2021, titleKey: 'friendsDay.2021_title', descKey: 'friendsDay.2021_desc', locationKey: 'friendsDay.loc_online', attendees: '450+', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800' },
    { year: 2020, titleKey: 'friendsDay.2020_title', descKey: 'friendsDay.2020_desc', locationKey: 'friendsDay.loc_mumbai', attendees: '150+', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800' },
    { year: 2019, titleKey: 'friendsDay.2019_title', descKey: 'friendsDay.2019_desc', locationKey: 'friendsDay.loc_delhi', attendees: '220+', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800' },
]

export default function FriendsDay() {
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedYear, setSelectedYear] = useState<number | 'All'>('All')

    const years = useMemo(() => Array.from(new Set(events.map(e => e.year))).sort((a, b) => b - a), [])

    const filteredEvents = useMemo(() => {
        return events.filter(e => {
            const matchesSearch = t(e.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
                t(e.descKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
                t(e.locationKey).toLowerCase().includes(searchTerm.toLowerCase())
            const matchesYear = selectedYear === 'All' || e.year === selectedYear
            return matchesSearch && matchesYear
        })
    }, [searchTerm, selectedYear, t])

    return (
        <div className="bg-neutral-50 min-h-screen">
            {/* Hero */}
            <section className="relative bg-neutral-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-red-900/50 to-neutral-900/80 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30" />

                <div className="container-custom mx-auto relative z-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in">
                        <Calendar className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-semibold text-white tracking-wide uppercase">
                            {t('friendsDay.badge', 'Annual Celebration')}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight animate-slide-up">
                        {t('friendsDay.title', 'Friends Day')}
                    </h1>

                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        {t('friendsDay.subtitle', 'A timeline of our cherished gatherings, celebrating the bond that unites us all.')}
                    </p>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-200 py-4 shadow-sm">
                <div className="container-custom mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 group-focus-within:text-primary-600 transition-colors" />
                            <input
                                type="text"
                                placeholder={String(t('friendsDay.search_placeholder', 'Search events, locations...'))}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-full bg-neutral-100 border-transparent focus:bg-white focus:border-red-700 focus:ring-4 focus:ring-red-700/10 transition-all outline-none text-neutral-900 placeholder-neutral-500"
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                            <button
                                onClick={() => setSelectedYear('All')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedYear === 'All'
                                        ? 'bg-red-700 text-white shadow-lg shadow-red-700/30'
                                        : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                                    }`}
                            >
                                All Years
                            </button>
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedYear === year
                                            ? 'bg-red-700 text-white shadow-lg shadow-red-700/30'
                                            : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20">
                <div className="container-custom mx-auto max-w-5xl">
                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-300">
                            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-neutral-400" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">No events found</h3>
                            <p className="text-neutral-500">Try adjusting your search or filters</p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedYear('All') }}
                                className="mt-6 text-red-700 font-semibold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2 hidden md:block" />

                            <div className="space-y-12">
                                {filteredEvents.map((event, index) => (
                                    <div
                                        key={event.year}
                                        className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                            }`}
                                    >
                                        {/* Content Side */}
                                        <div className="w-full md:w-1/2 group">
                                            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-red-700 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-3xl font-black text-neutral-200 group-hover:text-red-100 transition-colors">
                                                        {event.year}
                                                    </span>
                                                    <div className="flex items-center gap-2 text-sm text-neutral-500 bg-neutral-50 px-3 py-1 rounded-full">
                                                        <MapPin className="w-3 h-3" />
                                                        {t(event.locationKey)}
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-red-700 transition-colors">
                                                    {t(event.titleKey)}
                                                </h3>

                                                <p className="text-neutral-600 mb-6 leading-relaxed">
                                                    {t(event.descKey)}
                                                </p>

                                                {event.image && (
                                                    <div className="h-48 rounded-xl overflow-hidden mb-4 relative">
                                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                                                        <Image
                                                            src={event.image}
                                                            alt={String(t(event.titleKey))}
                                                            fill
                                                            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            priority={false}
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                                                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-600">
                                                        <Users className="w-4 h-4 text-red-600" />
                                                        {event.attendees} Attendees
                                                    </div>
                                                    <button className="text-red-700 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                        Gallery <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Center Dot */}
                                        <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full border-4 border-red-100 shadow-sm shrink-0 md:order-0 order-first">
                                            <div className="w-2.5 h-2.5 bg-red-700 rounded-full" />
                                        </div>

                                        {/* Empty Side for Layout Balance */}
                                        <div className="w-full md:w-1/2 hidden md:block" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
