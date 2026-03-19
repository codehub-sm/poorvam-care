import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StructuredData, { createFAQSchema } from "@/components/structured-data";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions", subtitle }: FAQSectionProps) {
  return (
    <section className="py-20 bg-warm-bg">
      <StructuredData data={createFAQSchema(faqs)} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 font-body">{subtitle}</p>
          )}
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-white rounded-xl border border-gray-100 px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-gray-900 hover:text-blue-600 py-5 text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 font-body leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
