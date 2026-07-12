import React, { useState, useRef } from 'react';

/* The physical Elite card — 3D pointer tilt, floating idle, shine sweep, glow.
   Shared by the homepage Elite section and the standalone /vdd-elite page. */
const EliteCardVisual = ({ className = '' }) => {
    const stageRef = useRef(null);
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

    const onMove = (e) => {
        const r = stageRef.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ rx: -py * 12, ry: px * 16 });
    };

    return (
        <div
            ref={stageRef}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
            className={className}
            style={{ perspective: '1100px' }}
        >
            <div className="elite-float">
                <div
                    className="elite-glow elite-card-3d ring-1 ring-white/20"
                    style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
                >
                    <img
                        src="/images/ELITECARD.jpg"
                        alt="VDDian Member Elite card — VDumpling Dynasty"
                        loading="lazy"
                    />
                    <span className="elite-shine" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

export default EliteCardVisual;
