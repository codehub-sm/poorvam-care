import NeighbourhoodPage from "@/components/neighbourhood-page";
import { STATS } from "@/config/site";

/**
 * Marathahalli neighbourhood landing page — content only.
 *
 * Uses the optional numbered route breakdown, since the ORR route is the main
 * thing families from this corridor need spelled out.
 */
export default function SpeechTherapyMaratahalliPage() {
  return (
    <NeighbourhoodPage
      slug="speech-therapy-marathahalli-bangalore"
      neighbourhood="Marathahalli"
      seoTitle="Speech Therapy in Marathahalli Bangalore | Poorvam Care Electronic City"
      seoDescription="Speech therapy for children near Marathahalli, Bangalore. Poorvam Care in Electronic City is 20km away. Teletherapy available. Book a consultation."
      schemaDescription="Speech therapy and early intervention services for families from Marathahalli, Bellandur, and Sarjapur Road, Bangalore"
      areaServed={["Marathahalli", "Bellandur", "Sarjapur Road", "Outer Ring Road"]}
      heroKicker="Serving Families from Marathahalli, Bellandur & Sarjapur Road"
      heroBlurb="Poorvam Care in Electronic City is approximately 20 km from Marathahalli — around 35–45 minutes via the Outer Ring Road. We also offer convenient online teletherapy for families who prefer not to commute. Our RCI-licensed speech-language pathologists provide expert, personalised therapy for children with speech delays, autism, language disorders, and more."
      distanceText="Approximately 20 km via Outer Ring Road south or via Sarjapur Road"
      travelTimeText="Around 35–45 minutes by car depending on traffic on ORR"
      teletherapyText="Online sessions for Marathahalli, Bellandur, and Sarjapur Road families"
      proseHeading="Trusted by Families from Marathahalli, Bellandur & the ORR Corridor"
      prose={[
        "The Marathahalli–Bellandur–Sarjapur Road corridor is one of Bangalore's fastest-growing residential zones, home to thousands of families working in the surrounding tech parks and IT campuses. Many of these families have discovered Poorvam Care as a trusted destination for speech therapy, early intervention, and developmental support for their children.",
        "Families from Marathahalli Bridge and the Bellandur Lake area typically drive to our Electronic City centre via the Outer Ring Road. From Marathahalli, head south on ORR past the Bellandur flyover and continue towards Sarjapur Road Junction. From there, Hosur Road leads directly into Electronic City — our Hulimangla Road centre in EC Phase 1 is well-signposted. An alternative for families from the HAL area is to take Sarjapur Road south directly into Electronic City.",
        "Poorvam Care's teletherapy programme has become especially popular with families along the Sarjapur Road and Outer Ring Road corridor, where peak-hour traffic can make a 20 km journey take considerably longer than expected. Our online sessions are conducted live via secure video call and are just as effective as in-person therapy for many speech and language goals. Parent coaching and detailed home activity guides are provided after every session, so your child's progress continues between appointments.",
        "Our speech therapists work with children across a wide range of conditions, including early language delays, articulation and phonological disorders, autism-related communication challenges, fluency difficulties such as stuttering, and social communication disorders. We also provide assessment and therapy for children with cerebral palsy, Down syndrome, ADHD, and sensory processing difficulties. The initial assessment gives us a detailed picture of your child's strengths and areas to work on, and from there we build an individualised care plan with clear, achievable goals.",
        `With RCI licensing, ISHA certification, ${STATS.years} years of clinical experience, and more than ${STATS.families} families helped across Bangalore, Poorvam Care has earned the trust of parents throughout South and East Bangalore. Whether you are in Marathahalli, Bellandur, Varthur, or along the Sarjapur Road corridor, we are here to support your child's communication journey — in person or online.`,
      ]}
      whyChooseUs={[
        "RCI-licensed, ISHA-certified therapists",
        `${STATS.yearsLabel} years of clinical experience`,
        `${STATS.familiesLabel} families served across Bangalore`,
        "Teletherapy — avoid the ORR commute",
        "Multidisciplinary team under one roof",
        "Parent training and home programme support",
        "Flexible appointment times including evenings",
      ]}
      routeSteps={{
        heading: "Route from Marathahalli",
        steps: [
          "Start at Marathahalli Bridge",
          "Take Outer Ring Road south towards Bellandur",
          "Continue past Sarjapur Road Junction",
          "Join Hosur Road heading into Electronic City",
          "Exit at Hulimangla Road — EC Phase 1",
        ],
      }}
      faqTitle="Speech Therapy for Marathahalli — Common Questions"
      faqs={[
        {
          question: "Is there a speech therapist near Marathahalli?",
          answer:
            "Poorvam Care in Electronic City is one of the closest dedicated speech and language therapy centres for families in Marathahalli. Located approximately 20 km from Marathahalli Bridge, our centre is around 35–45 minutes by car via the Outer Ring Road or Sarjapur Road. We also offer teletherapy (online speech therapy) for Marathahalli families who prefer not to commute. Our RCI-licensed therapists have over 13 years of experience and have helped hundreds of families from the Bellandur, Sarjapur Road, and ORR corridor.",
        },
        {
          question: "How do I reach Poorvam Care from Marathahalli?",
          answer:
            "From Marathahalli Bridge, there are two good routes to Poorvam Care in Electronic City. The first is via the Outer Ring Road south — take ORR from Marathahalli towards Bellandur, continue past Sarjapur Road Junction, and join Hosur Road into Electronic City. The second route is via HAL Old Airport Road to Sarjapur Road, then south to Electronic City. The ORR route is typically faster during morning and evening peak hours. Total drive time is approximately 35–45 minutes depending on traffic.",
        },
        {
          question: "Does Poorvam Care offer online therapy for Marathahalli families?",
          answer:
            "Yes. Poorvam Care offers online teletherapy sessions that are a convenient option for families in Marathahalli and the Bellandur and Sarjapur Road corridor. Our therapists conduct live video sessions, provide detailed home activity plans, and offer parent coaching — all via our online platform. Many Marathahalli families use a blended approach, attending the centre for monthly assessments and progress reviews while completing weekly therapy sessions online. Contact us to learn more about our teletherapy programme.",
        },
        {
          question: "What is the cost of speech therapy at Poorvam Care?",
          answer:
            "Therapy fees at Poorvam Care vary depending on the type of therapy, session frequency, and your child's individual care plan. We believe every child deserves expert care, so we offer competitive rates and flexible scheduling options. We recommend starting with an initial consultation, during which our therapist will assess your child's needs and provide a clear explanation of recommended therapy and associated costs — with no obligation to book. Call us on +91 88617 64343 or use our contact form to arrange your consultation.",
        },
      ]}
      ctaBody="Families from Marathahalli, Bellandur, and Sarjapur Road trust Poorvam Care for expert speech therapy — in person and online. Book a consultation today."
    />
  );
}
