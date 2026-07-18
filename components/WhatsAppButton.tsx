import CTAButton from "@/components/CTAButton";
import { defaultSiteSettings } from "@/lib/types/settings";

type WhatsAppButtonProps = {
  message: string;
  children?: React.ReactNode;
  className?: string;
  phoneNumber?: string;
};

export function normalizeWhatsAppNumber(phoneNumber: string) {
  const digits = phoneNumber.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    return digits.slice(2);
  }

  if (digits.startsWith("0")) {
    return `44${digits.slice(1)}`;
  }

  return digits;
}

export function buildWhatsAppUrl(
  message: string,
  phoneNumber = defaultSiteSettings.whatsapp_number,
) {
  const number = normalizeWhatsAppNumber(phoneNumber);

  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
}

export default function WhatsAppButton({
  message,
  children = "Enquire on WhatsApp",
  className,
  phoneNumber,
}: WhatsAppButtonProps) {
  return (
    <CTAButton href={buildWhatsAppUrl(message, phoneNumber)} className={className}>
      {children}
    </CTAButton>
  );
}
