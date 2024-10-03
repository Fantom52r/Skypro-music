import ReduxProvider from "../store/ReduxProvider";
import "./styles/globals.css";
import { Montserrat } from "next/font/google";
// import store from "../store/store";
const monts = Montserrat({ subsets: ["cyrillic"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <head>
          <title>Skypro-music</title>
        </head>
        <body className={monts.className}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
