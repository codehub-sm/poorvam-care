import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { BookOpen, Target, Users, Heart, Star, ArrowRight, CheckCircle } from "lucide-react";

const approaches = [
  {
    title: "Individualised Education Plans (IEPs)",
    description: "Every child in our special education programme has a written IEP with specific, measurable goals across academic, communication, social, and self-care domains — reviewed with families every term.",
    icon: Target,
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    title: "Structured Teaching",
    description: "We use TEACCH-inspired structured teaching environments that provide visual clarity, predictability, and organisation — helping children with autism and intellectual disabilities learn independently.",
    icon: BookOpen,
    color: "bg-green-50 border-green-100",
    iconColor: "text-green-600 bg-green-100",
  },
  {
    title: "Multi-Sensory Learning",
    description: "Lessons incorporate visual, auditory, tactile, and kinesthetic elements. This approach meets diverse learning styles and makes abstract concepts concrete and accessible.",
    icon: Star,
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600 bg-purple-100",
  },
  {
    title: "School Collaboration",
    description: "We work directly with mainstream schools to develop accommodation plans, train teachers, and support inclusion — so children can participate as fully as possible in their regular school.",
    icon: Users,
    color: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-600 bg-orange-100",
  },
];

const conditionsSupported = [
  "Learning Disabilities (Dyslexia, Dyscalculia, Dysgraphia)",
  "Autism Spectrum Disorder",
  "Intellectual Disability (mild, moderate, severe)",
  "ADHD",
  "Down Syndrome",
  "Cerebral Palsy",
  "Language-Based Learning Disabilities",
  "Global Developmental Delay",
];

const faqs = [
  {
    question: "What is the difference between special education and mainstream school?",
    answer: "Mainstream schools follow a standard curriculum with large class sizes and pace of instruction suited to the typical range of learners. Special education provides highly individualised instruction in a smaller, more structured setting, with goals and teaching methods tailored to each child's unique learning profile. At Poorvam Care, our special education programme is not a replacement for school — it is a complementary service that equips children with the foundational skills to participate more successfully in mainstream education.",
  },
  {
    question: "Does my child need a diagnosis to join the special education program?",
    answer: "A formal diagnosis is not required to begin special education at Poorvam Care. We conduct our own comprehensive educational assessment to understand your child's current skill levels, learning style, and specific challenges. While many children who attend our programme do have a diagnosis such as autism, dyslexia, or intellectual disability, we welcome any child who is struggling in a regular classroom and would benefit from individualised, structured support.",
  },
  {
    question: "How are lessons individualised at Poorvam?",
    answer: "Each child's programme is built around a detailed assessment covering pre-academic and academic skills, attention and executive function, communication, social skills, and self-care. From this, our special educator — Pooja, with 6 years of experience — creates an IEP with specific goals. Lessons are designed around those goals, using the child's interests and preferred learning modalities to maximise engagement and retention. Progress is reviewed every term and the programme updated accordingly.",
  },
  {
    question: "Can special education help my child transition to a mainstream school?",
    answer: "Yes. Transition to mainstream schooling is an explicit goal for many children in our programme. We systematically build the skills children need to succeed in a regular classroom — following instructions in a group, tolerating classroom noise and transitions, managing independent work, and interacting appropriately with peers. We also liaise with receiving schools to ensure appropriate accommodations and support are in place. Many of our past students have successfully transitioned to mainstream or supported mainstream schools.",
  },
  {
    question: "Who teaches special education at Poorvam Care?",
    answer: "Our special education programme is led by Pooja, our Senior Special Education Teacher with 6 years of dedicated paediatric experience. She holds a degree in Special Education and has specialist knowledge of autism, intellectual disability, and learning differences. She works closely with Apoorva Rai (Clinical Director, 13+ years) and the rest of the multidisciplinary team to ensure each child's educational goals are aligned with their therapy objectives.",
  },
];

