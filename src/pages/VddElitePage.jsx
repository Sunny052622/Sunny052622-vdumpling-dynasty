import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Percent, Gift, Zap, CreditCard, ScanLine, PartyPopper, ChevronDown, ChevronUp } from 'lucide-react';

// --- Animated Counter ---
const AnimatedCounter = ({ target, suffix = '%', duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

// --- CSS-Only Elite Card Visual ---
const EliteCard = () => (
  <div className="elite-card-wrapper mx-auto w-full max-w-[340px] perspective-1000">
    <div className="elite-card relative w-full aspect-[1.6/1] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-amber-700/30">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 40%, #1a1a1a 60%, #262626 100%)',
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Gold shimmer line */}
      <div className="elite-shimmer absolute inset-0 opacity-20" />

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-amber-400/60 text-[10px] font-semibold uppercase tracking-[0.3em]">VDumpling Dynasty</p>
            <h3
              className="text-3xl font-black tracking-wider mt-0.5"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 40%, #D4AF37 60%, #B8860B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ELITE
            </h3>
          </div>
          <Shield className="w-6 h-6 text-amber-400/50" />
        </div>

        {/* Bottom row */}
        <div>
          <p className="text-amber-400/40 text-[11px] font-mono tracking-[0.25em]">1509 2023 0000 1007</p>
          <p className="text-amber-400/30 text-[9px] uppercase tracking-widest mt-1">Narprabha Foods LLP</p>
        </div>
      </div>
    </div>
  </div>
);

// --- Privilege Card ---
const PrivilegeCard = ({ icon: Icon, title, value, valueSuffix, description, delay, accent }) => (
  <div
    className="privilege-card animate-fadeInUp bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-amber-700/40 transition-all duration-500 group"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${accent}`}>
      <Icon className="w-5 h-5" />
    </div>

    <div className="text-4xl font-black text-white mb-1">
      <AnimatedCounter target={value} suffix={valueSuffix} />
    </div>

    <h3 className="text-base font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
  </div>
);

// --- Step Card ---
const StepCard = ({ step, icon: Icon, title, description, delay }) => (
  <div
    className="animate-fadeInUp flex gap-4 items-start"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
      <span
        className="text-sm font-bold"
        style={{
          background: 'linear-gradient(135deg, #D4AF37, #F5E6A3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {step}
      </span>
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-amber-400/70" />
        <h3 className="font-bold text-white text-[15px]">{title}</h3>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

// --- Main Page ---
const VddElitePage = () => {
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>VDDian Elite | VDumpling Dynasty</title>
        <meta name="description" content="VDDian Elite - Your passport to exclusive privileges at VDumpling Dynasty. Flat 10% off, birthday discounts, and early access to new launches." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div
        className="min-h-screen"
        style={{
          background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
        }}
      >
        {/* --- Hero Section --- */}
        <section className="pt-12 pb-10 px-4">
          <div className="max-w-md mx-auto text-center">
            {/* Small brand tag */}
            <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1 mb-6">
              <Shield className="w-3 h-3 text-amber-400" />
              <span className="text-[11px] text-amber-300/80 font-semibold uppercase tracking-widest">Exclusive Membership</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-black text-white mb-2 leading-tight">
              VDDian{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 40%, #D4AF37 60%, #B8860B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Elite
              </span>
            </h1>
            <p className="text-gray-400 text-sm mb-8">Your passport to exclusive privileges</p>

            {/* Card visual */}
            <EliteCard />
          </div>
        </section>

        {/* --- Privileges Section --- */}
        <section className="py-10 px-4">
          <div className="max-w-md mx-auto">
            <p className="text-[10px] text-amber-400/60 font-semibold uppercase tracking-[0.2em] mb-1 text-center">Your Privileges</p>
            <h2 className="text-2xl font-bold text-white text-center mb-8">What You Unlock</h2>

            <div className="space-y-4">
              <PrivilegeCard
                icon={Percent}
                title="Flat Discount"
                value={10}
                valueSuffix="% OFF"
                description="Valid on every order above ₹150 across all VDumpling Dynasty outlets."
                delay={0}
                accent="bg-nepal-red/20 text-nepal-red"
              />

              <PrivilegeCard
                icon={Gift}
                title="Birthday Special"
                value={25}
                valueSuffix="% OFF"
                description="Celebrate your special day with an exclusive discount. Our treat to you."
                delay={100}
                accent="bg-amber-400/15 text-amber-400"
              />

              <PrivilegeCard
                icon={Zap}
                title="Early Access"
                value={100}
                valueSuffix="%"
                description="Be the first to try every new menu launch before anyone else."
                delay={200}
                accent="bg-nepal-blue/20 text-blue-400"
              />
            </div>
          </div>
        </section>

        {/* --- How It Works --- */}
        <section className="py-10 px-4">
          <div className="max-w-md mx-auto">
            <p className="text-[10px] text-amber-400/60 font-semibold uppercase tracking-[0.2em] mb-1 text-center">How It Works</p>
            <h2 className="text-2xl font-bold text-white text-center mb-8">3 Simple Steps</h2>

            <div className="space-y-6 bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
              <StepCard
                step="1"
                icon={ScanLine}
                title="Scan & Pay"
                description="Scan the QR code at any VDumpling Dynasty outlet and pay ₹301 to join VDDian Elite for 1 year."
                delay={0}
              />

              <div className="w-px h-4 bg-amber-400/10 ml-5" />

              <StepCard
                step="2"
                icon={CreditCard}
                title="Present or Scan & Order"
                description="Show your card at billing, or scan and order directly — no need to stand in queue."
                delay={100}
              />

              <div className="w-px h-4 bg-amber-400/10 ml-5" />

              <StepCard
                step="3"
                icon={PartyPopper}
                title="Enjoy Your Privileges"
                description="Discounts apply instantly. Birthday perks activate on your registered date."
                delay={200}
              />
            </div>
          </div>
        </section>

        {/* --- Get Your Card (no CTA button) --- */}
        <section className="py-10 px-4">
          <div className="max-w-md mx-auto text-center">
            <div
              className="rounded-2xl p-8 border border-amber-700/20"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)',
              }}
            >
              <Shield className="w-8 h-8 text-amber-400/60 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-3">Join Now at &#8377;301</h2>
              <p className="text-lg font-semibold text-amber-300/90 mb-2">For 1 Year Membership</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Scan the QR code on the standee at any VDumpling Dynasty outlet to pay and join instantly.<br />
                Your card will be activated with your mobile number on the spot.
              </p>
            </div>
          </div>
        </section>

        {/* --- Terms & Conditions (collapsible) --- */}
        <section className="py-6 px-4">
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setTermsOpen(!termsOpen)}
              className="w-full flex items-center justify-between text-gray-500 hover:text-gray-300 transition-colors py-2"
            >
              <span className="text-xs font-medium uppercase tracking-wider">Terms & Conditions</span>
              {termsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                termsOpen ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
                <ul className="space-y-2 text-xs text-gray-500 leading-relaxed">
                  <li>Valid for 1 year from the date of activation.</li>
                  <li>Mapped to your registered mobile number (OTP verified).</li>
                  <li>Non-transferable and cannot be clubbed with other offers.</li>
                  <li>Applicable across all outlets.</li>
                  <li>Please present card before billing.</li>
                </ul>
                <p className="text-[10px] text-gray-600 mt-3 pt-3 border-t border-gray-800">
                  Management reserves all rights to modify or revoke benefits without notice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="py-8 px-4 text-center">
          <p className="text-[11px] text-gray-600">Narprabha Foods LLP</p>
          <p className="text-[10px] text-gray-700 mt-1">Khorda, Odisha - 752054</p>
        </footer>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(15deg); }
          100% { transform: translateX(200%) rotate(15deg); }
        }
        .elite-shimmer::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212, 175, 55, 0.15) 45%,
            rgba(245, 230, 163, 0.25) 50%,
            rgba(212, 175, 55, 0.15) 55%,
            transparent 100%
          );
          animation: shimmer 3s ease-in-out infinite;
        }

        .elite-card {
          transition: transform 0.4s ease;
        }
        .elite-card:hover {
          transform: rotateY(-5deg) rotateX(3deg) scale(1.02);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </>
  );
};

export default VddElitePage;
