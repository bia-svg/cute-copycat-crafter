/**
 * Blog listing page — Deutsche Sachlichkeit style
 * Shows all blog posts with featured images, excerpts, and SEO
 */
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { pageSEO } from "@/data/seo";
import { getPath } from "@/lib/routes";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const { language, country, t } = useLanguage();
  const isDE = language !== "en";

  return (
    <>
      <SEO {...pageSEO.blog} pageKey="blog" />
      {/* Hero */}
      <section className="bg-[#8b827c] text-white py-16">
        <div className="container-main">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#8BB8E8] mb-2">
            {isDE ? "Wissen & Einblicke" : "Knowledge & Insights"}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {isDE ? "Blog — Hypnose verstehen" : "Blog — Understanding Hypnosis"}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {isDE
              ? "Fachartikel, Erfahrungsberichte und wissenschaftliche Hintergründe rund um Hypnose, Aktiv-Hypnose© und persönliche Veränderung."
              : "Expert articles, case studies and scientific background on hypnosis, Aktiv-Hypnose© and personal transformation."}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="border border-border bg-white hover:shadow-md transition-shadow group">
                {post.featuredImage && (
                  <Link to={`/${language}/${country}/blog/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <BookOpen className="w-3 h-3" />
                    <span>{isDE ? "Fachartikel" : "Expert Article"}</span>
                    <span>·</span>
                    <span>{Math.ceil((post.contentText?.length || 500) / 250)} min {isDE ? "Lesezeit" : "read"}</span>
                  </div>
                  <Link to={`/${language}/${country}/blog/${post.slug}`}>
                    <h2 className="text-lg font-bold text-[#1B3A5C] mb-2 group-hover:text-[#2E7D32] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.metaDescription || post.contentText?.slice(0, 160)}
                  </p>
                  <Link to={`/${language}/${country}/blog/${post.slug}`}>
                    <span className="text-sm font-semibold text-[#2E7D32] hover:text-[#1B5E20] inline-flex items-center gap-1">
                      {isDE ? "Weiterlesen" : "Read more"} <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#f4f3ef] border-t border-border">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-3">
            {isDE ? "Haben Sie Fragen zur Hypnose?" : "Have questions about hypnosis?"}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {isDE
              ? "Vereinbaren Sie ein kostenloses Erstgespräch und erfahren Sie, wie Aktiv-Hypnose© Ihnen helfen kann."
              : "Book a free discovery call and learn how Aktiv-Hypnose© can help you."}
          </p>
          <Link to={getPath("contact", language, country)}>
            <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold px-8 py-3">
              {isDE ? "Kostenloses Erstgespräch" : "Free Discovery Call"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
