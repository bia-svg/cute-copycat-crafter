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
    <Link to={href} className="group block bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <div className="aspect-[16/10] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
      )}
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
    </Link>
  );
}
