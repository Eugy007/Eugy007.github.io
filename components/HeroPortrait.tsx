interface HeroPortraitProps {
    src: string;
    alt: string;
}

export default function HeroPortrait({ src, alt }: HeroPortraitProps) {
    return (
        <div className="group relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-2xl border border-line shadow-card sm:max-w-[340px] lg:mx-0 lg:max-w-[380px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
        </div>
    );
}