import { MessageCircle, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const icons: { Icon: LucideIcon; label: string; href: string }[] = [
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/2347053053040",
  },
  { Icon: Mail, label: "Email", href: "mailto:support@propertyloop.ng" },
];

export default function SocialIcons() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div className="flex flex-col gap-2.5">
        {icons.map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12.5 h-12.5 flex items-center justify-center rounded-(--radius-full) bg-primary/15 text-white transition-all duration-150
              hover:bg-transparent hover:border-2 hover:border-primary/15 hover:text-primary"
          >
            <item.Icon size={20} />
          </a>
        ))}
      </div>
    </div>
  );
}
