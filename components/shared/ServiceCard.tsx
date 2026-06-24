import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
  delay?: number;
}

export function ServiceCard({
  title,
  description,
  image,
  href = "#",
  delay = 0,
}: ServiceCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border/50 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-1">
            {description}
          </p>
          <Link
            href={href}
            className="inline-flex items-center text-accent font-medium text-sm hover:text-accent/80 transition-colors"
          >
            Learn More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}
