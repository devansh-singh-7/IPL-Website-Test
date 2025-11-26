'use client'

import React from 'react'
import { useTranslation } from '@/contexts/TranslationContext'
import { Users, Shield, Star, Linkedin, Mail } from 'lucide-react'

type Person = {
    name: string
    role: string
    img: string
    email?: string
    linkedin?: string
}

const team: { core: Person[]; advisors: Person[] } = {
    core: [
        { name: 'A. Member', role: 'President', img: 'https://api.dicebear.com/7.x/initials/svg?seed=AM', email: '', linkedin: '' },
        { name: 'B. Member', role: 'Vice President', img: 'https://api.dicebear.com/7.x/initials/svg?seed=BM', email: '', linkedin: '' },
        { name: 'C. Member', role: 'General Secretary', img: 'https://api.dicebear.com/7.x/initials/svg?seed=CM', email: '', linkedin: '' },
        { name: 'D. Member', role: 'Treasurer', img: 'https://api.dicebear.com/7.x/initials/svg?seed=DM', email: '', linkedin: '' },
    ],
    advisors: [
        { name: 'E. Advisor', role: 'Advisor', img: 'https://api.dicebear.com/7.x/initials/svg?seed=EA', email: '', linkedin: '' },
        { name: 'F. Advisor', role: 'Advisor', img: 'https://api.dicebear.com/7.x/initials/svg?seed=FA', email: '', linkedin: '' },
    ],
}

const Card: React.FC<{ person: Person }> = ({ person }) => (
    <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-neutral-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-600 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

        <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-linear-to-br from-red-100 to-red-50 group-hover:from-red-600 group-hover:to-red-800 transition-colors duration-300">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <img
                    src={person.img}
                    alt={`${person.name} photo`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
        </div>

        <h3 className="text-xl font-bold text-neutral-900 mb-2">{person.name}</h3>
        <p className="text-red-700 font-medium mb-6">{person.role}</p>

        <div className="flex items-center justify-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {(person.linkedin || person.email) ? (
                <>
                    {person.linkedin && (
                        <a href={person.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-blue-600 text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md" aria-label="LinkedIn">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    )}
                    {person.email && (
                        <a href={`mailto:${person.email}`} className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-red-700 text-neutral-600 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md" aria-label="Email">
                            <Mail className="w-4 h-4" />
                        </a>
                    )}
                </>
            ) : (
                <span className="h-10" /> // Spacer to keep height consistent if no links
            )}
        </div>
    </div>
)

export default function OurTeam() {
    const { t } = useTranslation()
    return (
        <div className="bg-neutral-50 min-h-screen">
            {/* Hero */}
            <section className="bg-white pt-20 pb-16 border-b border-neutral-100">
                <div className="container-custom mx-auto text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6 animate-fade-in">
                        <Users className="w-4 h-4 text-red-700" />
                        <span className="text-sm font-semibold text-red-800">{t('ourteam.badge', 'Leadership & Volunteers')}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 mb-6 animate-slide-up">
                        {t('ourteam.title', 'Our Team')}
                    </h1>

                    <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        {t('ourteam.subtitle', 'The people who nurture the spirit of Love, Friendship, and Humanity')}
                    </p>
                </div>
            </section>

            {/* Core Team */}
            <section className="py-20">
                <div className="container-custom mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-4 border border-neutral-100">
                            <Shield className="w-5 h-5 text-red-700" />
                            <span className="text-sm font-bold text-neutral-700 uppercase tracking-wide">{t('ourteam.core_team', 'Core Team')}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">{t('ourteam.core_desc', 'Guiding IPL with vision and commitment')}</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.core.map((p, i) => (
                            <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                                <Card person={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advisors */}
            <section className="py-20 bg-white border-t border-neutral-100">
                <div className="container-custom mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-50 rounded-full mb-4 border border-neutral-200">
                            <Star className="w-5 h-5 text-amber-500" />
                            <span className="text-sm font-bold text-neutral-700 uppercase tracking-wide">{t('ourteam.advisors', 'Advisors')}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">{t('ourteam.advisors_desc', 'Supporting IPL with experience and guidance')}</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
                        {team.advisors.map((p, i) => (
                            <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                                <Card person={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
