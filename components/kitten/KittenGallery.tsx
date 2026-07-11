"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import AvailabilityBadge from "@/components/AvailabilityBadge";
import KittenGalleryLightbox from "@/components/kitten/KittenGalleryLightbox";

type KittenGalleryProps = {
  images: string[];
  name: string;
  availability: "Available" | "Reserved" | "Sold";
};

export default function KittenGallery({ images, name, availability }: KittenGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const mainImageButtonRef = useRef<HTMLButtonElement>(null);
  const safeIndex = Math.min(selectedIndex, images.length - 1);
  const selectedImage = images[safeIndex] ?? "/kittens/1.jpg";
  const hasMultipleImages = images.length > 1;

  function showPreviousImage() {
    setSelectedIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }

  function showNextImage() {
    setSelectedIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }

  function handleOpenLightbox() {
    setIsLightboxOpen(true);
  }

  function handlePreviousClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    showPreviousImage();
  }

  function handleNextClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    showNextImage();
  }

  function handleThumbnailClick(index: number, event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setSelectedIndex(index);
  }

  return (
    <div className="mb-8">
      <div className="relative w-full overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(182,143,141,0.16)]">
        <div className="relative aspect-[4/5] max-h-[70vh] w-full overflow-hidden rounded-[28px] bg-[#F8F3F1] md:aspect-[16/10] md:max-h-[620px]">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={selectedImage}
              alt=""
              fill
              aria-hidden="true"
              quality={90}
              className="scale-[1.08] object-cover object-center blur-[28px]"
              sizes="(max-width: 768px) 100vw, 900px"
              style={{ opacity: 0.16 }}
            />
          </div>

          <button
            ref={mainImageButtonRef}
            type="button"
            onClick={handleOpenLightbox}
            onDoubleClick={handleOpenLightbox}
            aria-label={`Open fullscreen gallery for ${name}`}
            className="relative z-[1] block h-full w-full cursor-zoom-in bg-transparent"
          >
            <Image
              src={selectedImage}
              alt={name}
              fill
              quality={90}
              priority={safeIndex === 0}
              className="object-contain object-center"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </button>

          <div className="absolute left-4 top-4">
            <AvailabilityBadge availability={availability} />
          </div>

          <button
            type="button"
            aria-label={`Save ${name} to favourites`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            className="absolute right-4 top-4 z-[30] inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-[var(--pink-deep)] shadow-[0_10px_24px_rgba(47,42,42,0.12)] backdrop-blur transition duration-200 hover:-translate-y-0.5"
          >
            <HeartIcon className="h-4.5 w-4.5" />
          </button>

          {hasMultipleImages ? (
            <>
              <button
                type="button"
                onClick={handlePreviousClick}
                aria-label={`Show previous ${name} image`}
                className="absolute left-4 top-1/2 z-[30] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--foreground)] shadow-[0_12px_28px_rgba(47,42,42,0.14)] backdrop-blur transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNextClick}
                aria-label={`Show next ${name} image`}
                className="absolute right-4 top-1/2 z-[30] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--foreground)] shadow-[0_12px_28px_rgba(47,42,42,0.14)] backdrop-blur transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF6F91] focus-visible:ring-offset-2"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </>
          ) : null}

          <div className="pointer-events-none absolute bottom-4 right-4 z-[20] rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-[var(--foreground)] shadow-[0_10px_24px_rgba(47,42,42,0.12)] backdrop-blur">
            {safeIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        {images.slice(0, 8).map((image, index) => {
          const isSelected = index === safeIndex;

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={(event) => handleThumbnailClick(index, event)}
              className={`relative h-[84px] w-[84px] overflow-hidden rounded-xl border bg-white shadow-[0_10px_24px_rgba(182,143,141,0.12)] transition duration-200 ${
                isSelected
                  ? "border-2 border-[#EF6F91]"
                  : "border-[rgba(212,189,191,0.28)] hover:border-[rgba(239,111,145,0.5)]"
              }`}
              aria-label={`View ${name} photo ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${name} photo ${index + 1}`}
                fill
                quality={90}
                className="object-cover"
                sizes="92px"
              />
            </button>
          );
        })}
      </div>

      {isLightboxOpen ? (
        <KittenGalleryLightbox
          images={images}
          name={name}
          selectedIndex={safeIndex}
          onClose={() => setIsLightboxOpen(false)}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
          returnFocusRef={mainImageButtonRef}
        />
      ) : null}
    </div>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        d="M12 20.4s-6.9-4.4-9.2-8.1C.8 9.1 2 5.4 5.5 4.5c2-.5 4 .2 5.2 1.8 1.2-1.6 3.2-2.3 5.2-1.8 3.5.9 4.7 4.6 2.7 7.8-2.3 3.7-9.2 8.1-9.2 8.1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
      <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
