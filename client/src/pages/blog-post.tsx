import { useParams, Link } from "wouter";
import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import { getBlogPost, getRelatedPosts } from "@/data/blog-posts";
import { Calendar, Clock, User, ArrowRight, ChevronRight, Phone } from "lucide-react";

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

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <>
        <SeoHead
          title="Post Not Found | Poorvam Care Blog"
          description="The blog post you are looking for could not be found."
        />
        <section className="py-32 text-center">
          <div className="max-w-xl mx-auto px-4">
            <h1 className="text-4xl font-heading font-extrabold text-gray-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 font-body mb-8">
              Sorry, we couldn't find the article you were looking for.
            </p>
            <Link
              href="/blog"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-blue-700 transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </section>
      </>
    );
  }

  const relatedPosts = getRelatedPosts(post.relatedSlugs);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "url": post.canonical,
    "datePublished": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorTitle,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Poorvam Care",
      "url": "https://poorvamcare.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.canonical,
    },
  };

  return (
    <>
      <SeoHead
        title={post.title + " | Poorvam Care Blog"}
        description={post.metaDescription}
        canonical={post.canonical}
      />
      <StructuredData data={blogPostingSchema} />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: "https://poorvamcare.in/" },
          { name: "Blog", url: "https://poorvamcare.in/blog" },
          { name: post.title, url: post.canonical },
        ])}
      />

      <article>
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-gray-500 font-body mb-6 flex-wrap">
              <Link
                href="/"
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              <Link
                href="/blog"
                className="hover:text-blue-600 transition-colors"
              >
                Blog
              </Link>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              <span className="text-gray-900 line-clamp-1">{post.title}</span>
            </nav>

            {/* Category badge */}
            <span
              className={`inline-block text-xs font-heading font-semibold px-3 py-1 rounded-full mb-4 ${getCategoryColor(
                post.category
              )}`}
            >
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-body">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Author box */}
            <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100 mb-10">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-heading font-bold text-lg">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-heading font-bold text-gray-900 text-sm">
                  {post.author}
                </p>
                <p className="text-gray-600 font-body text-xs">
                  {post.authorTitle}
                </p>
                <p className="text-blue-600 font-body text-xs mt-0.5">
                  Poorvam Care, Electronic City, Bangalore
                </p>
              </div>
            </div>

            {/* Post content */}
            <div
              className="prose prose-lg prose-blue max-w-none font-body
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
                prose-li:text-gray-700 prose-li:mb-1
                prose-ul:my-4 prose-ul:pl-6
                prose-strong:text-gray-900
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              Need Expert Guidance?
            </h2>
            <p className="text-white/90 font-body mb-8 max-w-xl mx-auto">
              Book a consultation at Poorvam Care. Our expert therapists in
              Electronic City, Bangalore are here to support your child's
              development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Book a Consultation
              </Link>
              <a
                href="tel:+918861764343"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 886 176 4343
              </a>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-warm-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <article
                    key={related.slug}
                    className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col"
                  >
                    <span
                      className={`self-start text-xs font-heading font-semibold px-2.5 py-1 rounded-full mb-3 ${getCategoryColor(
                        related.category
                      )}`}
                    >
                      {related.category}
                    </span>
                    <h3 className="text-base font-heading font-bold text-gray-900 mb-3 leading-snug flex-1">
                      <Link
                        href={`/blog/${related.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {related.title}
                      </Link>
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-body pt-3 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {related.readingTime} min read
                      </span>
                      <Link
                        href={`/blog/${related.slug}`}
                        className="flex items-center gap-1 text-blue-600 font-heading font-semibold hover:gap-2 transition-all"
                      >
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
