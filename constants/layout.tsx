import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export const footerLinks = {
  organizations: [
    { name: "Weekboard", href: "/weekboard" },
    { name: "Todo", href: "/todo" },
    { name: "Profil", href: "/profile" },
  ],
  support: [
    { name: "Documentation", href: "#docs" },
    { name: "Centre d'aide", href: "#help" },
    { name: "Contact", href: "#contact" },
  ],
  company: [
    { name: "À propos", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Carrières", href: "#careers" },
  ],
};

export const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "GitHub", href: "#", icon: Github },
  { name: "Email", href: "#", icon: Mail },
];

export const legalLinks = [
  { name: "Confidentialité", href: "#privacy" },
  { name: "Conditions", href: "#terms" },
  { name: "Cookies", href: "#cookies" },
];
