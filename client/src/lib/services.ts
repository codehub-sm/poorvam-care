export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    id: 'speech',
    title: 'Speech & Language Therapy',
    description: 'Specialized programs to help children develop communication skills, address speech delays, and overcome language barriers.',
    imageUrl: 'https://images.unsplash.com/photo-1567913300214-364a4cfb291c?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Speech therapy session'
  },
  {
    id: 'occupational',
    title: 'Occupational Therapy',
    description: 'Helping children develop fine motor skills, sensory processing, and activities for daily living through playful engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Occupational therapy session'
  },
  {
    id: 'physical',
    title: 'Physical Therapy',
    description: 'Programs to improve gross motor skills, coordination, balance, and physical strength through age-appropriate activities.',
    imageUrl: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Physical therapy session'
  },
  {
    id: 'social',
    title: 'Social Skills Groups',
    description: 'Interactive group sessions that help children develop peer relationships, communication, and emotional regulation.',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Social skills group'
  },
  {
    id: 'early',
    title: 'Early Intervention',
    description: 'Comprehensive programs for infants and toddlers to address developmental delays and provide support during critical periods.',
    imageUrl: 'https://images.unsplash.com/photo-1560855709-e22d6c740847?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Early intervention program'
  },
  {
    id: 'parent',
    title: 'Parent Coaching',
    description: 'Guidance and training for parents to support their child\'s development at home and integrate therapy techniques into daily routines.',
    imageUrl: 'https://images.unsplash.com/photo-1587697681787-b8b7d483e2d3?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Parent coaching session'
  }
];
