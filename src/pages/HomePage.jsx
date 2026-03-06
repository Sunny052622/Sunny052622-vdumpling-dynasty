import React from 'react';
import Hero from '../components/Hero';
import Offers from '../components/Offers';
import AboutSection from '../components/AboutSection';
import MenuTeaser from '../components/MenuTeaser';
import JourneySection from '../components/JourneySection';
import MenuSection from '../components/MenuSection';
import Contact from '../components/Contact';

import { useNavigate } from 'react-router-dom';

const HomePage = ({ openModal, onOpenOutletModal }) => {
    const navigate = useNavigate();

    const handleNavigate = (view) => {
        if (view === 'menuPage') {
            onOpenOutletModal();
        } else if (view === 'home') {
            navigate('/');
        }
    };

    return (
        <main>
            <Hero onNavigate={handleNavigate} onOpenOutletModal={onOpenOutletModal} />
            <Offers onLearnMore={openModal} />
            <AboutSection
                title="Our Journey: Passion & Plates"
                subtitle="Nepali Flavors, Bhubaneswar Heart"
                description="Discover how our love for authentic momos sparked the creation of VDumpling Dynasty, blending traditional recipes with a fresh, local vibe."
                imageUrl="/images/about/nepal-bhubaneswar-map.jpg"
                imageAlt="Map showing Nepal and Bhubaneswar connection"
                reverse={false}
                onNavigate={handleNavigate}
                variant="overlay"
            />
            <MenuTeaser onNavigate={handleNavigate} onOpenOutletModal={onOpenOutletModal} />
            <AboutSection
                title="Freshly Folded, Daily"
                subtitle="The Art of the Perfect Momo"
                description="We believe in quality ingredients and traditional techniques. Taste the difference that hand-crafted care makes in every single bite."
                imageUrl="/images/about/momo-making-process.jpg"
                videoUrl="/videos/about/momo-making-process.mp4"
                imageAlt="Artisanal momo making process"
                reverse={true}
                onNavigate={handleNavigate}
            />
            <JourneySection />
            <MenuSection onNavigate={handleNavigate} onOpenOutletModal={onOpenOutletModal} />
            <Contact />
        </main>
    );
};

export default HomePage;
