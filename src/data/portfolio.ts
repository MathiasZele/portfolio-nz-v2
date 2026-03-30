export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  logo?: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  thumbnail: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  description?: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  about: string;
  profileImage: string;
  social: SocialLink[];
  skills: {
    frontend: string[];
    backend: string[];
    mobile: string[];
    tools: string[];
  };
  experience: Experience[];
  education: Education[];
  projects: Project[];
}

export const portfolioData: PortfolioData = {
  name: "Mathias Zele",
  role: "Webmaster et Développeur Junior",
  about:
    "Développeur junior spécialisé dans la conception de sites internet fonctionnels et esthétiques. Titulaire d'une Licence Professionnelle en Génie Logiciel, je m'engage à proposer des solutions numériques innovantes et de qualité.",
  profileImage: "/images/profile.webp",
  social: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/mathias-zele-6ba015218/",
      icon: "Linkedin",
    },
    {
      platform: "WhatsApp",
      url: "https://wa.me/237698497839",
      icon: "BrandWhatsapp",
    },
    {
      platform: "Email",
      url: "mailto:mathiaszele3@gmail.com",
      icon: "Mail",
    },
  ],
  skills: {
    frontend: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Bootstrap",
    ],
    backend: [
      "PHP",
      "Laravel",
      "MySQL",
      "Java",
    ],
    mobile: [
      "React Native",
      "JavaScript",
    ],
    tools: [
      "WordPress",
      "Shopify",
      "Odoo",
      "Plesk",
      "Adobe Illustrator",
      "Photoshop",
      "Canva",
    ],
  },
  experience: [
    {
      company: "Media Press Africa",
      role: "Webmaster et Développeur Junior",
      period: "2024 - Présent",
      description: [
        "Développement et maintenance de sites et applications web",
        "Conception et intégration de systèmes ERP",
        "Création de solutions numériques innovantes",
      ],
    },
    {
      company: "Media Press Africa",
      role: "Développeur (Stage)",
      period: "Juin 2024 - Septembre 2024",
      description: [
        "Développement mobile avec React Native",
        "Développement web avec React",
        "Intégration de composants et API",
      ],
    },
    {
      company: "Afrique Media TV",
      role: "Développeur (Stage)",
      period: "Juin 2023 - Août 2023",
      description: [
        "Participation à des projets de développement web",
        "Apprentissage des technologies modernes",
      ],
    },
  ],
  education: [
    {
      school: "IUGET-Douala",
      degree: "Licence Professionnelle en Génie Logiciel",
      period: "2024",
      description: "Diplôme obtenu avec spécialisation en développement web et applications.",
    },
    {
      school: "ISSTN-Dschang",
      degree: "BTS en Génie Logiciel",
      period: "2022-2024",
      description: "Formation en génie logiciel, bases du développement et architecture logicielle.",
    },
    {
      school: "Lycée Classique de Dschang",
      degree: "Baccalauréat en Technologies de l'Information",
      period: "2014-2022",
      description: "Formation générale avec spécialisation en technologies de l'information.",
    },
  ],
  projects: [
    {
      title: "ACIP RCA",
      description:
        "Site web professionnel pour l'Association Centrafricaine des Importateurs et Producteurs.",
      techStack: ["Web Design", "Développement Web"],
      link: "https://acip-rca.org/",
      thumbnail: "/images/projects/Acip-org.webp",
    },
    {
      title: "iBusiness Africa",
      description:
        "Plateforme e-commerce et services pour l'Afrique de l'Ouest.",
      techStack: ["E-commerce", "Développement Web"],
      link: "https://ibusiness.africa/",
      thumbnail: "/images/projects/ibusiness.africa.webp",
    },
    {
      title: "Services Auto JC",
      description:
        "Site de présentation pour une entreprise de services automobiles.",
      techStack: ["Web Design", "Développement Web"],
      link: "https://servicesautojc.ca/",
      thumbnail: "/images/projects/servicesautojc.ca.webp",
    },
    {
      title: "Bouar",
      description:
        "Site informatif et de présentation pour la ville de Bouar.",
      techStack: ["Web Design", "Développement Web"],
      link: "https://bouar.org/",
      thumbnail: "/images/projects/bouar.org.webp",
    },
    {
      title: "Kymstore",
      description:
        "Plateforme e-commerce pour la vente de produits en ligne.",
      techStack: ["E-commerce", "Développement Web", "Paiement"],
      link: "https://kymstore.com/",
      thumbnail: "/images/projects/Kymstore.com.webp",
    },
    {
      title: "Tech Store",
      description:
        "Boutique en ligne spécialisée dans la vente de produits technologiques.",
      techStack: ["E-commerce", "Développement Web"],
      link: "https://www.tech-store.cm/",
      thumbnail: "/images/projects/tech-store.webp",
    },
  ],
};
