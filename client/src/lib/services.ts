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
    imageUrl: 'https://images.unsplash.com/photo-1599552683573-9dc48255a20d?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Child in speech therapy session with therapist'
  },
  {
    id: 'occupational',
    title: 'Occupational Therapy',
    description: 'Helping children develop fine motor skills, sensory processing, and activities for daily living through playful engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1599552683589-0c943e6498fc?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Child practicing fine motor skills in occupational therapy'
  },
  {
    id: 'physical',
    title: 'Physical Therapy',
    description: 'Programs to improve gross motor skills, coordination, balance, and physical strength through age-appropriate activities.',
    imageUrl: 'https://images.unsplash.com/photo-1599552683589-0c943e6498fc?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Child working on balance and coordination in physical therapy'
  },
  {
    id: 'social',
    title: 'Social Skills Groups',
    description: 'Interactive group sessions that help children develop peer relationships, communication, and emotional regulation.',
    imageUrl: 'https://images.unsplash.com/photo-1602046819770-9571767bc3d3?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Children engaging in group social skills activities'
  },
  {
    id: 'early',
    title: 'Early Intervention',
    description: 'Comprehensive programs for infants and toddlers to address developmental delays and provide support during critical periods.',
    imageUrl: 'https://images.unsplash.com/photo-1599552683573-9dc48255a20d?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Early intervention session with infant and therapist'
  },
  {
    id: 'parent',
    title: 'Parent Coaching',
    description: 'Guidance and training for parents to support their child\'s development at home and integrate therapy techniques into daily routines.',
    imageUrl: 'https://images.unsplash.com/photo-1599552683589-0c943e6498fc?auto=format&fit=crop&q=80&w=500&h=300',
    imageAlt: 'Parent learning therapy techniques from specialist'
  }
];
