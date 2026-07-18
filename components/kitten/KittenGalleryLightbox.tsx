"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type KittenGalleryLightboxProps = {
  images: string[];
  imageAlts: string[];
  name: string;
  selectedIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  returnFocusRef?: React.RefObject<HTMLButtonElement | null>;
};

export default function KittenGalleryLightbox({
  images,
  imageAlts,
  name,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
  returnFocusRef,
}: KittenGalleryLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasMultipleImages = images.length > 1;
  const selectedImage = images[selectedIndex] ?? images[0] ?? "/kittens/1.jpg";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocusElement = returnFocusRef?.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (!hasMultipleImages) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusElement?.focus();
    };
  }, [hasMultipleImages, onClose, onNext, onPrevious, returnFocusRef]);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(20,16,18,0.92)] p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} image gallery`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }}
        aria-label="Close image gallery"
        className="absolute right-3 top-3 z-[30] inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur transition hover:bg-white/22 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      {hasMultipleImages ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onPrevious();
          }}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 z-[30] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur transition hover:bg-white/22 sm:left-6 sm:h-12 sm:w-12"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      ) : null}

      {hasMultipleImages ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-3 top-1/2 z-[30] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/14 text-white backdrop-blur transition hover:bg-white/22 sm:right-6 sm:h-12 sm:w-12"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      ) : null}

      <div
        className="relative z-[10] flex h-full w-full max-h-[90vh] max-w-[94vw] items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={selectedImage}
          alt={imageAlts[selectedIndex] ?? `${name} fullscreen image ${selectedIndex + 1}`}
          fill
          quality={85}
          className="pointer-events-none object-contain"
          sizes="94vw"
          priority
        />
      </div>

      <div className="absolute bottom-3 right-3 z-[30] rounded-full bg-white/14 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-white backdrop-blur sm:bottom-6 sm:right-6">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
      <path d="M6 6 18 18" strokeLinecap="round" />
      <path d="M18 6 6 18" strokeLinecap="round" />
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
