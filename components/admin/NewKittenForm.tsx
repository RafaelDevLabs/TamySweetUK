"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useTransition } from "react";

import { updateKitten } from "@/app/admin/(protected)/kittens/[id]/edit/actions";
import { createKitten, type NewKittenFormState } from "@/app/admin/(protected)/kittens/new/actions";
import type { Kitten, KittenImage } from "@/lib/types/kitten";

const initialServerState: NewKittenFormState = {
  error: null,
};

const availabilityOptions = [
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "sold", label: "Sold" },
] as const;

const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
] as const;

const wizardSteps = [
  { id: 1, label: "Details", description: "Profile, care and pricing" },
  { id: 2, label: "Photos", description: "Upload and manage the gallery" },
  { id: 3, label: "Preview & Publish", description: "Review before saving" },
] as const;

type FormMode = "create" | "edit";

type ExistingImageItem = {
  kind: "existing";
  id: string;
  url: string;
  storage_path: string | null;
  alt_text: string | null;
  is_primary: boolean;
  sort_order: number;
};

type NewImageItem = {
  kind: "new";
  tempId: string;
  file: File;
  url: string;
};

type ImageItem = ExistingImageItem | NewImageItem;

type FormState = {
  name: string;
  breed: string;
  gender: string;
  age_label: string;
  colour: string;
  price: string;
  availability: string;
  health_status: string;
  date_of_birth: string;
  sort_order: string;
  short_description: string;
  temperament: string;
  description: string;
  vaccinated: boolean;
  wormed: boolean;
  litter_trained: boolean;
  microchipped: boolean;
  tica_registered: boolean;
  parents_can_be_seen: boolean;
  is_featured: boolean;
};

const initialFormState: FormState = {
  name: "",
  breed: "",
  gender: "",
  age_label: "",
  colour: "",
  price: "",
  availability: "",
  health_status: "",
  date_of_birth: "",
  sort_order: "",
  short_description: "",
  temperament: "",
  description: "",
  vaccinated: true,
  wormed: true,
  litter_trained: true,
  microchipped: false,
  tica_registered: false,
  parents_can_be_seen: false,
  is_featured: false,
};

function mapKittenToFormState(kitten?: Kitten): FormState {
  if (!kitten) {
    return initialFormState;
  }

  return {
    name: kitten.name,
    breed: kitten.breed,
    gender: kitten.gender,
    age_label: kitten.age_label,
    colour: kitten.colour,
    price: String(kitten.price),
    availability: kitten.availability,
    health_status: kitten.health_status,
    date_of_birth: kitten.date_of_birth ?? "",
    sort_order: String(kitten.sort_order ?? 0),
    short_description: kitten.short_description,
    temperament: kitten.temperament ?? "",
    description: kitten.description ?? "",
    vaccinated: kitten.vaccinated,
    wormed: kitten.wormed,
    litter_trained: kitten.litter_trained,
    microchipped: kitten.microchipped,
    tica_registered: kitten.tica_registered,
    parents_can_be_seen: kitten.parents_can_be_seen,
    is_featured: kitten.is_featured,
  };
}

function mapImagesToState(images?: KittenImage[]): ExistingImageItem[] {
  if (!images) {
    return [];
  }

  return [...images]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => ({
      kind: "existing" as const,
      id: image.id,
      url: image.url,
      storage_path: image.storage_path,
      alt_text: image.alt_text,
      is_primary: image.is_primary,
      sort_order: image.sort_order,
    }));
}

function inputClassName() {
  return "h-12 w-full rounded-2xl border border-[#F3E2E6] bg-[#FFFDFC] px-4 text-[#2F2A2A] outline-none transition placeholder:text-[#A59696] focus:border-[#EF6F91]";
}

function textareaClassName() {
  return "w-full rounded-2xl border border-[#F3E2E6] bg-[#FFFDFC] px-4 py-3 text-[#2F2A2A] outline-none transition placeholder:text-[#A59696] focus:border-[#EF6F91]";
}

