export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export const team: TeamMember[] = [
  {
    id: 'maria-chen',
    name: 'Dr. Maria Chen',
    role: 'Founder & Director',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'Speech Therapist',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'david-garcia',
    name: 'David Garcia',
    role: 'Occupational Therapist',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'michelle-williams',
    name: 'Michelle Williams',
    role: 'Child Psychologist',
    imageUrl: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?auto=format&fit=crop&q=80&w=200&h=200'
  }
];
