import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema, createServiceSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const specialEdFAQs = [
  {
    question: "What is special education and who is it for?",
    answer: "Special education is a tailored educational approach designed for children who learn differently due to conditions such as autism, ADHD, learning disabilities, intellectual disabilities, or developmental delays. At Poorvam Care, our special educators create individualized education plans (IEPs) that address each child's unique learning style and pace.",
  },
  {
    question: "How is special education different from regular tutoring?",
    answer: "Unlike tutoring, which focuses on academic content, special education addresses the underlying learning challenges. Our special educators use evidence-based teaching methods, visual aids, multisensory techniques, and structured environments to help children develop foundational academic skills, attention, memory, and problem-solving abilities.",
  },
  {
    question: "Can special education be combined with speech and occupational therapy?",
    answer: "Yes, and we highly recommend it. At Poorvam Care, our multi-disciplinary team coordinates special education with speech therapy, occupational therapy, and ABA therapy to ensure consistent goals across all areas of development. This integrated approach leads to better outcomes than isolated interventions.",
  },
  {
    question: "At what age should my child start special education?",
    answer: "Early intervention is key. Children as young as 2–3 years old can benefit from pre-academic special education programs that build foundational skills like attention, following instructions, and basic concepts. For school-age children, special education helps bridge gaps in reading, writing, and math alongside mainstream schooling.",
  },
  {
    question: "How do I know if my child needs special education?",
    answer: "Signs that your child may benefit include difficulty following classroom instructions, struggling to keep up with peers academically, short attention span, difficulty with reading or writing, trouble understanding abstract concepts, and behavioural challenges in school settings. A professional assessment at Poorvam Care can help determine the right support.",
  },
];

export default function SpecialEducationForChildren() {
  return (
    <>
      <SeoHead
        title="Special Education for Children in Bangalore | Poorvam Care, Electronic City"
        description="Individualized special education programs for children with autism, ADHD, learning disabilities, and developmental delays in Electronic City, Bangalore. IEP-based approach integrated with speech therapy and occupational therapy."
        canonical="https://poorvamcare.in/special-education-for-children-bangalore"
        keywords="special education Bangalore, special education for children, special educator near me Electronic City, special needs education Bangalore, IEP therapy Bangalore, special education for autism, special education ADHD, learning disability support Bangalore, special educator Bommanahalli, special education HSR Layout, special needs school support Electronic City, remedial education Bangalore, special education cost Bangalore"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData data={createServiceSchema({
        name: "Special Education for Children",
        description: "Individualized special education programs for children with autism, ADHD, learning disabilities, and developmental delays in Electronic City, Bangalore. IEP-based approach with multi-disciplinary therapy integration.",
        url: "https://poorvamcare.in/special-education-for-children-bangalore",
      })} />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Services", url: "https://poorvamcare.in/child-development" },
        { name: "Special Education", url: "https://poorvamcare.in/special-education-for-children-bangalore" },
      ])} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #E8725A 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-coral/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-coral font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Individualized Learning · Electronic City, Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              Special Education for{" "}
              <span className="text-coral">Children</span> in Bangalore
            </h1>
            <p className="text-lg text-warm-gray-200 font-body leading-relaxed">
              Empowering children with learning differences through individualized education plans, multisensory teaching, and evidence-based strategies — designed to build confidence and academic readiness.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding Special Education */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Understanding Special Education
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Special education is not about limitations — it's about recognizing that every child learns differently and providing the right support to help them thrive. Children with autism, ADHD, learning disabilities, intellectual disabilities, and developmental delays often struggle in traditional classroom settings, not because they lack intelligence, but because they need a different approach to learning.
            </p>
            <p>
              At Poorvam Care, our special educators use Individualized Education Plans (IEPs) to set specific, measurable goals for each child. These plans are developed in collaboration with parents and our therapy team to ensure that educational goals align with the child's overall developmental progress.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Our Special Education Approach
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Our special education program is built on three pillars: individualized assessment, structured teaching, and multi-disciplinary collaboration. We don't just teach subjects — we build the foundational cognitive and pre-academic skills that children need to succeed in any learning environment.
            </p>
          </div>

          <h3 className="text-xl font-heading font-bold text-brown-deep mt-10 mb-4">What Our Program Covers</h3>
          <ul className="space-y-3">
            {[
              "Comprehensive educational assessment to identify learning strengths, challenges, and gaps",
              "Individualized Education Plan (IEP) with measurable goals reviewed every quarter",
              "Pre-academic skills: attention, sitting tolerance, following instructions, turn-taking",
              "Academic skills: reading readiness, phonics, writing, number concepts, and basic math",
              "Multisensory teaching methods (visual, auditory, kinesthetic) to match each child's learning style",
              "Social skills and classroom readiness training for school integration",
              "Coordination with school teachers to ensure continuity between therapy and classroom",
              "Regular parent training to support learning at home",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                <span className="text-brown-mid font-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Children Who Benefit from Special Education
          </h2>
          <div className="text-brown-mid font-body leading-relaxed">
            <ul className="grid md:grid-cols-2 gap-3 mt-4">
              {[
                "Autism Spectrum Disorder (ASD)",
                "Attention Deficit Hyperactivity Disorder (ADHD)",
                "Specific Learning Disabilities (Dyslexia, Dyscalculia, Dysgraphia)",
                "Intellectual Disability",
                "Down Syndrome",
                "Cerebral Palsy",
                "Global Developmental Delay",
                "Speech and Language Disorders",
              ].map((condition) => (
                <li key={condition} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-sage flex-shrink-0" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why Poorvam */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Why Choose Poorvam Care for Special Education
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              What sets Poorvam Care apart is our truly integrated approach. Our special educators don't work in isolation — they collaborate daily with our speech therapists, occupational therapists, and ABA therapists to ensure that your child's educational goals align with their overall developmental plan.
            </p>
            <p>
              With centres in Electronic City Phase 1 and Phase 2, we are conveniently located for families across south Bangalore, including Bommanahalli, HSR Layout, Hosa Road, Kudlu Gate, Singasandra, and Chandapura. Our structured, sensory-friendly learning environments are designed to help children focus, engage, and learn effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Related Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/aba-therapy-for-children-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">ABA Therapy</h3>
              <p className="text-brown-mid text-sm font-body">Behaviour analysis and positive reinforcement for skill building.</p>
            </Link>
            <Link href="/speech-therapy-for-speech-delay-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Speech Therapy for Speech Delay</h3>
              <p className="text-brown-mid text-sm font-body">Helping late talkers develop language and communication skills.</p>
            </Link>
            <Link href="/occupational-therapy-for-children-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Occupational Therapy</h3>
              <p className="text-brown-mid text-sm font-body">Fine motor skills, sensory integration, and daily living activities.</p>
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={specialEdFAQs}
        title="Special Education — Frequently Asked Questions"
        subtitle="Common questions from parents about special education at Poorvam Care"
      />

      {/* CTA */}
      <section className="py-16 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-warm-bg mb-4">
            Help Your Child Learn and Grow
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Every child can learn. Book a free assessment to understand your child's learning needs and explore how our special education program can support them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25"
            >
              Book Free Assessment
            </Link>
            <a
              href="tel:+918861764343"
              className="border-2 border-warm-bg text-warm-bg px-8 py-4 rounded-xl font-heading font-bold hover:bg-warm-bg hover:text-brown-deep transition-colors"
            >
              Call: +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
