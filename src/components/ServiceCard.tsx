import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  image?: string;
}

export default function ServiceCard({ title, description, href, icon, image }: ServiceCardProps) {
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
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col justify-center p-3 min-w-0">
              <div className="flex items-center gap-2 text-primary mb-1">
                {icon}
                <h3 className="font-semibold text-foreground text-[0.95rem] leading-tight">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-1.5">{description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-cta group-hover:gap-2 transition-all">
                Details <ArrowRight className="w-4 h-4" />
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
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="px-4 py-2.5">
              <div className="flex items-center gap-2 text-primary mb-0.5">
                {icon}
                <h3 className="font-semibold text-foreground text-sm line-clamp-1">{title}</h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">{description}</p>
              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-1.5 group-hover:gap-2 transition-all">
                Details <ArrowRight className="w-3.5 h-3.5" />
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
          <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3 group-hover:gap-2 transition-all">
            Details <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      )}
    </Link>
  );
}
