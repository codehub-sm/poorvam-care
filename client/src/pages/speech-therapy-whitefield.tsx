import NeighbourhoodPage from "@/components/neighbourhood-page";
import { STATS } from "@/config/site";

/**
 * Whitefield neighbourhood landing page — content only.
 *
 * Whitefield is 30 km out, so this page leads with teletherapy rather than
 * treating it as a fallback: it uses the optional banner and the
 * "How Teletherapy Works" sidebar block.
 */
export default function SpeechTherapyWhitefieldPage() {
  return (
    <NeighbourhoodPage
      slug="speech-therapy-whitefield-bangalore"
      neighbourhood="Whitefield"
      seoTitle="Speech Therapy in Whitefield Bangalore | Poorvam Care Electronic City"
      seoDescription="Expert speech therapy for children from Whitefield, Bangalore. Poorvam Care in Electronic City is 30km away. Teletherapy also available. Book a consultation."
      schemaDescription="Speech therapy and early intervention services for families from Whitefield, Bangalore — in-person and online teletherapy available"
      areaServed={["Whitefield", "ITPL", "Varthur", "Mahadevapura"]}
      heroKicker="Serving Families from Whitefield — In-Person & Online"
      heroBlurb="Poorvam Care is Bangalore's trusted early intervention and speech therapy centre. For families in Whitefield, we offer a convenient online teletherapy programme — expert, personalised therapy without the long commute. In-person sessions at our Electronic City centre are also available for assessments and intensive therapy blocks."
      teletherapyBanner={{
        title: "Teletherapy — The Ideal Option for Whitefield Families",
        body: "Skip the 50-minute commute. Get the same expert speech therapy from Poorvam Care delivered live via video — flexible, effective, and from the comfort of your home.",
      }}
      distanceText="Approximately 30 km via Outer Ring Road → Marathahalli → Electronic City"
      travelTimeText="Around 50–60 minutes by car depending on traffic on ORR"
      teletherapyText="Live online sessions — expert therapy without the commute from Whitefield"
      proseHeading="Expert Speech Therapy for Whitefield Children — Online and In-Person"
      prose={[
        "Whitefield has grown into one of Bangalore's most important residential and technology hubs. Families in ITPL, Varthur, Whitefield Main Road, and Mahadevapura are well-connected to Bangalore's IT ecosystem but often face challenging commutes when seeking specialist healthcare. Poorvam Care has designed a solution specifically for this: a comprehensive teletherapy programme that brings expert speech and language therapy directly to your home.",
        "For most Whitefield families, online teletherapy is the most practical and efficient way to access Poorvam Care's services. Our therapists conduct live video sessions using secure, child-friendly platforms. Sessions are engaging and interactive — your child will not know the difference from a face-to-face visit, and research increasingly confirms that teletherapy delivers outcomes comparable to in-person therapy for many speech and language goals.",
        "Many parents working in the IT parks around ITPL, Varthur Road, and Whitefield Main Road have told us that the flexibility of teletherapy transformed their family's ability to maintain consistent therapy. Weekly online sessions can be scheduled around school timetables, work meetings, and other commitments — making it far more sustainable than a 50–60 minute commute each way on the Outer Ring Road.",
        "For families who do prefer in-person visits — for an initial assessment, a detailed progress review, or an intensive therapy block — we welcome you at our Electronic City centre. The recommended route from Whitefield is via the Outer Ring Road south to Marathahalli Bridge, continuing on ORR past Sarjapur Road Junction, then joining Hosur Road into Electronic City. Our centre is on Hulimangla Road in EC Phase 1.",
        "Poorvam Care holds RCI registration and ISHA certification, and our therapists bring over 13 years of clinical experience working with children across Bangalore. Whether your child is a late talker, has been diagnosed with autism, or is navigating a more complex communication challenge, our team will create an individualised plan that meets your child exactly where they are — and from wherever you are in Whitefield.",
      ]}
      whyChooseUs={[
        "Online teletherapy — no commute needed",
        "RCI-licensed, ISHA-certified therapists",
        `${STATS.yearsLabel} years of clinical experience`,
        `${STATS.familiesLabel} families served across Bangalore`,
        "Flexible scheduling around work and school",
        "In-person assessments available at EC centre",
        "Parent coaching and home activity plans",
      ]}
      teletherapySteps={{
        heading: "How Teletherapy Works",
        steps: [
          "Book an online consultation with our team",
          "Your child is assessed via video call",
          "We design a personalised therapy plan",
          "Weekly live sessions with your therapist",
          "Home activity guides after every session",
          "Monthly progress reviews and goal updates",
        ],
      }}
      faqTitle="Speech Therapy for Whitefield — Common Questions"
      faqs={[
        {
          question: "Is there a speech therapist near Whitefield?",
          answer:
            "While there are some general clinics in Whitefield, Poorvam Care in Electronic City is a dedicated early intervention and speech therapy centre with RCI-licensed, ISHA-certified therapists and over 13 years of experience. For Whitefield families, we strongly recommend our teletherapy (online speech therapy) service, which delivers the same high-quality, personalised therapy your child would receive in our centre — without the long commute. In-person visits are also welcome for assessments and intensive blocks.",
        },
        {
          question: "Is online speech therapy available for Whitefield families?",
          answer:
            "Absolutely. Poorvam Care's teletherapy programme is specifically designed for families in areas like Whitefield who would otherwise face a long commute to Electronic City. Our therapists conduct live, interactive video sessions tailored to your child's therapy goals. We provide detailed home activity guides, regular progress updates, and parent coaching — all online. Teletherapy at Poorvam Care is particularly popular among Whitefield's IT community, where parents value flexibility and high standards of professional care.",
        },
        {
          question: "How far is Poorvam Care from Whitefield?",
          answer:
            "Poorvam Care is approximately 30 km from Whitefield. The most practical route is via the Outer Ring Road (ORR) south to Marathahalli, then continuing on ORR towards Sarjapur Road and Electronic City. In normal traffic, this journey takes around 50–60 minutes. Given the distance, we recommend our teletherapy service for regular weekly sessions, with in-person visits reserved for initial assessments, detailed progress reviews, or intensive therapy blocks.",
        },
        {
          question: "What conditions does Poorvam Care treat?",
          answer:
            "Poorvam Care provides therapy for speech sound disorders, expressive and receptive language delays, autism spectrum disorder (ASD), ADHD, cerebral palsy, Down syndrome, sensory processing difficulties, stuttering, voice disorders, and childhood feeding or swallowing challenges. Our multidisciplinary team includes speech-language pathologists, occupational therapists, ABA therapists, and special educators. All services are available both in-person at our Electronic City centre and via our online teletherapy platform.",
        },
      ]}
      ctaHeading="Expert Speech Therapy — From Whitefield, Without the Drive"
      ctaBody="Book a consultation today and discover how Poorvam Care's teletherapy programme can help your child achieve real communication progress — wherever you are in Whitefield."
    />
  );
}
