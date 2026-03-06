import React from 'react';
import OfferCardThemed from './OfferCardThemed';

const Offers = ({ onLearnMore }) => (
    <section id="offers" className="py-10 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">Taste More, Save More</h2>
            <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                Check out our latest deals and rewards. There's always something exciting cooking at VDumpling Dynasty!
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                <OfferCardThemed
                    title="Momo Mania Wednesdays"
                    description="Grab special discounts on all veg & chicken momos every Wednesday."
                    flyerUrl="/images/offers/momo-mania.jpg"
                    onLearnMore={onLearnMore}
                />
                <OfferCardThemed
                    title="Dynasty Combos"
                    description="Perfectly paired meals featuring momos, sides, and drinks at great prices."
                    flyerUrl="/images/offers/dynasty-combo.jpg"
                    onLearnMore={onLearnMore}
                />
                <OfferCardThemed
                    title="Loyalty Perks"
                    description="Join the Dynasty! Earn points and unlock exclusive rewards with every order."
                    flyerUrl="/images/offers/loyalty-perks.jpg"
                    onLearnMore={onLearnMore}
                />
            </div>
        </div>
    </section>
);

export default Offers;
