import { LucideTwitter, Twitter, X } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * AppContainer component provides a basic layout for the application, centered
 * and with a responsive background gradient.
 *
 * @component
 * @example
 * // Usage in a parent component:
 * <AppContainer>
 *   <h1>My App</h1>
 * </AppContainer>
 *
 * @param {object} props - React props for the AppContainer component.
 * @param {React.ReactNode} props.children - The content to be displayed within the container.
 * @returns {JSX.Element} - Returns the JSX element representing the AppContainer.
 */
export default function AppContainer({ children }: Props) {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        // Pretty gradients in the background.
        backgroundImage: `
      radial-gradient(circle farthest-side at -15% 85%,rgba(0, 200, 150, .7), rgba(0, 0, 0, 0) 52%),
      radial-gradient(circle farthest-side at 100% 30%,  rgba(190, 155, 250, 0.8),  rgba(0, 0, 0, 0) 30%)
        `,
      }}
    >
      <main className="w-full flex-grow flex items-center justify-center overflow-auto">
        {children}
      </main>
      <footer className="w-full h-16 flex items-center justify-center  background-transparent">
        <Link href={"https://twitter.com/defichaindomain"} target="_blank">
          <LucideTwitter />
        </Link>
      </footer>
    </div>
  );
}
