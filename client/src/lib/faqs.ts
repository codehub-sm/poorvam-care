export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'needs-services',
    question: 'How do I know if my child needs developmental services?',
    answer: 'If you notice your child is not meeting typical developmental milestones, has difficulty with communication, social skills, or physical abilities, they might benefit from our services. We offer free developmental screenings to help determine if intervention would be helpful. Remember, early intervention often leads to the best outcomes.'
  },
  {
    id: 'initial-assessment',
    question: 'What happens during the initial assessment?',
    answer: 'The initial assessment typically lasts 60-90 minutes. Our specialist will observe your child during play and structured activities, review your concerns and your child\'s developmental history, and may use standardized assessment tools. We\'ll discuss our findings and recommendations with you and develop a personalized intervention plan if services are needed.'
  },
  {
    id: 'service-duration',
    question: 'How long will my child need services?',
    answer: 'The duration of services varies based on each child\'s needs, the nature of the developmental concern, and their progress. Some children may benefit from a few months of targeted intervention, while others may need ongoing support for a longer period. We regularly assess progress and adjust our recommendations accordingly, with the goal of helping your child develop the skills they need to thrive.'
  },
  {
    id: 'insurance',
    question: 'Does insurance cover your services?',
    answer: 'Many insurance plans cover our developmental services, particularly speech, occupational, and physical therapy. We accept most major insurance providers and can verify your benefits before beginning services. Our administrative team is available to help you understand your coverage and any out-of-pocket costs. We also offer payment plans and scholarships for families who qualify.'
  },
  {
    id: 'parent-role',
    question: 'What role do parents play in therapy?',
    answer: 'Parents are essential partners in their child\'s developmental journey. We encourage parent involvement in therapy sessions when appropriate and provide training so you can reinforce skills at home. Regular communication between our team and families ensures consistent approaches across environments. We\'ll provide you with strategies, activities, and resources to support your child\'s progress between sessions.'
  }
];
