// components/icons.tsx
import { LucideProps, Home, User, Settings, Book, AlertTriangle } from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2L20 20H4L12 2Z" />
    </svg>
  ),
  home: Home,
  user: User,
  settings: Settings,
  doc: Book,
  alert: AlertTriangle,
};
