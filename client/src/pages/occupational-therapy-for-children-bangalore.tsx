import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema, createServiceSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const otFAQs = [
  {
    question: "What is occupational therapy for children?",
    answer: "Occupational therapy (OT) for children helps them develop the skills needed for daily activities — writing, dressing, eating, playing, and learning. It addresses fine motor skills, sensory processing, coordination, and self-care through play-based, child-friendly activities.",
  },
  {
    question: "How do I know if my child needs occupational therapy?",
    answer: "Signs your child may benefit from OT include: difficulty holding a pencil or writing, trouble with buttons/zippers, sensitivity to textures or sounds, poor balance or coordination, difficulty sitting still, challenges with self-care tasks (eating, dressing), or sensory-seeking behaviours.",
  },
  {
    question: "What is sensory integration therapy?",
    answer: "Sensory integration therapy helps children who have difficulty processing sensory input (touch, sound, movement, visual). Our OT team uses specialized equipment like swings, crash pads, and tactile walls to help children regulate their sensory responses, improving focus, behaviour, and daily functioning.",
  },
  {
    question: "How often should my child attend occupational therapy?",
    answer: "Most children benefit from 1–3 OT sessions per week, depending on their needs. We also provide a home exercise programme so parents can reinforce skills between sessions. Our team regularly reviews progress and adjusts the therapy frequency as your child improves.",
  },
];

export default function OccupationalTherapyForChildren() {
  return (
    <>
      <SeoHead
        title="Occupational Therapy for Children in Bangalore | Poorvam Care, Electronic City"
        description="Expert occupational therapy for children with sensory processing issues, motor skill delays, and developmental challenges in Electronic City, Bangalore. RCI registered therapists. Free consultation."
        canonical="https://poorvamcare.in/occupational-therapy-for-children-bangalore"
        keywords="occupational therapy for children Bangalore, pediatric OT Electronic City, sensory processing therapy Bangalore, fine motor skills therapy, OT for autism Bangalore, occupational therapy near me Electronic City, OT near me Bommanahalli, occupational therapy cost Bangalore, sensory integration therapy near me, pediatric OT Hosa Road, occupational therapy Kudlu Gate, OT for ADHD Bangalore, occupational therapy fees Bangalore, best occupational therapist for children near me, sensory processing disorder therapy HSR Layout"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData data={createServiceSchema({
        name: "Occupational Therapy for Children",
        description: "Pediatric occupational therapy for children with sensory processing issues, motor skill delays, coordination difficulties, and developmental challenges in Electronic City, Bangalore.",
        url: "https://poorvamcare.in/occupational-therapy-for-children-bangalore",
      })} />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Services", url: "https://poorvamcare.in/child-development" },
        { name: "Occupational Therapy for Children", url: "https://poorvamcare.in/occupational-therapy-for-children-bangalore" },
      ])} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #E8725A 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-sage/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-sage font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Pediatric Therapy · Electronic City, Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              Occupational Therapy for{" "}
              <span className="text-sage">Children</span> in Bangalore
            </h1>
            <p className="text-lg text-warm-gray-200 font-body leading-relaxed">
              Helping children develop the motor skills, sensory processing abilities, and daily living skills they need to thrive at home, school, and play.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            When Does a Child Need Occupational Therapy?
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Occupational therapy (OT) helps children who struggle with everyday activities that most people take for granted. This includes fine motor tasks like writing and buttoning clothes, gross motor activities like climbing and balance, sensory processing (being over- or under-sensitive to touch, sound, or movement), and self-care skills like feeding and dressing.
            </p>
            <p>
              Children with autism spectrum disorder, ADHD, developmental delays, cerebral palsy, Down syndrome, or sensory processing disorder often benefit significantly from occupational therapy. Early intervention gives children the best chance of catching up with their peers and building independence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Our Approach at Poorvam Care
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Our pediatric occupational therapists use a combination of sensory integration therapy, play-based intervention, and structured motor skill activities. Every therapy plan is individualized based on a thorough initial assessment that evaluates your child's motor skills, sensory profile, and functional abilities.
            </p>
            <p>
              At Poorvam Care, OT is part of our multi-disciplinary team approach. When needed, our occupational therapists collaborate closely with speech therapists, behavioural therapists, and special educators to address all aspects of your child's development holistically.
            </p>
          </div>

          <h3 className="text-xl font-heading font-bold text-brown-deep mt-10 mb-4">What Parents Can Expect</h3>
          <ul className="space-y-3">
            {[
              "Detailed initial assessment of motor skills, sensory processing, and daily living abilities",
              "Individualized OT plan with measurable goals reviewed regularly",
              "Sensory integration therapy in a purpose-designed sensory room",
              "Fine motor skill development through engaging, age-appropriate activities",
              "Gross motor and coordination exercises to build strength and balance",
              "School readiness skills including handwriting, scissor use, and classroom behaviour",
              "Parent coaching sessions with home activity recommendations",
              "Collaboration with your child's school if needed",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                <span className="text-brown-mid font-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Why Choose Poorvam Care for Occupational Therapy
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Our OT team works under the clinical leadership of Apoorva Rai (MASLP, RCI Licensed), ensuring therapy is evidence-based and aligned with the latest research. With two centres in Electronic City, we serve families from across south Bangalore including Electronic City Phase 1, Phase 2, Ananth Nagar, Hosa Road, and Bommanahalli.
            </p>
            <p>
              Our centres feature dedicated sensory rooms equipped with swings, crash pads, tactile walls, and vestibular equipment — creating the optimal environment for sensory integration therapy. We believe in making therapy fun while being clinically effective.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={otFAQs}
        title="Occupational Therapy — FAQs"
        subtitle="Common questions about pediatric occupational therapy"
      />

      {/* CTA */}
      <section className="py-16 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-warm-bg mb-4">
            Book a Free OT Assessment
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Not sure if your child needs occupational therapy? Book a free consultation with our team for an initial evaluation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25"
            >
              Book Free Consultation
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
