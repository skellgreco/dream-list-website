// These styles/components apply to every route in the application
import "./globalcss.css";
import Navbar from "./(elements)/navbar";
import Creditbar from "./(elements)/credits";

export const metadata = {
  title: "Dream List",
  description: "A Dream List Website to track what needs to be achieved!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Dream List | By Skell</title>
      </head>
      <body>
        <Navbar />

        {children}

        <Creditbar />
      </body>
    </html>
  );
}
