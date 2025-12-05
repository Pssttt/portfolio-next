import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-10">
        <Header />
        <div className="border-2 border-primary shadow-lg">
          <Navigation />
          <div className="p-6 sm:p-10 bg-card/50">
            <main id="main-content">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
