export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919538033894";

export const SITE_NAME = "Ohelpbro";
export const COMPANY_NAME = "Ophiliya & Co";
export const GST_NUMBER = "29BIWPKO458D1ZX";

export const CONTACT_INFO = {
  address: "Bangalore, Karnataka, India",
  phone: "+91 95380 33894",
  email: "contact@ohelpbro.in",
};

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/ohelpbro",
  instagram: "https://instagram.com/ohelpbro",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  linkedin: "https://linkedin.com/company/ohelpbro",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Cleaning Services", href: "/services" },
      { label: "Manpower Staffing", href: "/staffing" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export const CLEANING_SERVICES = [
  { id: "post-construction", label: "Post Construction Cleaning" },
  { id: "post-interior", label: "Post Interior Cleaning" },
  { id: "vacant-flat", label: "Vacant Flat & Home Cleaning" },
  { id: "carpet", label: "Carpet Shampooing" },
  { id: "sofa", label: "Sofa & Chair Cleaning" },
  { id: "office-deep", label: "Office & Apartment Deep Cleaning" },
  { id: "marble", label: "Marble Scrubbing & Polishing" },
];

export const STAFFING_SERVICES = [
  { id: "housekeeping", label: "Housekeeping" },
  { id: "security", label: "Security Guards" },
  { id: "office-boys", label: "Office Boys / Helpers" },
  { id: "cook", label: "Cook / Kitchen Helpers" },
  { id: "outsourcing", label: "Manpower Outsourcing" },
];

export const ALL_SERVICES = [...CLEANING_SERVICES, ...STAFFING_SERVICES];

export const EMPLOYEE_TYPES = [
  { id: "part-time", label: "Part-time" },
  { id: "full-time", label: "Full-time" },
  { id: "contract", label: "Contract" },
  { id: "one-time", label: "One-time" },
];

export const EXPERIENCE_OPTIONS = [
  { id: "0-1", label: "0–1 years" },
  { id: "1-3", label: "1–3 years" },
  { id: "3-5", label: "3–5 years" },
  { id: "5+", label: "5+ years" },
];

export const HOME_CLEANING_SERVICES = [
  {
    id: "post-construction",
    title: "Post Construction Cleaning",
    description:
      "Remove dust, debris, cement stains after construction",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    href: "/services#post-construction",
  },
  {
    id: "post-interior",
    title: "Post Interior Cleaning",
    description:
      "Deep clean after interior work — paint, dust, floors",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    href: "/services#post-interior",
  },
  {
    id: "vacant-flat",
    title: "Vacant Flat & Home Cleaning",
    description: "Move-in/move-out spotless cleaning",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
    href: "/services#vacant-flat",
  },
];

export const HOME_STAFFING_SERVICES = [
  {
    id: "housekeeping",
    title: "Housekeeping",
    description: "Professional housekeeping staff for homes and offices",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    href: "/staffing#housekeeping",
  },
  {
    id: "security",
    title: "Security Guards",
    description: "Trained security personnel for your premises",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    href: "/staffing#security",
  },
  {
    id: "office-boys",
    title: "Office Boys / Helpers",
    description: "Reliable office support and helper staff",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    href: "/staffing#office-boys",
  },
  {
    id: "cook",
    title: "Cook / Kitchen Helpers",
    description: "Skilled kitchen staff for residential and commercial",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    href: "/staffing#cook",
  },
  {
    id: "outsourcing",
    title: "Manpower Outsourcing",
    description: "Complete manpower solutions tailored to your needs",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    href: "/staffing#outsourcing",
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: "verified",
    title: "Verified Professionals",
    description:
      "Every professional is background-checked and trained for quality service.",
  },
  {
    icon: "trusted",
    title: "Trusted & Transparent",
    description:
      "Clear pricing, honest communication, and reliable service every time.",
  },
  {
    icon: "ontime",
    title: "On-Time Service",
    description:
      "We respect your schedule and deliver punctual, dependable service.",
  },
];

export const DETAILED_CLEANING_SERVICES = [
  {
    id: "carpet",
    title: "Carpet Shampooing",
    description:
      "We provide deep, professional carpet cleaning services that eliminate dirt, bacteria and stubborn stains, leaving your carpets look clean and fresh.",
    bullets: [
      "Upholstery cleaning",
      "Deep carpet cleaning",
      "Pet hair & allergy solutions",
    ],
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
  },
  {
    id: "sofa",
    title: "Sofa and Chair Cleaning",
    description:
      "Refresh your sofa and carpet with our professional deep cleaning services for a fresh, hygienic and stain-free space.",
    bullets: ["Dust and stain removal", "Odour and germ removal"],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    id: "office-deep",
    title: "Office and Apartment Deep Cleaning",
    description:
      "Professional office and flat deep cleaning with great attention to detail.",
    bullets: [
      "Complete office or flat dusting",
      "Switchboard and door cleaning",
      "Tile and floor scrubbing",
      "Living room, bedroom and dining area cleaning",
      "Vacuum and surface cleaning",
    ],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    id: "marble",
    title: "Marble Scrubbing and Polishing",
    description:
      "Restore the shine and elegance of your marble floor with our professional marble polishing services.",
    bullets: [
      "Stain and scratch removal",
      "Deep floor cleaning",
      "High gloss finish",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    id: "post-construction",
    title: "Post Construction Cleaning",
    description:
      "Remove dust, debris, paint marks, cement stains and dirt. Leaving your space fresh, spotless and move-in ready.",
    bullets: [
      "Complete property cleaning",
      "Removal of cement dust",
      "Construction waste and fine particle removal from corners",
    ],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  {
    id: "post-interior",
    title: "Post Interior Cleaning",
    description:
      "Complete post interior deep cleaning for a fresh, dust-free, move-in ready space.",
    bullets: [
      "Dust and paint stain removal",
      "Floor deep cleaning",
      "Glass and surface cleaning",
      "Kitchen and bathroom cleaning",
    ],
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  },
  {
    id: "vacant-flat",
    title: "Vacant Flat and Home Cleaning",
    description:
      "Experience a fresh, spotless and hygienic space with our professional vacant cleaning services.",
    bullets: [
      "Floor deep cleaning",
      "Dust and dirt removal",
      "Window and glass cleaning",
      "Move-in and move-out cleaning",
    ],
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
  },
];

export const DETAILED_STAFFING_SERVICES = [
  {
    id: "housekeeping",
    title: "Housekeeping",
    description:
      "Professional housekeeping staff trained to maintain your residential or commercial space to the highest standards of cleanliness and hygiene.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
  },
  {
    id: "security",
    title: "Security Guards",
    description:
      "Trained and reliable security personnel to protect your premises, assets, and people with vigilance and professionalism.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
  },
  {
    id: "office-boys",
    title: "Office Boys / Helpers",
    description:
      "Dependable office support staff to assist with daily operations, errands, and general office maintenance tasks.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    id: "cook",
    title: "Cook / Kitchen Helpers",
    description:
      "Skilled cooks and kitchen helpers for residential and commercial kitchens, ensuring quality food preparation and kitchen hygiene.",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
  },
  {
    id: "outsourcing",
    title: "Manpower Outsourcing",
    description:
      "Complete manpower outsourcing solutions tailored to your business needs, from staffing to management and compliance.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
  },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
  customers: [{ label: "Register as a Customer", href: "/register-customer" }],
  professionals: [
    { label: "Register as a Professional", href: "/register-professional" },
  ],
};
