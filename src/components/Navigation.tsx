import { usePathname } from "next/navigation";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "../lib/utils";
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  UserGroupIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function Navigation() {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  const navigation: NavigationItem[] = [
    { name: "Home", href: "/", icon: HomeIcon },
    ...(user?.publicMetadata?.role === "SUPERADMIN" 
      ? [{ name: "Organizations", href: "/superadmin/organizations", icon: BuildingOfficeIcon }] 
      : []),
    ...(["ADMIN", "SUPERADMIN"].includes(user?.publicMetadata?.role as string) 
      ? [{ name: "Admin", href: "/admin", icon: Cog6ToothIcon }] 
      : []),
    { name: "Portal", href: "/portal", icon: UserGroupIcon },
  ];

  if (!isSignedIn) return null;

  return (
    <nav className="w-64 bg-white min-h-full py-6 px-4">
      <div className="space-y-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm rounded-lg transition-colors",
                isActive
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon className="mr-3 h-5 w-5 text-gray-400" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 