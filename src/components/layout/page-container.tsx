
import { ReactNode } from "react";
import { Header } from "./header";
import { Navbar } from "./navbar";

interface PageContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function PageContainer({ children, title, subtitle }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header title={title} subtitle={subtitle} />
      <main className="px-4 pb-4">{children}</main>
      <Navbar />
    </div>
  );
}
