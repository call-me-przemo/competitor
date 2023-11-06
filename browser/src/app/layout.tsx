import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import type { Metadata } from "next";
import { Navbar } from "@/components/root";

const pages = ["account"];

export const metadata: Metadata = {
  title: "Competitor App",
  description: "Competitor - sports event managment system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CssBaseline />
          <Navbar pages={pages} />
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
