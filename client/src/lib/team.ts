export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export const team: TeamMember[] = [
  {
    id: 'apporva-rai',
    name: 'Apporva Rai',
    role: 'Founder & Clinical Director',
    imageUrl: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'niranjana-kumar',
    name: 'Niranjana',
    role: 'Sr. Speech Therapist & Pathologist',
    imageUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'marriapan-kumar',
    name: 'Marriapan Kumar',
    role: 'Sr. Occupational Therapist',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'albin-jose',
    name: 'Albin Jose',
    role: 'Physical Therapist',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'pooja-kumar',
    name: 'Pooja',
    role: 'Special Educator',
    imageUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'sreeshma-kumar',
    name: 'Sreeshma',
    role: 'Sr. Behavioural Therapist',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200'
  }
];
