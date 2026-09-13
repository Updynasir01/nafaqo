import {
  Award, BadgeCheck, BookOpen, Briefcase, ChefHat, ClipboardCheck, Eye, GraduationCap,
  Handshake, HeartHandshake, Landmark, Microscope, Salad, ScanLine, School, Sprout,
  Target, Tractor, Truck, Users, UsersRound,
} from "lucide-react";

const icons = {
  Award, BadgeCheck, BookOpen, Briefcase, ChefHat, ClipboardCheck, Eye, GraduationCap,
  Handshake, HeartHandshake, Landmark, Microscope, Salad, ScanLine, School, Sprout,
  Target, Tractor, Truck, Users, UsersRound,
} as const;

export type IconName = keyof typeof icons;

export default function Icon({ name, size = 22, className = "" }: { name: IconName; size?: number; className?: string }) {
  const Glyph = icons[name];
  return <Glyph size={size} strokeWidth={2.4} className={className} aria-hidden="true" />;
}