function getMissingRequiredFields(formState: FormState) {
  const requiredFields: Array<keyof FormState> = [
    "name",
    "breed",
    "gender",
    "age_label",
    "colour",
    "price",
    "availability",
    "health_status",
    "short_description",
  ];

  return requiredFields.filter((field) => !String(formState[field]).trim());
}

export default function NewKittenForm({
  mode = "create",
  initialKitten,
  initialImages,
}: {
  mode?: FormMode;
  initialKitten?: Kitten;
  initialImages?: KittenImage[];
}) {
  const [currentStep, setCurrentStep] = useState<(typeof wizardSteps)[number]["id"]>(1);
  const [formState, setFormState] = useState<FormState>(() => mapKittenToFormState(initialKitten));
  const [images, setImages] = useState<ImageItem[]>(() => mapImagesToState(initialImages));
  const [dragActive, setDragActive] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const [serverState, setServerState] = useState<NewKittenFormState>(initialServerState);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    return () => {
      images.forEach((item) => {
        if (item.kind === "new") {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [images]);

  const headingLabel = mode === "edit" ? "Update Listing" : "New Listing";
  const headingTitle = mode === "edit" ? "Edit Kitten" : "Add New Kitten";
  const submitLabel = mode === "edit" ? "Save Changes" : "Publish Kitten";
  const submitPendingLabel = mode === "edit" ? "Saving changes..." : "Saving kitten...";

  const orderedImages = useMemo(() => images, [images]);
  const primaryPreviewImage = orderedImages[0] ?? null;
  const removedExistingImageIds = useMemo(
    () =>
      mapImagesToState(initialImages)
        .map((image) => image.id)
        .filter((id) => !orderedImages.some((item) => item.kind === "existing" && item.id === id)),
    [initialImages, orderedImages],
  );

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) {
      return;
    }

    const incomingFiles = Array.from(fileList);
    if (incomingFiles.length === 0) {
      return;
    }

    setImages((current) => {
      const remainingSlots = Math.max(0, 8 - current.length);
      const nextFiles = incomingFiles.slice(0, remainingSlots).map((file, index) => ({
        kind: "new" as const,
        tempId: `${Date.now()}-${index}-${file.name}`,
        file,
        url: URL.createObjectURL(file),
      }));

      return [...current, ...nextFiles];
    });
  }

  function removeImage(index: number) {
    setImages((current) => {
      const next = [...current];
      const [removed] = next.splice(index, 1);

      if (removed?.kind === "new") {
        URL.revokeObjectURL(removed.url);
      }

      return next;
    });
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    addFiles(event.target.files);
    event.target.value = "";
  }

  function handleStepAdvance() {
    if (currentStep === 1) {
      const missingFields = getMissingRequiredFields(formState);
      if (missingFields.length > 0) {
        setClientError("Please complete all required fields before moving on.");
        return;
      }
    }

    setClientError(null);
    setCurrentStep((step) => Math.min(3, step + 1) as 1 | 2 | 3);
  }

  function buildFormData() {
    const data = new FormData();

    if (mode === "edit" && initialKitten) {
      data.set("kitten_id", initialKitten.id);
    }

    data.set("name", formState.name);
    data.set("breed", formState.breed);
    data.set("gender", formState.gender);
    data.set("age_label", formState.age_label);
    data.set("colour", formState.colour);
    data.set("price", formState.price);
    data.set("availability", formState.availability);
    data.set("health_status", formState.health_status);
    data.set("date_of_birth", formState.date_of_birth);
    data.set("sort_order", formState.sort_order);
    data.set("short_description", formState.short_description);
    data.set("temperament", formState.temperament);
    data.set("description", formState.description);

    if (formState.vaccinated) data.set("vaccinated", "on");
    if (formState.wormed) data.set("wormed", "on");
    if (formState.litter_trained) data.set("litter_trained", "on");
    if (formState.microchipped) data.set("microchipped", "on");
    if (formState.tica_registered) data.set("tica_registered", "on");
    if (formState.parents_can_be_seen) data.set("parents_can_be_seen", "on");
    if (formState.is_featured) data.set("is_featured", "on");

    orderedImages.forEach((image) => {
      if (image.kind === "existing") {
        data.append("existing_image_ids", image.id);
      } else {
        data.append("images", image.file);
      }
    });

    removedExistingImageIds.forEach((id) => {
      data.append("removed_existing_image_ids", id);
    });

    return data;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClientError(null);
    setServerState(initialServerState);

    const missingFields = getMissingRequiredFields(formState);
    if (missingFields.length > 0) {
      setClientError("Please complete all required fields before saving the kitten.");
      return;
    }

    if (orderedImages.length === 0) {
      setClientError("Please keep or upload at least one image for the kitten.");
      return;
    }

    const data = buildFormData();
    console.debug("Submitting kitten form", formState);

    startTransition(async () => {
      const result =
        mode === "edit"
          ? await updateKitten(initialServerState, data)
          : await createKitten(initialServerState, data);

      if (result) {
        setServerState(result);
      }
    });
  }

  const activeError = clientError ?? serverState.error;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <section className="rounded-[30px] border border-[#F3E2E6] bg-[linear-gradient(135deg,#fffdfc_0%,#fff6f8_100%)] p-6 shadow-[0_22px_56px_rgba(0,0,0,0.05)] sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
              {headingLabel}
            </p>
            <h2 className="mt-3 font-serif text-[38px] leading-[1.02] text-[#2F2A2A] sm:text-[46px]">
              {headingTitle}
            </h2>
            <p className="mt-3 max-w-[720px] text-[15px] leading-7 text-[#6F6666] sm:text-[16px]">
              Move step by step through the profile, gallery and final review before publishing the
              kitten to the admin collection.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {wizardSteps.map((step) => {
              const isActive = currentStep === step.id;
              const isComplete = currentStep > step.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={`rounded-[24px] border px-4 py-4 text-left transition ${
                    isActive
                      ? "border-[#F7D9E2] bg-white shadow-[0_14px_30px_rgba(239,111,145,0.08)]"
                      : "border-[#F5E8EB] bg-white/70 hover:border-[#F7D9E2] hover:bg-white"
                  }`}
                >
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                      isActive || isComplete
                        ? "bg-[#FDECEF] text-[#EF6F91]"
                        : "bg-[#F5F0F1] text-[#8C8181]"
                    }`}
                  >
                    {step.id}
                  </span>
                  <p className="mt-3 text-sm font-semibold text-[#2F2A2A]">{step.label}</p>
                  <p className="mt-1 text-xs leading-5 text-[#8A7D7D]">{step.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {currentStep === 1 ? (
        <section className="rounded-[30px] border border-[#F3E2E6] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" required value={formState.name} onChange={(value) => updateField("name", value)} />
            <Field label="Breed" required value={formState.breed} onChange={(value) => updateField("breed", value)} />
            <SelectField
              label="Gender"
              required
              value={formState.gender}
              options={genderOptions}
              onChange={(value) => updateField("gender", value)}
            />
            <Field
              label="Age Label"
              required
              placeholder="9 weeks"
              value={formState.age_label}
              onChange={(value) => updateField("age_label", value)}
            />
            <Field label="Colour" required value={formState.colour} onChange={(value) => updateField("colour", value)} />
            <Field
              label="Price (£)"
              type="number"
              min="0"
              step="1"
              required
              value={formState.price}
              onChange={(value) => updateField("price", value)}
            />
            <SelectField
              label="Availability"
              required
              value={formState.availability}
              options={availabilityOptions}
              onChange={(value) => updateField("availability", value)}
            />
            <Field
              label="Health Status"
              required
              value={formState.health_status}
              onChange={(value) => updateField("health_status", value)}
            />
            <Field
              label="Date of Birth"
              type="date"
              value={formState.date_of_birth}
              onChange={(value) => updateField("date_of_birth", value)}
            />
            <Field
              label="Sort Order"
              type="number"
              min="0"
              step="1"
              value={formState.sort_order}
              onChange={(value) => updateField("sort_order", value)}
            />
          </div>

          <div className="mt-5 grid gap-5">
            <TextAreaField
              label="Short Description"
              required
              rows={3}
              placeholder="Warm short introduction for the listing card."
              value={formState.short_description}
              onChange={(value) => updateField("short_description", value)}
            />
            <TextAreaField
              label="Temperament"
              rows={2}
              placeholder="Sweet, calm & playful"
              value={formState.temperament}
              onChange={(value) => updateField("temperament", value)}
            />
            <TextAreaField
              label="Description"
              rows={5}
              placeholder="Full description for the kitten detail page."
              value={formState.description}
              onChange={(value) => updateField("description", value)}
            />
          </div>
        </section>
      ) : null}

      {currentStep === 2 ? (
        <section className="rounded-[30px] border border-[#F3E2E6] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <input
                id="images"
                type="file"
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                multiple
                onChange={handleFileInputChange}
                className="sr-only"
              />

              <label
                htmlFor="images"
                onDragEnter={() => setDragActive(true)}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragActive(false);
                  addFiles(event.dataTransfer.files);
                }}
                className={`flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-[30px] border-2 border-dashed px-6 py-10 text-center transition ${
                  dragActive
                    ? "border-[#EF6F91] bg-[#FFF4F7]"
                    : "border-[#F3C9D4] bg-[linear-gradient(180deg,#fff8fa_0%,#fffdfc_100%)] hover:border-[#EF6F91] hover:bg-[#FFF8FA]"
                }`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white text-[#EF6F91] shadow-[0_12px_24px_rgba(239,111,145,0.12)]">
                  <UploadIcon className="h-7 w-7" />
                </span>
                <p className="mt-5 font-serif text-[30px] text-[#2F2A2A]">Drop kitten photos here</p>
                <p className="mt-3 max-w-[380px] text-[15px] leading-7 text-[#6F6666]">
                  Upload 1 to 8 JPG, PNG or WEBP images. The first image becomes the primary cover
                  photo for cards and listings.
                </p>
                <span className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#EF6F91] px-5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(239,111,145,0.2)]">
                  Choose Files
                </span>
              </label>
            </div>

            <div className="rounded-[28px] border border-[#F6E4E8] bg-[#FFFDFC] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
                    Gallery
                  </p>
                  <h3 className="mt-2 font-serif text-[28px] text-[#2F2A2A]">Photo library</h3>
                </div>
                <span className="rounded-full bg-[#FDECEF] px-3 py-1 text-xs font-semibold text-[#EF6F91]">
                  {orderedImages.length}/8
                </span>
              </div>

              {orderedImages.length > 0 ? (
                <div className="mt-5 space-y-3">
                  {orderedImages.map((image, index) => (
                    <div
                      key={image.kind === "existing" ? image.id : image.tempId}
                      className="flex items-center gap-3 rounded-[22px] border border-[#F6E4E8] bg-white p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[18px] bg-[#FAF7EF]">
                        <Image
                          src={image.url}
                          alt={image.kind === "existing" ? image.alt_text || "Existing kitten image" : image.file.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-[#2F2A2A]">
                            {image.kind === "existing" ? `Existing image ${index + 1}` : image.file.name}
                          </p>
                          {index === 0 ? (
                            <span className="rounded-full bg-[#FDECEF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#EF6F91]">
                              Primary
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-xs text-[#8A7D7D]">
                          {image.kind === "existing"
                            ? "Already saved in Supabase"
                            : `${(image.file.size / 1024 / 1024).toFixed(2)} MB`}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <ActionChip
                            label="Remove"
                            variant="danger"
                            onClick={() => removeImage(index)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-[22px] border border-dashed border-[#F3E2E6] bg-[#FFFBFC] px-4 py-10 text-center text-sm text-[#8A7D7D]">
                  Your kitten images will appear here.
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <CheckboxField label="Vaccinated" checked={formState.vaccinated} onChange={(checked) => updateField("vaccinated", checked)} />
            <CheckboxField label="Wormed" checked={formState.wormed} onChange={(checked) => updateField("wormed", checked)} />
            <CheckboxField label="Litter trained" checked={formState.litter_trained} onChange={(checked) => updateField("litter_trained", checked)} />
            <CheckboxField label="Microchipped" checked={formState.microchipped} onChange={(checked) => updateField("microchipped", checked)} />
            <CheckboxField label="TICA registered" checked={formState.tica_registered} onChange={(checked) => updateField("tica_registered", checked)} />
            <CheckboxField label="Parents can be seen" checked={formState.parents_can_be_seen} onChange={(checked) => updateField("parents_can_be_seen", checked)} />
            <CheckboxField label="Featured on homepage" checked={formState.is_featured} onChange={(checked) => updateField("is_featured", checked)} />
          </div>
        </section>
      ) : null}

      {currentStep === 3 ? (
        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[30px] border border-[#F3E2E6] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:p-8">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
              Preview
            </p>
            <h3 className="mt-3 font-serif text-[34px] leading-[1.04] text-[#2F2A2A]">
              Review before publishing
            </h3>

            <div className="mt-6 overflow-hidden rounded-[28px] border border-[#F3E2E6] bg-[#FFFDFC] shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
              <div className="relative h-[280px] bg-[#FAF7EF]">
                {primaryPreviewImage ? (
                  <Image
                    src={primaryPreviewImage.url}
                    alt={formState.name || "Kitten preview"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 38vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[#8A7D7D]">
                    Add photos to preview the primary image
                  </div>
                )}

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {formState.availability ? (
                    <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2F2A2A]">
                      {formState.availability}
                    </span>
                  ) : null}
                  {formState.is_featured ? (
                    <span className="inline-flex rounded-full bg-[#FDECEF] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EF6F91]">
                      Featured
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-[30px] leading-none text-[#2F2A2A]">
                      {formState.name || "Kitten name"}
                    </h4>
                    <p className="mt-2 text-sm text-[#7A7272]">{formState.breed || "Breed"}</p>
                  </div>
                  <p className="text-right text-[28px] font-bold leading-none text-[#EF6F91]">
                    {formState.price ? `£${formState.price}` : "£0"}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {formState.age_label ? <InfoBadge>{formState.age_label}</InfoBadge> : null}
                  {formState.colour ? <InfoBadge>{formState.colour}</InfoBadge> : null}
                </div>

                <p className="mt-5 text-sm leading-7 text-[#6F6666]">
                  {formState.short_description ||
                    "Your short listing description will appear here once added."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-[#F3E2E6] bg-[linear-gradient(180deg,#fffdfc_0%,#fff6f8_100%)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sm:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#EF6F91]">
                Publish checklist
              </p>
              <div className="mt-5 space-y-3">
                <ChecklistRow
                  label="Core kitten details added"
                  complete={getMissingRequiredFields(formState).length === 0}
                />
                <ChecklistRow
                  label="At least one gallery image available"
                  complete={orderedImages.length > 0}
                />
                <ChecklistRow
                  label="Primary image ready for the public card"
                  complete={Boolean(primaryPreviewImage)}
                />
                <ChecklistRow label="Homepage featured toggle reviewed" complete />
              </div>
            </div>

            {activeError ? (
              <div className="rounded-[24px] border border-[#F5CDD8] bg-[#FFF4F7] px-5 py-4 text-sm text-[#B24F6D]">
                {activeError}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <SubmitButton pending={isPending} label={submitLabel} pendingLabel={submitPendingLabel} />
            </div>
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[26px] border border-[#F3E2E6] bg-white px-5 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.03)]">
        <div className="text-sm text-[#7F7373]">
          Step {currentStep} of {wizardSteps.length}
        </div>
        <div className="flex flex-wrap gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => {
                setClientError(null);
                setCurrentStep((step) => Math.max(1, step - 1) as 1 | 2 | 3);
              }}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#EF6F91] px-5 text-sm font-semibold !text-[#EF6F91] transition hover:bg-[#FDECEF] hover:!text-[#EF6F91]"
            >
              Back
            </button>
          ) : null}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleStepAdvance}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#EF6F91] px-5 text-sm font-semibold !text-white shadow-[0_12px_24px_rgba(239,111,145,0.2)] transition hover:bg-[#E95E84] hover:!text-white"
            >
              Continue
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  type = "text",
  min,
  step,
  placeholder,
}: {
  id?: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  min?: string;
  step?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id ?? createFieldIdentifier(label)} className="text-sm font-medium text-[#2F2A2A]">
        {label}
      </label>
      <input
        id={id ?? createFieldIdentifier(label)}
        name={name ?? createFieldIdentifier(label)}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        min={min}
        step={step}
        placeholder={placeholder}
        className={inputClassName()}
      />
    </div>
  );
}

function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  id?: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id ?? createFieldIdentifier(label)} className="text-sm font-medium text-[#2F2A2A]">
        {label}
      </label>
      <select
        id={id ?? createFieldIdentifier(label)}
        name={name ?? createFieldIdentifier(label)}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className={inputClassName()}
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  id,
  name,
  label,
  value,
  onChange,
  rows,
  required = false,
  placeholder,
}: {
  id?: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id ?? createFieldIdentifier(label)} className="text-sm font-medium text-[#2F2A2A]">
        {label}
      </label>
      <textarea
        id={id ?? createFieldIdentifier(label)}
        name={name ?? createFieldIdentifier(label)}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className={textareaClassName()}
      />
    </div>
  );
}

function CheckboxField({
  id,
  name,
  label,
  checked,
  onChange,
}: {
  id?: string;
  name?: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id ?? createFieldIdentifier(label)}
      className="flex items-center gap-3 rounded-2xl border border-[#F3E2E6] bg-[#FFFDFC] px-4 py-3 text-sm font-medium text-[#4F4A4A]"
    >
      <input
        id={id ?? createFieldIdentifier(label)}
        name={name ?? createFieldIdentifier(label)}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-[#E7C9D1] accent-[#EF6F91]"
      />
      <span>{label}</span>
    </label>
  );
}

function createFieldIdentifier(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function ActionChip({
  label,
  onClick,
  disabled = false,
  variant = "default",
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-8 items-center justify-center rounded-full px-3 text-xs font-semibold transition ${
        variant === "danger"
          ? "bg-[#FFF1F4] text-[#D45D80] hover:bg-[#FDECEF]"
          : "bg-[#FAF7EF] text-[#6B625A] hover:bg-[#F3E8D5]"
      } disabled:cursor-not-allowed disabled:opacity-45`}
    >
      {label}
    </button>
  );
}

function ChecklistRow({ label, complete }: { label: string; complete: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-[20px] border border-[#F6E4E8] bg-white/85 px-4 py-3">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          complete ? "bg-[#FDECEF] text-[#EF6F91]" : "bg-[#F5F0F1] text-[#A79A9A]"
        }`}
      >
        <CheckIcon className="h-4 w-4" />
      </span>
      <span className="text-sm text-[#5E5858]">{label}</span>
    </div>
  );
}

function InfoBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#F6F1E9] px-[10px] py-1 text-[11px] font-medium text-[#736A63]">
      {children}
    </span>
  );
}

function SubmitButton({
  pending,
  label,
  pendingLabel,
}: {
  pending: boolean;
  label: string;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center rounded-full bg-[#EF6F91] px-6 text-sm font-semibold !text-white shadow-[0_12px_24px_rgba(239,111,145,0.2)] transition hover:bg-[#E95E84] hover:!text-white disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 16V5m0 0-4 4m4-4 4 4M5 17.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="m5 12.5 4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
