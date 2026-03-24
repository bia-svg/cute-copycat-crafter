/**
 * Individual Blog Post page — renders structured content from legacy posts
 * Deutsche Sachlichkeit style with proper SEO
 */
import { useParams, Link, Navigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPath } from "@/lib/routes";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, BookOpen, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CDN } from "@/lib/cdn";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { language, country, t } = useLanguage();
  const isDE = language !== "en";

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Redirect to={getPath("blog", language, country)} />;
  }

  const readTime = Math.ceil((post.contentText?.length || 500) / 250);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#f4f3ef] border-b border-border py-3">
        <div className="container-main">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={getPath("home", language, country)} className="hover:text-[#1B3A5C]">Home</Link>
            <span>/</span>
            <Link to={getPath("blog", language, country)} className="hover:text-[#1B3A5C]">Blog</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="py-12 bg-white">
        <div className="container-main max-w-3xl mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <BookOpen className="w-4 h-4" />
            <span>{isDE ? "Fachartikel" : "Expert Article"}</span>
            <span>·</span>
            <span>{readTime} min {isDE ? "Lesezeit" : "read"}</span>
            <span>·</span>
            <span>David J. Woods</span>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8 border border-border">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.map((block, i) => {
              switch (block.tag) {
                case "h1":
                  return <h1 key={i} className="text-3xl md:text-4xl font-bold text-[#1B3A5C] mb-6">{block.text}</h1>;
                case "h2":
                  return <h2 key={i} className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">{block.text}</h2>;
                case "h3":
                  return <h3 key={i} className="text-xl font-bold text-[#1B3A5C] mt-8 mb-3">{block.text}</h3>;
                case "h4":
                  return <h4 key={i} className="text-lg font-bold text-[#1B3A5C] mt-6 mb-2">{block.text}</h4>;
                case "li":
                  return <li key={i} className="text-foreground leading-relaxed ml-6 list-disc">{block.text}</li>;
                default:
                  return <p key={i} className="text-foreground leading-relaxed mb-4">{block.text}</p>;
              }
            })}
          </div>

          {/* Author Box */}
          <div className="mt-12 p-6 bg-[#f4f3ef] border border-border flex gap-5 items-start">
            <img src={CDN.aboutAktivHypnose} alt="David J. Woods" className="w-20 h-20 object-cover rounded-full flex-shrink-0" />
            <div>
              <p className="font-bold text-[#1B3A5C]">David J. Woods</p>
              <p className="text-sm text-muted-foreground">Lic.Psych. · NGH International Trainer · {isDE ? "Über 40 Jahre Erfahrung" : "Over 40 years experience"}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {isDE
                  ? "David J. Woods ist einer der erfahrensten Hypnosetherapeuten im deutschsprachigen Raum mit über 30.000 durchgeführten Sitzungen."
                  : "David J. Woods is one of the most experienced hypnotherapists in the German-speaking world with over 30,000 sessions conducted."}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center">
            <Link to={getPath("blog", language, country)}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> {isDE ? "Alle Artikel" : "All Articles"}
              </Button>
            </Link>
            <Link to={getPath("contact", language, country)}>
              <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white gap-2">
                {isDE ? "Kostenloses Erstgespräch" : "Free Discovery Call"}
              </Button>
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-12 bg-[#f4f3ef] border-t border-border">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-[#1B3A5C] mb-8">
            {isDE ? "Weitere Artikel" : "More Articles"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 3)
              .map((related) => (
                <Link key={related.slug} href={`/${language}/${country}/blog/${related.slug}`}>
                  <div className="bg-white border border-border p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-[#1B3A5C] text-sm mb-2 line-clamp-2">{related.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{related.metaDescription}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
