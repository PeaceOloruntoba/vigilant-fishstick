import Link from "next/link";

export default function Gallery() {
	return (
		<section
			aria-labelledby="gallery-heading"
			className="w-full bg-emerald-950 px-4 py-20 text-stone-50 md:px-8 md:py-28 lg:px-16"
		>
			<div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
				<div>
					<p className="text-xs font-medium uppercase tracking-[0.22em] text-emerald-200">
						Full Gallery
					</p>
					<h2
						id="gallery-heading"
						className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl md:text-5xl"
					>
						All works, in one place.
					</h2>
					<p className="mt-5 max-w-md text-stone-50/70">
						Explore our landscaping, horticulture, installation and property
						maintenance work across Nigeria.
					</p>
					<Link
						href="/gallery"
						className="mt-8 inline-flex rounded-full bg-stone-50 px-5 py-3 text-sm font-medium text-emerald-950 transition-colors hover:bg-emerald-100"
					>
						See more
					</Link>
				</div>

				<div className="overflow-hidden rounded-md bg-black">
					<video
						src="/videos/rooftop-garden-walkthrough.mp4"
						autoPlay
						muted
						loop
						playsInline
						aria-label="Landfairy project gallery walkthrough"
						className="aspect-video h-full w-full object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
