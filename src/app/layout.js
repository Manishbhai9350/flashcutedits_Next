import './index.css'
import Nav from "./_components/Nav";

export const metadata = {
  title: "Flashcut Edits",
  description: "FlashCut Edits",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
