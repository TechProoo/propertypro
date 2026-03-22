import { FacebookIcon, MessageCircle, InstagramIcon, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icons: { Icon: LucideIcon; label: string }[] = [
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: MessageCircle, label: "WhatsApp" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: Mail, label: "Email" },
];

export default function SocialIcons() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
      <div className="flex flex-col gap-2.5">
        {icons.map((item) => (
          <a
            key={item.label}
            href="#"
            aria-label={item.label}
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
