import CTAButton from "@/components/CTAButton";
import { defaultSiteSettings } from "@/lib/types/settings";

type WhatsAppButtonProps = {
  message: string;
  children?: React.ReactNode;
  className?: string;
  phoneNumber?: string;
};

function sanitizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/\D/g, "");
}

export function buildWhatsAppUrl(
  message: string,
  phoneNumber = defaultSiteSettings.whatsapp_number,
) {
  return `https://wa.me/${sanitizePhoneNumber(phoneNumber)}?text=${encodeURIComponent(message)}`;
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
