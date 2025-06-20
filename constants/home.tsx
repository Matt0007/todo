import {
  CheckCircle,
  Clock,
  Users,
  Target,
  Calendar,
  BarChart3,
} from "lucide-react";

export const features = [
  {
    icon: Calendar,
    title: "Planification hebdomadaire",
    description:
      "Visualisez et organisez vos tâches par semaine avec une interface claire et intuitive",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: CheckCircle,
    title: "Suivi des progrès",
    description:
      "Suivez vos accomplissements et visualisez votre progression avec des statistiques détaillées",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: Users,
    title: "Collaboration d'équipe",
    description:
      "Travaillez ensemble avec votre équipe, partagez des tâches et coordonnez vos efforts",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Target,
    title: "Objectifs SMART",
    description:
      "Définissez des objectifs spécifiques, mesurables et atteignables pour maximiser votre productivité",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    icon: Clock,
    title: "Gestion du temps",
    description:
      "Optimisez votre temps avec des rappels intelligents et des estimations de durée",
    gradient: "from-red-500 to-red-600",
  },
  {
    icon: BarChart3,
    title: "Analytics avancés",
    description:
      "Analysez vos habitudes de travail et identifiez les opportunités d'amélioration",
    gradient: "from-indigo-500 to-indigo-600",
  },
];
