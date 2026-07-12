import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, ArrowRight, Phone, PiggyBank, Award,
    UtensilsCrossed, Wallet, Sparkles,
} from 'lucide-react';
import EliteCardVisual from '../components/EliteCardVisual';
import {
    CARD_FEE, formatCurrency, getMultiplierMessage,
    calculateSavings, calculateSIPFutureValue,
} from '../utils/calculatorUtils';

// TODO: paste the card purchase link here when ready (same as homepage).
const BUY_CARD_URL = '';

const VISIT_PRESETS = [
    { value: 4, label: 'Once a week' },
    { value: 8, label: 'Twice a week' },
    { value: 12, label: 'Regular' },
    { value: 20, label: 'Super fan' },
];

const SPEND_PRESETS = [
    { value: 200, label: 'Solo Mo:Mo' },
    { value: 350, label: 'For two' },
    { value: 600, label: 'Small squad' },
    { value: 900, label: 'Full feast' },
];

const STEPS = ['Visits', 'Spend', 'Savings'];

const EliteCalculatorPage = () => {
    const [step, setStep] = useState(0);
    const [visits, setVisits] = useState(8);
    const [orderValue, setOrderValue] = useState(300);

    const { yearlySpend, grossSavings, netSavings, multiplier } = calculateSavings(visits, orderValue);
    const sip = calculateSIPFutureValue(netSavings);
    const isPositive = netSavings > 0;

    const next = () => setStep((s) => Math.min(2, s + 1));
    const back = () => setStep((s) => Math.max(0, s - 1));

    return (
        <>
            <Helmet>
                <title>Elite Savings Calculator | VDumpling Dynasty</title>
                <meta
                    name="description"
                    content="See how much the ₹505 VDD Elite card saves you in a year — flat 10% off every order at VDumpling Dynasty. Two quick questions, instant answer."
                />
            </Helmet>

            <div className="min-h-[100svh] bg-ink text-white relative overflow-hidden grain flex flex-col">
                {/* Atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,56,147,0.35),transparent_55%)]" aria-hidden="true" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(220,20,60,0.22),transparent_55%)]" aria-hidden="true" />
                <span className="absolute -right-8 top-1/4 font-accent text-[14rem] leading-none text-white/[0.04] select-none pointer-events-none" aria-hidden="true">म:</span>

                {/* Top bar */}
                <header className="relative z-10 flex items-center justify-between px-5 pt-5 max-w-lg mx-auto w-full">
                    <Link to="/" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-semibold transition-colors">
                        <ArrowLeft size={16} /> VDumpling Dynasty
                    </Link>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-lantern/15 border border-lantern/30 text-lantern text-[10px] font-extrabold tracking-widest uppercase px-3 py-1">
                        <Award size={11} /> Elite
                    </span>
                </header>

                <main className="relative z-10 flex-1 w-full max-w-lg mx-auto px-5 pb-10 flex flex-col">
                    {/* Card */}
                    <EliteCardVisual className="rise-in mt-6" />

                    <h1 className="rise-in font-display font-extrabold text-3xl sm:text-4xl leading-tight tracking-tight mt-7" style={{ '--d': '0.1s' }}>
                        {step === 0 && <>How often do you<br />eat with us?</>}
                        {step === 1 && <>What's your usual<br />bill per visit?</>}
                        {step === 2 && (isPositive
                            ? <>Your card pays for itself <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-lantern">{multiplier.toFixed(1)}×</span> over.</>
                            : <>Almost there —<br />visit a little more.</>)}
                    </h1>
                    <p className="rise-in text-white/60 text-sm mt-2 leading-relaxed" style={{ '--d': '0.2s' }}>
                        {step < 2
                            ? 'The VDD Elite card gives a flat 10% off every order. Two quick questions and we\'ll show your yearly savings.'
                            : `Based on ${visits} visits/month at ~${formatCurrency(orderValue)} each.`}
                    </p>

                    {/* Progress */}
                    <div className="flex items-center gap-2 mt-6" role="tablist" aria-label="Steps">
                        {STEPS.map((s, i) => (
                            <button
                                key={s}
                                onClick={() => i < step && setStep(i)}
                                aria-current={step === i}
                                className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                                    i < step ? 'bg-lantern' : i === step ? 'bg-crimson' : 'bg-white/15'
                                }`}
                                aria-label={s}
                            />
                        ))}
                    </div>
                    <p className="text-white/40 text-[10px] font-bold tracking-mega uppercase mt-2">
                        Step {step + 1} of 3 — {STEPS[step]}
                    </p>

                    {/* ── Step 1: Visits ─────────────────────────────── */}
                    {step === 0 && (
                        <div className="mt-8 space-y-7">
                            <div className="text-center">
                                <span className="inline-flex items-center gap-3 rounded-2xl bg-white/[0.05] border border-white/10 px-8 py-4">
                                    <UtensilsCrossed size={22} className="text-crimson" />
                                    <span className="font-display font-extrabold text-5xl">{visits}</span>
                                    <span className="text-white/50 text-sm font-semibold text-left leading-tight">visits<br />a month</span>
                                </span>
                            </div>
                            <input
                                type="range" min="1" max="30" value={visits}
                                onChange={(e) => setVisits(+e.target.value)}
                                className="w-full accent-crimson h-2 cursor-pointer"
                                aria-label="Monthly visits"
                            />
                            <div className="grid grid-cols-2 gap-2.5">
                                {VISIT_PRESETS.map((p) => (
                                    <button
                                        key={p.value}
                                        onClick={() => setVisits(p.value)}
                                        className={`rounded-2xl border px-4 py-3.5 text-left transition-all active:scale-[0.98] ${
                                            visits === p.value
                                                ? 'border-crimson bg-crimson/15 text-white'
                                                : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-white/30'
                                        }`}
                                    >
                                        <span className="block font-display font-extrabold text-lg">{p.value}×</span>
                                        <span className="block text-xs text-white/50 mt-0.5">{p.label}</span>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={next}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-crimson text-white font-bold py-4 text-base hover:bg-crimson-deep active:scale-[0.98] transition-all pulse-glow"
                            >
                                Continue <ArrowRight size={17} />
                            </button>
                        </div>
                    )}

                    {/* ── Step 2: Spend ──────────────────────────────── */}
                    {step === 1 && (
                        <div className="mt-8 space-y-7">
                            <div className="text-center">
                                <span className="inline-flex items-center gap-3 rounded-2xl bg-white/[0.05] border border-white/10 px-8 py-4">
                                    <Wallet size={22} className="text-lantern" />
                                    <span className="font-display font-extrabold text-5xl">{formatCurrency(orderValue)}</span>
                                    <span className="text-white/50 text-sm font-semibold text-left leading-tight">per<br />visit</span>
                                </span>
                            </div>
                            <input
                                type="range" min="100" max="1500" step="25" value={orderValue}
                                onChange={(e) => setOrderValue(+e.target.value)}
                                className="w-full accent-lantern h-2 cursor-pointer"
                                aria-label="Average order value"
                            />
                            <div className="grid grid-cols-2 gap-2.5">
                                {SPEND_PRESETS.map((p) => (
                                    <button
                                        key={p.value}
                                        onClick={() => setOrderValue(p.value)}
                                        className={`rounded-2xl border px-4 py-3.5 text-left transition-all active:scale-[0.98] ${
                                            orderValue === p.value
                                                ? 'border-lantern bg-lantern/15 text-white'
                                                : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-white/30'
                                        }`}
                                    >
                                        <span className="block font-display font-extrabold text-lg">{formatCurrency(p.value)}</span>
                                        <span className="block text-xs text-white/50 mt-0.5">{p.label}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={back} className="flex-1 rounded-full border border-white/20 text-white/80 font-bold py-4 hover:bg-white/5 active:scale-[0.98] transition-all">
                                    Back
                                </button>
                                <button onClick={next} className="flex-[2] inline-flex items-center justify-center gap-2 rounded-full bg-crimson text-white font-bold py-4 hover:bg-crimson-deep active:scale-[0.98] transition-all pulse-glow">
                                    Show my savings <Sparkles size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Step 3: Results ────────────────────────────── */}
                    {step === 2 && (
                        <div className="mt-8 space-y-4">
                            {/* Projection lines */}
                            <div className="rise-in rounded-2xl bg-white/[0.05] border border-white/10 p-5 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/80 text-[15px]">You'd spend a year</span>
                                    <span className="font-bold">{formatCurrency(yearlySpend)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/80 text-[15px]">Elite gives back 10%</span>
                                    <span className="font-bold text-emerald-300">+{formatCurrency(grossSavings)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-dashed border-white/15">
                                    <span className="text-white/80 text-[15px]">One-time card fee <span className="text-white/40 text-xs">(incl. GST)</span></span>
                                    <span className="font-bold text-[#FF6B87]">−{formatCurrency(CARD_FEE)}</span>
                                </div>
                            </div>

                            {/* Net savings hero */}
                            <div className={`rise-in rounded-3xl p-6 border text-center ${isPositive ? 'bg-crimson/10 border-crimson/30' : 'bg-white/[0.04] border-white/10'}`} style={{ '--d': '0.15s' }}>
                                <p className="text-white/70 text-xs font-bold tracking-mega uppercase">You keep</p>
                                <p className={`font-display font-extrabold text-5xl sm:text-6xl tracking-tight mt-2 ${isPositive ? 'text-transparent bg-clip-text bg-gradient-to-r from-crimson to-lantern' : 'text-white/70'}`}>
                                    {formatCurrency(netSavings)}
                                </p>
                                <p className="text-white/50 text-sm font-medium mt-1">every year</p>
                                {isPositive && (
                                    <span className="inline-block mt-3 bg-gradient-to-r from-lantern to-orange-500 text-ink text-sm font-extrabold px-4 py-1.5 rounded-full">
                                        {multiplier.toFixed(1)}× the card price
                                    </span>
                                )}
                                <p className="text-white/75 text-sm mt-3 font-medium">
                                    {isPositive ? getMultiplierMessage(multiplier) : 'Nudge your visits up a bit — the card pays for itself fast.'}
                                </p>
                            </div>

                            {/* SIP bonus */}
                            {isPositive && sip.monthlySavings >= 600 && (
                                <div className="rise-in rounded-2xl bg-white/[0.04] border border-white/10 p-4 flex items-start gap-3" style={{ '--d': '0.25s' }}>
                                    <span className="text-xl" aria-hidden="true">📈</span>
                                    <p className="text-sm text-white/85 leading-relaxed">
                                        <strong className="text-white">Invest it instead:</strong> ₹{Math.round(sip.monthlySavings).toLocaleString('en-IN')}/mo
                                        in a SIP (est. 12% p.a.) grows to <strong className="text-lantern">{formatCurrency(sip.futureValue)}</strong> in a year.
                                    </p>
                                </div>
                            )}

                            {/* CTAs */}
                            <div className="rise-in space-y-3 pt-1" style={{ '--d': '0.35s' }}>
                                <a
                                    href={BUY_CARD_URL || '#'}
                                    target={BUY_CARD_URL ? '_blank' : undefined}
                                    rel={BUY_CARD_URL ? 'noopener noreferrer' : undefined}
                                    onClick={BUY_CARD_URL ? undefined : (e) => e.preventDefault()}
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-crimson text-white font-bold py-4 hover:bg-crimson-deep active:scale-[0.98] transition-all pulse-glow"
                                >
                                    <PiggyBank size={18} /> Get the Elite Card — {formatCurrency(CARD_FEE)}
                                </a>
                                <p className="text-center text-white/45 text-xs">Available at every outlet counter — just ask the biller.</p>
                                <div className="flex gap-3">
                                    <button onClick={() => setStep(0)} className="flex-1 rounded-full border border-white/20 text-white/80 font-bold py-3.5 hover:bg-white/5 active:scale-[0.98] transition-all text-sm">
                                        Recalculate
                                    </button>
                                    <a href="tel:+919040018192" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white/80 font-bold py-3.5 hover:bg-white/5 active:scale-[0.98] transition-all text-sm">
                                        <Phone size={15} /> Call us
                                    </a>
                                </div>
                                <Link to="/menu" className="block text-center text-white/50 hover:text-white text-sm font-semibold pt-1 transition-colors">
                                    Browse the full menu →
                                </Link>
                            </div>
                        </div>
                    )}
                </main>

                <footer className="relative z-10 text-center pb-6 px-5">
                    <p className="text-white/30 text-[10px] tracking-mega uppercase">VDumpling Dynasty — From Peak to Eat</p>
                </footer>
            </div>
        </>
    );
};

export default EliteCalculatorPage;
