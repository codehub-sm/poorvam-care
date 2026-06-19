import { useState } from "react";
import { Link } from "wouter";
import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import { Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  "Speech Therapy": "bg-blue-100 text-blue-700",
  "Occupational Therapy": "bg-green-100 text-green-700",
  "Autism": "bg-purple-100 text-purple-700",
  "Child Development": "bg-orange-100 text-orange-700",
  "Parent Resources": "bg-pink-100 text-pink-700",
};

function getCategoryColor(category: string): string {
  return categoryColors[category] ?? "bg-gray-100 text-gray-700";
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Poorvam Care Blog",
    "description":
      "Expert articles on speech therapy, occupational therapy, autism and child development from Poorvam Care's therapists in Electronic City, Bangalore.",
    "url": "https://poorvamcare.in/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Poorvam Care",
      "url": "https://poorvamcare.in",
    },
    "blogPost": blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.metaDescription,
      "url": post.canonical,
      "datePublished": post.publishDate,
      "author": {
        "@type": "Person",
        "name": post.author,
      },
    })),
  };

  return (
    <>
      <SeoHead
        title="Blog | Speech Therapy & Child Development Resources | Poorvam Care Bangalore"
        description="Expert articles on speech therapy, occupational therapy, autism & child development from Poorvam Care's therapists in Electronic City, Bangalore."
        canonical="https://poorvamcare.in/blog"
      />
      <StructuredData data={blogListSchema} />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: "https://poorvamcare.in/" },
          { name: "Blog", url: "https://poorvamcare.in/blog" },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 font-body mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Blog</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Expert Resources
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-4 leading-tight">
              Therapy &amp; Child Development{" "}
              <span className="text-blue-600">Insights</span>
            </h1>
            <p className="text-lg text-gray-600 font-body leading-relaxed">
              Evidence-based articles on speech therapy, occupational therapy,
              autism, and child development — written by Poorvam Care's expert
              therapists in Bangalore.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <p className="text-center text-gray-500 font-body py-16">
              No posts found in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  {/* Card Header colour strip based on category */}
                  <div
                    className={`h-1.5 w-full ${
                      post.category === "Speech Therapy"
                        ? "bg-blue-500"
                        : post.category === "Occupational Therapy"
                        ? "bg-green-500"
                        : post.category === "Autism"
                        ? "bg-purple-500"
                        : post.category === "Child Development"
                        ? "bg-orange-500"
                        : "bg-pink-500"
                    }`}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-xs font-heading font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(
                          post.category
                        )}`}
                      >
                        {post.category}
                      </span>
                    </div>

                    <h2 className="text-lg font-heading font-bold text-gray-900 mb-3 leading-snug">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 font-body text-sm leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-body">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.publishDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime} min read
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-blue-600 text-sm font-heading font-semibold hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Have Questions About Your Child?
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Our expert therapists are here to help. Book a consultation at
            Poorvam Care in Electronic City, Bangalore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white/10 transition-colors"
            >
              Call: +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
