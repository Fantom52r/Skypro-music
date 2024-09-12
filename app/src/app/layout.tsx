import "./styles/globals.css"
import {Montserrat} from 'next/font/google'
const monts = Montserrat({subsets:['cyrillic']})
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        <title>Skypro-music</title>
      </head>
      <body className={monts.className}>{children}</body>
    </html>
  );
}
