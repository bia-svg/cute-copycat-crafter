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
}

export default function ServiceCard({ title, description, href, icon, image, imagePosition = "center 60%" }: ServiceCardProps) {
  return (
    <Link
      to={href}
      className="group block bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
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
                style={{ objectPosition: imagePosition }}
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
            <div className="aspect-[16/9] overflow-hidden">
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
            <div className="px-4 pt-2 pb-3.5">
              <div className="flex items-center gap-2 text-primary mb-0.5">
                {icon}
                <h3 className="font-semibold text-foreground text-sm leading-snug">{title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E7D32] group-hover:text-[#1B5E20] mt-1.5 group-hover:gap-2 transition-all">
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