export default function SpecialEducationPage() {
  return (
    <>
      <SeoHead
        title="Special Education in Bangalore | Individualised Learning Plans | Poorvam Care Electronic City"
        description="Poorvam Care's special education program in Electronic City, Bangalore. Individualised learning plans for children with autism, learning disabilities & more."
        canonical="https://poorvamcare.in/special-education"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Special Education Program",
          "description": "Individualised special education programmes for children with autism, learning disabilities, intellectual disability, and developmental delays in Electronic City, Bangalore",
          "url": "https://poorvamcare.in/special-education",
          "telephone": "+918861764343",
          "medicalSpecialty": "Special Education",
          "relevantSpecialty": "Paediatric Special Education",
          "provider": {
            "@type": "MedicalBusiness",
            "name": "Poorvam Care",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Electronic City Phase 1 & Phase 2",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "addressCountry": "IN",
            },
          },
        }}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: "https://poorvamcare.in/" },
          { name: "Child Development", url: "https://poorvamcare.in/child-development" },
          { name: "Special Education", url: "https://poorvamcare.in/special-education" },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm font-body text-gray-500">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li><span>/</span></li>
            <li><Link href="/child-development" className="hover:text-blue-600 transition-colors">Child Development</Link></li>
            <li><span>/</span></li>
            <li className="text-gray-900 font-medium">Special Education</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-orange-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Special Education Programme
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Special Education in Bangalore:{" "}
              <span className="text-orange-600">Every Child Can Learn</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Every child has the capacity to learn — what differs is how they learn best. At Poorvam Care in Electronic City, Bangalore, our special education programme delivers highly personalised, structured teaching that meets each child where they are and builds the skills they need to thrive academically, socially, and independently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-orange-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/25"
              >
                Book a Free Consultation
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold hover:border-orange-600 hover:text-orange-600 transition-colors"
              >
                Call: +91 886 176 4343
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is Special Education at Poorvam */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              What Is Special Education at Poorvam Care?
            </h2>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              Special education at Poorvam Care is not a school — it is an intensive, centre-based educational support programme for children who need more individualised instruction than a mainstream classroom can provide. It sits alongside (not instead of) school, offering small-group and one-on-one teaching sessions designed around each child's unique learning profile.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              Our programme is designed for children who are struggling to access the curriculum, falling significantly behind their peers, or who have been identified with a learning disability, developmental delay, or intellectual disability. We provide the structured, intensive support they need to build foundational skills — pre-academic, academic, communication, and self-regulation — so they can participate more meaningfully in school and life.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed">
              Sessions are 45 minutes and are conducted at our Electronic City Phase 1 and Phase 2 centres. Our special education programme integrates closely with our <Link href="/speech-therapy" className="text-orange-600 hover:underline">speech therapy</Link>, <Link href="/aba-therapy" className="text-orange-600 hover:underline">ABA therapy</Link>, and <Link href="/occupational-therapy" className="text-orange-600 hover:underline">occupational therapy</Link> services, ensuring that each child's educational and developmental goals are aligned.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Approach to Special Education
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Individualised, evidence-based, and built around each child's strengths
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approaches.map((approach) => {
              const Icon = approach.icon;
              return (
                <article
                  key={approach.title}
                  className={`rounded-2xl p-8 border ${approach.color} hover:shadow-md transition-shadow`}
                >
                  <div className={`w-12 h-12 ${approach.iconColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-3">
                    {approach.title}
                  </h3>
                  <p className="text-gray-600 font-body leading-relaxed">
                    {approach.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conditions + Parent Involvement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Conditions We Support
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Our special educators are trained in supporting children with a wide range of learning and developmental profiles:
              </p>
              <div className="space-y-3">
                {conditionsSupported.map((condition) => (
                  <div key={condition} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700 font-body">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Parent Involvement: You Are the Expert on Your Child
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-4">
                Parents are not passive observers in our special education programme — they are active partners. We believe that the adults who know a child best are essential to designing the most effective programme.
              </p>
              <div className="space-y-4">
                {[
                  { title: "IEP Collaboration", desc: "Goals are set together with parents at the start of each term and reviewed at regular progress meetings." },
                  { title: "Home Practice Guidance", desc: "Families receive weekly activities and strategies to reinforce learning goals at home in everyday routines." },
                  { title: "School Liaison", desc: "We attend parent-teacher meetings, write school reports, and advise teachers on accommodations — ensuring consistency between Poorvam Care and school." },
                  { title: "Parent Workshops", desc: "We host regular workshops on topics such as literacy strategies, managing learning-related anxiety, and supporting homework." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <Heart className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-600 font-body text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center">
            Related Services at Poorvam Care
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "ABA Therapy", href: "/aba-therapy" },
              { label: "Speech Therapy", href: "/speech-therapy" },
              { label: "Occupational Therapy", href: "/occupational-therapy" },
              { label: "Parent Counselling", href: "/parent-counselling" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-gray-100 hover:border-orange-300 hover:shadow-sm transition-all font-heading font-semibold text-gray-800 hover:text-orange-600"
              >
                {item.label} <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="Special Education FAQs"
        subtitle="Answers to help families in Bangalore make informed decisions about special education"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Unlock Your Child's Learning Potential
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Book a free consultation with our special education team at Poorvam Care in Electronic City, Bangalore. Let us understand your child and create a programme that works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a Free Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Call: +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
