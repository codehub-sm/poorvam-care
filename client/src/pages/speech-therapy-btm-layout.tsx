import NeighbourhoodPage from "@/components/neighbourhood-page";

/**
 * BTM Layout neighbourhood landing page.
 *
 * All layout, schema, and CTA markup lives in <NeighbourhoodPage>. This file is
 * content only — the canonical URL is derived from `slug`, so it cannot drift
 * from the route the way it previously had.
 */
export default function SpeechTherapyBtmLayoutPage() {
  return (
    <NeighbourhoodPage
      slug="speech-therapy-btm-layout-bangalore"
      neighbourhood="BTM Layout"
      seoTitle="Speech Therapy in BTM Layout Bangalore | Poorvam Care Electronic City"
      seoDescription="Speech therapy for children in BTM Layout, Bangalore. Poorvam Care in Electronic City is just 7km away. RCI-licensed therapists. Book a consultation."
      schemaDescription="Speech therapy and early intervention services for families from BTM Layout, Bangalore"
      areaServed={["BTM Layout", "BTM Layout Stage 1", "BTM Layout Stage 2", "Madiwala"]}
      heroBlurb="Poorvam Care in Electronic City is just 7 km from BTM Layout — approximately 15–20 minutes via Silk Board Junction. Our RCI-licensed speech-language pathologists provide expert therapy for children with speech delays, autism, language disorders, and more. Book a consultation today."
      distanceText="Approximately 7 km via Silk Board Junction and Hosur Road"
      travelTimeText="Around 15–20 minutes by car under normal traffic conditions"
      teletherapyText="Online speech therapy sessions from your BTM Layout home"
      proseHeading="Trusted by Families Across BTM Layout"
      prose={[
        "Poorvam Care has been supporting children and families from BTM Layout Stage 1 and Stage 2 for many years. Parents from neighbourhoods including 6th Main, the AECS Layout area, Madiwala, and the 29th Cross residential blocks have made us their trusted therapy partner for early intervention and speech-language services.",
        "Getting to our Electronic City centre from BTM Layout is quick and straightforward. The most popular route for BTM families is via 6th Main Road to Silk Board Junction, then south along Hosur Road. Families from the northern parts of BTM often find the Jayadeva flyover a convenient shortcut to Hosur Road. Our centre on Hulimangla Road in EC Phase 1 is well-signposted from the main Hosur Road corridor.",
        "Speech therapy for young children delivers the best outcomes when started early. If you have noticed that your toddler is not meeting speech milestones — or if your school-age child is struggling with articulation, comprehension, or social communication — a professional assessment at Poorvam Care is the right first step. Our speech-language pathologists carry RCI registration and have helped hundreds of children from BTM Layout and surrounding areas achieve meaningful communication progress.",
        "At Poorvam Care, no two therapy plans are alike. After a thorough initial assessment, our therapist creates goals specific to your child's strengths and areas of difficulty. Therapy sessions are play-based and engaging for younger children, while older children benefit from structured language and literacy activities. Parent coaching is built into every programme so that the progress made in the clinic continues at home in BTM Layout.",
        "We also serve families from Madiwala and the surrounding areas. Whether your child needs intensive weekly sessions or a lighter fortnightly schedule with teletherapy top-ups, we will work with you to design a plan that fits your family's routine. With over 900 families helped across Bangalore and 13 years of experience, Poorvam Care is the speech therapy centre that BTM Layout parents recommend to each other.",
      ]}
      faqTitle="Speech Therapy for BTM Layout — Common Questions"
      faqs={[
        {
          question: "Is there a speech therapist near BTM Layout?",
          answer:
            "Poorvam Care in Electronic City is the nearest dedicated speech and language therapy centre for families in BTM Layout. Located approximately 7 km from BTM Layout Stage 1 and Stage 2, our centre is around 15–20 minutes by car via Silk Board Junction. Our team of RCI-licensed speech-language pathologists has more than 13 years of experience helping children with speech delays, language disorders, autism-related communication challenges, and stuttering.",
        },
        {
          question: "How do I reach Poorvam Care from BTM Layout?",
          answer:
            "From BTM Layout Stage 1 or Stage 2, take 6th Main Road towards Silk Board Junction. From Silk Board, join Hosur Road heading south towards Electronic City. Take the Hulimangla Road exit into EC Phase 1. Alternatively, you can use the Jayadeva flyover to reach Hosur Road more quickly from the 27th Cross area. Total drive time is approximately 15–20 minutes in normal traffic. You can also get directions via our Google Maps link on the contact page.",
        },
        {
          question: "Does Poorvam Care offer home visits to BTM Layout?",
          answer:
            "We do not currently offer in-home therapy visits, but we do provide teletherapy (online speech therapy) sessions that are an excellent option for families in BTM Layout who prefer to avoid the commute on some days. Our therapists conduct live video sessions using proven methods and supply home activity guides so your child's progress continues between centre visits. Speak to our team to find out if a blended in-person and teletherapy schedule would suit your child.",
        },
        {
          question: "What conditions are treated at Poorvam Care?",
          answer:
            "Poorvam Care treats a wide range of developmental and communication conditions, including speech sound disorders, expressive and receptive language delays, autism spectrum disorder (ASD), ADHD, cerebral palsy, Down syndrome, sensory processing difficulties, stuttering and fluency disorders, voice disorders, and feeding and swallowing difficulties in children. Our multidisciplinary team includes speech therapists, occupational therapists, ABA therapists, and special educators who work collaboratively to create individualised care plans.",
        },
      ]}
      ctaBody="Families from BTM Layout trust Poorvam Care for expert, compassionate speech therapy. Book a consultation and let us create a personalised plan for your child."
    />
  );
}
