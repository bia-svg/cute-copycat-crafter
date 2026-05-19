import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  image?: string;
  imagePosition?: string;
  mobileImagePosition?: string;
}

export default function ServiceCard({ title, description, href, icon, image, imagePosition = "center 45%", mobileImagePosition }: ServiceCardProps) {
  const mobilePos = mobileImagePosition ?? imagePosition;
  return (
    <Link
      to={href}
      className="group block bg-gradient-to-b from-white to-[#FBFCFD] border border-[#1B3A5C]/18 rounded-lg overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.85)_inset,0_1px_2px_rgba(27,58,92,0.05),0_8px_22px_-8px_rgba(27,58,92,0.10),0_28px_60px_-28px_rgba(27,58,92,0.32)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.92)_inset,0_2px_5px_rgba(27,58,92,0.07),0_12px_28px_-8px_rgba(27,58,92,0.13),0_36px_76px_-28px_rgba(27,58,92,0.38)] hover:-translate-y-[2px] transition-all duration-300 ease-out"
    >
      {image && (
        <>
          {/* Mobile: horizontal card with small thumbnail */}
           <div className="flex md:hidden">
            <div className="w-24 min-h-[5.5rem] shrink-0 overflow-hidden">
              <img
                src={image}
                alt={title}
                width={96}
                height={88}
                sizes="96px"
                style={{ objectPosition: mobilePos }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col justify-center p-3 min-w-0">
              <div className="flex items-center gap-2 text-primary mb-1">
                {icon}
                <h3 className="font-semibold text-foreground text-[0.95rem] leading-snug">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-1.5">{description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2E7D32] group-hover:text-[#1B5E20] group-hover:gap-2 transition-all">
                Mehr erfahren <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
          {/* Desktop: vertical card */}
          <div className="hidden md:block">
            <div className="aspect-[16/9] overflow-hidden service-card-image">
              <img
                src={image}
                alt={title}
                width={640}
                height={360}
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                style={{ objectPosition: imagePosition }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="px-4 pt-1.5 pb-2.5 service-card-body">
              <div className="flex items-center gap-2 text-primary mb-0.5">
                {icon}
                <h3 className="font-semibold text-foreground text-sm leading-snug">{title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-[1.45]">{description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E7D32] group-hover:text-[#1B5E20] mt-1 group-hover:gap-2 transition-all">
                Mehr erfahren <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </>
      )}
      {!image && (
        <div className="p-5">
          <div className="flex items-center gap-2 text-primary mb-2">
            {icon}
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2E7D32] hover:text-[#1B5E20] mt-3 group-hover:gap-2 transition-all">
            Mehr erfahren <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      )}
    </Link>
  );
}
