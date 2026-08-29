export default function StaticHangingPhoto({ src, alt = '' }: { src: string; alt?: string }) {
    return (
        <div className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:mx-0 lg:max-w-[400px]">
            {/* strap */}
            <div className="mx-auto h-16 w-[3px] rounded-full bg-gradient-to-b from-mutedDim to-line sm:h-20 lg:h-24" />
            <div className="mx-auto -mt-1.5 h-3 w-3 rounded-full border-2 border-mutedDim bg-bg" />

            {/* card: white frame, thin dark mat, photo */}
            <div
                className="relative -mt-1 rounded-md border-[6px] border-[#f2f2f0] bg-[#f2f2f0] p-[3px] shadow-card"
                style={{ transform: 'rotate(-3deg)' }}
            >
                <div className="overflow-hidden rounded-sm bg-[#0c0e14] p-[2px]">
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-[1px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
                    </div>
                </div>
            </div>
        </div>
    );
}