import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import ClientLayout from "./ClientLayout";
import { getMetadata } from "./metadata";

export const metadata = getMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          <ClientLayout>
            <TopNavBar />
            {children}
            <Analytics />
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
