import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-secondary/50 border-b border-border">
      <div className="container-main py-2">
        <ol className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3 h-3 shrink-0" />}
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">{item.name}</span>
                ) : (
                  <Link to={item.path} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
