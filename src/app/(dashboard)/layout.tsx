import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
    >
        <DashboardLayout>
            {children}
        </DashboardLayout>
    </ThemeProvider>
  );
}
