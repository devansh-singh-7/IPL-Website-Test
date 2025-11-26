'use client'

import React, { useEffect, useMemo, useState, Suspense } from 'react'
import { useTranslation } from '@/contexts/TranslationContext'
import { Calendar, MapPin, Clock, TrendingUp, Sparkles, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface NewsItem {
    id: number
    date: string
    year: string
    titleEn: string
    locationEn: string
    descriptionEn: string
}

function NewsEventsContent() {
    const { t } = useTranslation()
    const [currentPage, setCurrentPage] = useState(1)
    const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid')
    const searchParams = useSearchParams()
    const searchQuery = (searchParams.get('q') || '').trim()

    const newsItems: NewsItem[] = useMemo(
        () => [
            { id: 136, date: '22 DEC', year: '2024', titleEn: 'Chennai Regional Branch Friends Meeting', locationEn: 'Moovarasampettai, Chennai', descriptionEn: 'Chennai Regional Branch Friends Meeting' },
            { id: 135, date: '25 MAY', year: '2024', titleEn: '27th Friendship Meet', locationEn: 'Kuttalam', descriptionEn: '27th Friendship Meet at TMNS Hall, Kuttalam, Tenkasi District' },
            { id: 134, date: '03 MAR', year: '2024', titleEn: 'IPL Chess Academy Festival', locationEn: 'Pavoorchathiram', descriptionEn: 'IPL Chess Academy - Chess Festival, Pavoorchathiram' },
            { id: 133, date: '24 FEB', year: '2024', titleEn: 'Kanyakumari District Branch Friends Meeting', locationEn: 'Kanyakumari', descriptionEn: 'Kanyakumari District Branch Friends Meeting at Devadas Sweet Home Hall' },
            { id: 132, date: '11 FEB', year: '2024', titleEn: "27th Friendship Meet - President's Announcement", locationEn: 'India', descriptionEn: "Indian Penpals' League, Mumbai" },
            { id: 131, date: '20 JAN', year: '2024', titleEn: 'Krishnagiri Regional Branch Friends Meeting', locationEn: 'Hosur', descriptionEn: "St. John Bosco Girls Higher Secondary School - Hosur" },
            { id: 130, date: '12 JAN', year: '2024', titleEn: 'Tamil Nadu Government NRI Tamil Day Celebration', locationEn: 'Tamil Nadu', descriptionEn: 'Tamil Nadu Government NRI Tamil Day - Award to IPL President' },
            { id: 129, date: '30 DEC', year: '2023', titleEn: 'IPL Chess Tournament', locationEn: 'Mumbai', descriptionEn: 'Chess tournament organized by IPL Chess Academy with Mumbai District Chess Association' },
            { id: 128, date: '17 DEC', year: '2023', titleEn: 'Cash Prize for Tamil Nadu Kho-Kho Players', locationEn: 'Tamil Nadu', descriptionEn: 'National Kho-Kho Championship - Cash prizes for Tamil Nadu women players' },
            { id: 125, date: '19 DEC', year: '2023', titleEn: 'Thiruvalluvar Statue Inauguration', locationEn: 'Paris, France', descriptionEn: 'Thiruvalluvar Statue Inauguration - Cergy, Paris, France' },
            { id: 127, date: '16 JUL', year: '2023', titleEn: 'Chennai District Branch Friends Discussion', locationEn: 'Chennai', descriptionEn: 'Distribution of school uniforms and educational materials by Chennai District Branch' },
            { id: 124, date: '25 JUN', year: '2023', titleEn: 'Thirukkural as Indian National Book - International Conference', locationEn: 'New Delhi', descriptionEn: 'International Conference on Thirukkural as Indian National Book - New Delhi' },
            { id: 126, date: '26 JUN', year: '2023', titleEn: 'IPL Chess Academy Tournament', locationEn: 'Pavoorchathiram, Tenkasi', descriptionEn: 'IPL Chess Academy tournament, Pavoorchathiram, Tenkasi District' },
            { id: 123, date: '01 JAN', year: '2023', titleEn: 'Tamil Festival 2023 Competition Winners', locationEn: 'India', descriptionEn: 'Independence Day 2022 / Tamil Festival 2023 competition for students' },
            { id: 122, date: '18 JUN', year: '2023', titleEn: 'IPL New Delhi State Branch Friends Meeting', locationEn: 'New Delhi', descriptionEn: 'New Delhi State Branch Friends Meeting - Press Club, Raisina Road' },
            { id: 121, date: '02 JUN', year: '2023', titleEn: 'IPL Bahrain Branch Inauguration', locationEn: 'Bahrain', descriptionEn: 'Bahrain Branch Inauguration at The Olive Hotel Auditorium, Juffair, Manama' },
            { id: 120, date: '20 MAY', year: '2023', titleEn: '26th Friendship Meet', locationEn: 'New Delhi', descriptionEn: '26th Friendship Meet at Shri Vittal Mandir Hall, Ramakrishnapuram, New Delhi' },
            { id: 119, date: '16 FEB', year: '2023', titleEn: "IPL President's Daughter Saranya-Rohit Wedding", locationEn: 'India', descriptionEn: 'IPL President\'s family wedding - Heartfelt thanks to all who participated' },
            { id: 118, date: '16 FEB', year: '2023', titleEn: "IPL President's Family Wedding", locationEn: 'Secunderabad', descriptionEn: "IPL President's family wedding at Secunderabad" },
            { id: 117, date: '05 FEB', year: '2023', titleEn: 'Rajasthan State Branch Friends Meeting', locationEn: 'Bhiwadi, Rajasthan', descriptionEn: 'Rajasthan State Branch Friends Meeting at Bhiwadi Bikaner Restaurant' }
        ],
        []
    )

    const q = searchQuery.toLowerCase()

    const filteredNews = useMemo(() => {
        if (!q) return newsItems
        return newsItems.filter((item) =>
            item.titleEn.toLowerCase().includes(q) ||
            item.descriptionEn.toLowerCase().includes(q) ||
            item.locationEn.toLowerCase().includes(q)
        )
    }, [q, newsItems])

    useEffect(() => setCurrentPage(1), [q])

    const itemsPerPage = viewMode === 'grid' ? 9 : 10
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentItems = filteredNews.slice(startIndex, startIndex + itemsPerPage)

    const safeT = (key: string, fallback: string) => String(t(key, fallback))

    // Get featured (latest 3)
    const featuredEvents = filteredNews.slice(0, 3)

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Magazine Style */}
            <section className="relative bg-linear-to-br from-red-900 via-red-800 to-red-700 text-white overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="container mx-auto px-4 py-24 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-semibold">Latest Updates</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            News & Events
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            Discover the latest happenings, milestones, and celebrations from the Indian Penpals' League community
                        </p>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Featured Events Section */}
            <section className="container mx-auto px-4 -mt-16 relative z-20 mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <TrendingUp className="w-6 h-6 text-red-700" />
                    <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {featuredEvents.map((item, index) => (
                        <article
                            key={item.id}
                            className="group relative bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-linear-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative p-6">
                                {/* Badge */}
                                <div className="absolute top-4 right-4">
                                    <div className="px-3 py-1 bg-red-700 text-white text-xs font-bold rounded-full">
                                        NEW
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-12 h-12 bg-linear-to-br from-red-600 to-red-700 rounded-xl flex flex-col items-center justify-center text-white shadow-lg">
                                        <span className="text-xs font-semibold">{item.date.split(' ')[1]}</span>
                                        <span className="text-lg font-bold leading-none">{item.date.split(' ')[0]}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{item.year}</p>
                                        <p className="text-xs text-gray-500">Event #{item.id}</p>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-700 transition-colors">
                                    {item.titleEn}
                                </h3>

                                <div className="flex items-start gap-2 mb-4">
                                    <MapPin className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                                    <p className="text-sm text-gray-600 line-clamp-1">{item.locationEn}</p>
                                </div>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                    {item.descriptionEn}
                                </p>

                                <button className="inline-flex items-center gap-2 text-red-700 font-semibold text-sm group-hover:gap-3 transition-all">
                                    Learn More
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* View Toggle */}
            <section className="container mx-auto px-4 mb-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">All Events</h2>
                    <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${viewMode === 'grid'
                                    ? 'bg-white text-red-700 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Grid View
                        </button>
                        <button
                            onClick={() => setViewMode('timeline')}
                            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${viewMode === 'timeline'
                                    ? 'bg-white text-red-700 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Timeline
                        </button>
                    </div>
                </div>
            </section>

            {/* Events Grid/Timeline */}
            <section className="container mx-auto px-4 pb-16">
                {viewMode === 'grid' ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentItems.map((item, index) => (
                            <article
                                key={item.id}
                                className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-red-700">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm font-bold">{item.date}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{item.year}</span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                    {item.titleEn}
                                </h3>

                                <div className="flex items-start gap-2 mb-3">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                    <p className="text-sm text-gray-600 line-clamp-1">{item.locationEn}</p>
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                    {item.descriptionEn}
                                </p>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                    <button className="text-red-700 font-semibold text-sm hover:text-red-800">
                                        Read More →
                                    </button>
                                    <span className="text-xs text-gray-400">#{item.id}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-red-200 via-red-300 to-red-200"></div>

                            <div className="space-y-8">
                                {currentItems.map((item, index) => (
                                    <div key={item.id} className="relative flex gap-6">
                                        {/* Timeline dot */}
                                        <div className="relative shrink-0">
                                            <div className="w-16 h-16 bg-linear-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white shadow-lg z-10 relative">
                                                <Clock className="w-6 h-6" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="px-3 py-1 bg-red-50 text-red-800 text-sm font-bold rounded-full">
                                                    {item.date}
                                                </span>
                                                <span className="text-sm text-gray-500">{item.year}</span>
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {item.titleEn}
                                            </h3>

                                            <div className="flex items-start gap-2 mb-3">
                                                <MapPin className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                                                <p className="text-sm text-gray-600">{item.locationEn}</p>
                                            </div>

                                            <p className="text-gray-600 mb-4">
                                                {item.descriptionEn}
                                            </p>

                                            <button className="inline-flex items-center gap-2 text-red-700 font-semibold text-sm hover:gap-3 transition-all">
                                                View Details
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-red-700 text-white hover:bg-red-800 shadow-md hover:shadow-lg'
                                }`}
                        >
                            Previous
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-12 h-12 rounded-lg font-bold transition-all ${page === currentPage
                                            ? 'bg-red-700 text-white shadow-lg scale-110'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-red-700 text-white hover:bg-red-800 shadow-md hover:shadow-lg'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}

export default function NewsEvents() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>}>
            <NewsEventsContent />
        </Suspense>
    )
}
