"use client";

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import KittenCard from "@/components/KittenCard";
import type { Kitten as CardKitten } from "@/lib/mock-kittens";

type FilterGroup = {
  title: "Breed" | "Gender" | "Colour" | "Availability";
  items: string[];
};

type FilterKey = "Breed" | "Gender" | "Colour" | "Availability";
type SortOption = "newest" | "price-low" | "price-high";

export default function KittensCatalog({
  kittens,
  initialBreed,
}: {
  kittens: CardKitten[];
  initialBreed?: string | null;
}) {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>(() => {
    if (!initialBreed) {
      return [];
    }

    return kittens.some((kitten) => kitten.breed === initialBreed) ? [initialBreed] : [];
  });
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [isDesktopSortOpen, setIsDesktopSortOpen] = useState(false);
  const [draftBreeds, setDraftBreeds] = useState<string[]>([]);
  const [draftGenders, setDraftGenders] = useState<string[]>([]);
  const [draftColours, setDraftColours] = useState<string[]>([]);
  const [draftAvailability, setDraftAvailability] = useState<string[]>([]);
  const [draftSortBy, setDraftSortBy] = useState<SortOption>("newest");

  const filterDrawerRef = useRef<HTMLDivElement>(null);
  const sortDrawerRef = useRef<HTMLDivElement>(null);
  const desktopSortRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);

  const filterGroups: FilterGroup[] = useMemo(
    () => [
      { title: "Breed", items: uniqueSortedValues(kittens.map((kitten) => kitten.breed)) },
      { title: "Gender", items: uniqueSortedValues(kittens.map((kitten) => kitten.gender)) },
      { title: "Colour", items: uniqueSortedValues(kittens.map((kitten) => kitten.colour)) },
      {
        title: "Availability",
        items: uniqueSortedValues(kittens.map((kitten) => kitten.availability)),
      },
    ],
    [kittens],
  );

  const filters = useDeferredValue({
    breeds: selectedBreeds,
    genders: selectedGenders,
    colours: selectedColours,
    availability: selectedAvailability,
    sortBy,
  });

  const filteredKittens = useMemo(() => {
    const next = kittens.filter((kitten) => {
      if (filters.breeds.length > 0 && !filters.breeds.includes(kitten.breed)) {
        return false;
      }

      if (filters.genders.length > 0 && !filters.genders.includes(kitten.gender)) {
        return false;
      }

      if (filters.colours.length > 0 && !filters.colours.includes(kitten.colour)) {
        return false;
      }

      if (
        filters.availability.length > 0 &&
        !filters.availability.includes(kitten.availability)
      ) {
        return false;
      }

      return true;
    });

    if (filters.sortBy === "price-low") {
      next.sort((left, right) => left.price - right.price);
      return next;
    }

    if (filters.sortBy === "price-high") {
      next.sort((left, right) => right.price - left.price);
      return next;
    }

    return next;
  }, [filters, kittens]);

  const activeFilterCount =
    selectedBreeds.length +
    selectedGenders.length +
    selectedColours.length +
    selectedAvailability.length;

  const activeFilterChips = [
    ...selectedBreeds.map((value) => ({ key: "Breed" as const, value })),
    ...selectedGenders.map((value) => ({ key: "Gender" as const, value })),
    ...selectedColours.map((value) => ({ key: "Colour" as const, value })),
    ...selectedAvailability.map((value) => ({ key: "Availability" as const, value })),
  ];

  useEffect(() => {
    if (!isDesktopSortOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!desktopSortRef.current?.contains(event.target as Node)) {
        setIsDesktopSortOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDesktopSortOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDesktopSortOpen]);

  useEffect(() => {
    const activeDrawer = isFilterDrawerOpen
      ? filterDrawerRef.current
      : isSortDrawerOpen
        ? sortDrawerRef.current
        : null;

    if (!activeDrawer) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const filterTrigger = filterButtonRef.current;
    const sortTrigger = sortButtonRef.current;
    document.body.style.overflow = "hidden";

    const focusableElements = Array.from(
      activeDrawer.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute("disabled"));

    focusableElements[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawers();
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      if (isFilterDrawerOpen) {
        filterTrigger?.focus();
      }

      if (isSortDrawerOpen) {
        sortTrigger?.focus();
      }
    };
  }, [isFilterDrawerOpen, isSortDrawerOpen]);

  function openFilterDrawer() {
    setDraftBreeds(selectedBreeds);
    setDraftGenders(selectedGenders);
    setDraftColours(selectedColours);
    setDraftAvailability(selectedAvailability);
    setIsFilterDrawerOpen(true);
  }

  function openSortDrawer() {
    setDraftSortBy(sortBy);
    setIsSortDrawerOpen(true);
  }

  function clearAllFilters() {
    setSelectedBreeds([]);
    setSelectedGenders([]);
    setSelectedColours([]);
    setSelectedAvailability([]);
    setSortBy("newest");
  }

  function clearDraftFilters() {
    setDraftBreeds([]);
    setDraftGenders([]);
    setDraftColours([]);
    setDraftAvailability([]);
  }

  function closeDrawers() {
    setIsFilterDrawerOpen(false);
    setIsSortDrawerOpen(false);
  }

  function applyDraftFilters() {
    setSelectedBreeds(draftBreeds);
    setSelectedGenders(draftGenders);
    setSelectedColours(draftColours);
    setSelectedAvailability(draftAvailability);
    setIsFilterDrawerOpen(false);
  }

  function applyDraftSort() {
    setSortBy(draftSortBy);
    setIsSortDrawerOpen(false);
  }

  function removeFilterChip(key: FilterKey, value: string) {
    if (key === "Breed") {
      setSelectedBreeds((current) => current.filter((item) => item !== value));
      return;
    }

    if (key === "Gender") {
      setSelectedGenders((current) => current.filter((item) => item !== value));
      return;
    }

    if (key === "Colour") {
      setSelectedColours((current) => current.filter((item) => item !== value));
      return;
    }

    setSelectedAvailability((current) => current.filter((item) => item !== value));
  }

  function toggleSelection(
    value: string,
    setValues: Dispatch<SetStateAction<string[]>>,
  ) {
    setValues((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  function getAppliedSelectionConfig(title: FilterKey) {
    if (title === "Breed") {
      return { values: selectedBreeds, setValues: setSelectedBreeds };
    }

    if (title === "Gender") {
      return { values: selectedGenders, setValues: setSelectedGenders };
    }

    if (title === "Colour") {
      return { values: selectedColours, setValues: setSelectedColours };
    }

    return { values: selectedAvailability, setValues: setSelectedAvailability };
  }

  function getDraftSelectionConfig(title: FilterKey) {
    if (title === "Breed") {
      return { values: draftBreeds, setValues: setDraftBreeds };
    }

    if (title === "Gender") {
      return { values: draftGenders, setValues: setDraftGenders };
    }

    if (title === "Colour") {
      return { values: draftColours, setValues: setDraftColours };
    }

    return { values: draftAvailability, setValues: setDraftAvailability };
  }

  return (
    <section className="section-wrap grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="surface-card hidden h-fit rounded-[2rem] p-6 lg:block">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Filter Kittens</h2>
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-sm text-[var(--pink-deep)]"
          >
            Clear all
          </button>
        </div>
        <div className="space-y-6">
          {filterGroups.map((section) => {
            const config = getAppliedSelectionConfig(section.title);

            return (
              <div
                key={section.title}
                className="space-y-3 border-b border-[var(--line)] pb-5 last:border-none last:pb-0"
              >
                <p className="font-semibold text-[var(--foreground)]">{section.title}</p>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    (() => {
                      const inputId = `desktop-${section.title.toLowerCase()}-${item
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`;

                      return (
                    <label
                      key={item}
                      htmlFor={inputId}
                      className="flex items-center gap-3 text-sm text-[var(--muted)]"
                    >
                      <input
                        id={inputId}
                        name={`${section.title.toLowerCase()}[]`}
                        type="checkbox"
                        checked={config.values.includes(item)}
                        onChange={() => toggleSelection(item, config.setValues)}
                        className="h-4 w-4 rounded border-[var(--line-strong)] accent-[var(--pink-deep)]"
                      />
                      <span>{item}</span>
                    </label>
                      );
                    })()
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      <div className="space-y-6">
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-3 px-5">
            <button
              ref={filterButtonRef}
              type="button"
              onClick={openFilterDrawer}
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[16px] border border-[#F3D6DE] bg-white px-4 text-sm font-semibold text-[#2F2A2A] shadow-[0_10px_24px_rgba(47,42,42,0.05)]"
            >
              <SlidersIcon className="h-4 w-4 text-[#2F2A2A]" />
              <span>Filter</span>
              {activeFilterCount > 0 ? (
                <span className="inline-flex min-w-[22px] items-center justify-center rounded-full bg-[#FDEAF0] px-1.5 py-0.5 text-[12px] font-semibold text-[#EF6F91]">
                  {activeFilterCount}
                </span>
              ) : null}
            </button>

            <button
              ref={sortButtonRef}
              type="button"
              onClick={openSortDrawer}
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[16px] border border-[#F3D6DE] bg-white px-4 text-sm font-semibold text-[#2F2A2A] shadow-[0_10px_24px_rgba(47,42,42,0.05)]"
            >
              <SortIcon className="h-4 w-4 text-[#2F2A2A]" />
              <span>Sort</span>
            </button>
          </div>

          <p className="mt-[14px] px-5 text-[14px] text-[#666666]">
            {filteredKittens.length} kitten{filteredKittens.length === 1 ? "" : "s"} found
          </p>

          {activeFilterChips.length > 0 ? (
            <div className="mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
              {activeFilterChips.map((chip) => (
                <button
                  key={`${chip.key}-${chip.value}`}
                  type="button"
                  onClick={() => removeFilterChip(chip.key, chip.value)}
                  className="shrink-0 rounded-full border border-[#F3D6DE] bg-white px-3 py-2 text-[13px] text-[#5F5A5A]"
                >
                  {chip.value} <span className="text-[#EF6F91]">×</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="hidden flex-col gap-4 rounded-[2rem] border border-[var(--line)] bg-white/80 px-5 py-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[var(--muted)]">
            {filteredKittens.length} kitten{filteredKittens.length === 1 ? "" : "s"} found
          </p>
          <div
            ref={desktopSortRef}
            className="relative flex items-center gap-3 rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)]"
          >
            <span>Sort by</span>
            <button
              type="button"
              onClick={() => setIsDesktopSortOpen((current) => !current)}
              className="inline-flex min-w-[170px] items-center justify-between gap-3 rounded-full border border-[#F3D6DE] bg-[#FFF7FA] px-4 py-2 text-[var(--foreground)] shadow-sm transition hover:border-[#EF6F91] focus:border-[#EF6F91] focus:outline-none focus:ring-2 focus:ring-[#F9CAD8]"
              aria-haspopup="listbox"
              aria-expanded={isDesktopSortOpen}
            >
              <span>{SORT_OPTIONS.find((option) => option.value === sortBy)?.label}</span>
              <ChevronDownIcon
                className={`h-4 w-4 text-[#EF6F91] transition-transform ${
                  isDesktopSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDesktopSortOpen ? (
              <div
                role="listbox"
                className="absolute top-full right-0 z-20 mt-3 min-w-[220px] overflow-hidden rounded-[20px] border border-[#F3D6DE] bg-white p-2 shadow-[0_18px_45px_rgba(47,42,42,0.12)]"
              >
                {SORT_OPTIONS.map((option) => {
                  const isActive = sortBy === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsDesktopSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-[14px] px-4 py-3 text-left text-sm transition ${
                        isActive
                          ? "bg-[#FDEAF0] font-semibold text-[#EF6F91]"
                          : "text-[var(--foreground)] hover:bg-[#FFF7FA]"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isActive ? <span className="text-[#EF6F91]">•</span> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        {filteredKittens.length > 0 ? (
          <div className="grid gap-5 px-5 md:grid-cols-2 md:gap-6 lg:px-0 xl:grid-cols-3">
            {filteredKittens.map((kitten) => (
              <KittenCard key={kitten.id} kitten={kitten} />
            ))}
          </div>
        ) : (
          <div className="mx-5 rounded-[2rem] border border-[var(--line)] bg-white/75 px-6 py-12 text-center text-[var(--muted)] lg:mx-0">
            No kittens found.
          </div>
        )}
      </div>

      {isFilterDrawerOpen ? (
        <div
          className="fixed inset-0 z-[999] bg-[rgba(25,20,22,0.38)] lg:hidden"
          onClick={closeDrawers}
        >
          <div
            ref={filterDrawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filter kittens"
            className="absolute right-0 bottom-0 left-0 flex max-h-[88vh] flex-col overflow-hidden rounded-t-[28px] bg-[#FFFDFC]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 border-b border-[#F3D6DE] bg-[#FFFDFC] px-5 pt-3 pb-4">
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#E8D9DD]" />
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-semibold text-[#2F2A2A]">Filter Kittens</h2>
                <button
                  type="button"
                  onClick={closeDrawers}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#F3D6DE] text-[#2F2A2A]"
                  aria-label="Close filters"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {filterGroups.map((section) => {
                const config = getDraftSelectionConfig(section.title);

                return (
                  <div
                    key={section.title}
                    className="mb-6 border-b border-[#F3D6DE] pb-6 last:mb-0 last:border-none last:pb-0"
                  >
                    <h3 className="mb-4 text-[16px] font-semibold text-[#2F2A2A]">
                      {section.title}
                    </h3>
                    <div className="grid gap-[14px]">
                      {section.items.map((item) => (
                        (() => {
                          const inputId = `mobile-${section.title.toLowerCase()}-${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`;

                          return (
                        <label
                          key={item}
                          htmlFor={inputId}
                          className="flex min-h-[44px] items-center gap-3 text-[15px] text-[#5F5A5A]"
                        >
                          <input
                            id={inputId}
                            name={`mobile-${section.title.toLowerCase()}[]`}
                            type="checkbox"
                            checked={config.values.includes(item)}
                            onChange={() => toggleSelection(item, config.setValues)}
                            className="h-4 w-4 rounded border-[#D7C6CA] accent-[#EF6F91]"
                          />
                          <span>{item}</span>
                        </label>
                          );
                        })()
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="sticky bottom-0 border-t border-[#F3D6DE] bg-[#FFFDFC] px-5 py-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={clearDraftFilters}
                  className="h-[52px] rounded-[16px] border border-[#EF6F91] bg-white text-sm font-semibold text-[#EF6F91]"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={applyDraftFilters}
                  className="h-[52px] rounded-[16px] bg-[#EF6F91] text-sm font-semibold text-white shadow-[0_12px_28px_rgba(239,111,145,0.22)]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isSortDrawerOpen ? (
        <div
          className="fixed inset-0 z-[999] bg-[rgba(25,20,22,0.38)] lg:hidden"
          onClick={closeDrawers}
        >
          <div
            ref={sortDrawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Sort kittens"
            className="absolute right-0 bottom-0 left-0 overflow-hidden rounded-t-[28px] bg-[#FFFDFC]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-[#F3D6DE] px-5 pt-3 pb-4">
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#E8D9DD]" />
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-semibold text-[#2F2A2A]">Sort Kittens</h2>
                <button
                  type="button"
                  onClick={closeDrawers}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#F3D6DE] text-[#2F2A2A]"
                  aria-label="Close sort options"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="px-5 py-5">
              <div className="grid gap-[14px]">
                {SORT_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    htmlFor={`mobile-sort-${option.value}`}
                    className="flex min-h-[44px] items-center justify-between rounded-[16px] border border-[#F3D6DE] bg-white px-4 py-3 text-[15px] text-[#2F2A2A]"
                  >
                    <span>{option.label}</span>
                    <input
                      id={`mobile-sort-${option.value}`}
                      type="radio"
                      name="mobile-sort"
                      checked={draftSortBy === option.value}
                      onChange={() => setDraftSortBy(option.value)}
                      className="h-4 w-4 accent-[#EF6F91]"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-[#F3D6DE] px-5 py-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDraftSortBy("newest")}
                  className="h-[52px] rounded-[16px] border border-[#EF6F91] bg-white text-sm font-semibold text-[#EF6F91]"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={applyDraftSort}
                  className="h-[52px] rounded-[16px] bg-[#EF6F91] text-sm font-semibold text-white shadow-[0_12px_28px_rgba(239,111,145,0.22)]"
                >
                  Apply Sort
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price Low to High" },
  { value: "price-high", label: "Price High to Low" },
];

function uniqueSortedValues(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function SlidersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M4 7h10M18 7h2M4 17h4M12 17h8M14 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM10 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SortIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M8 6v12m0 0-3-3m3 3 3-3M16 18V6m0 0-3 3m3-3 3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

