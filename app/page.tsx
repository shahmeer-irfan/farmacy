// app/page.js

import NasaData from "./components/NasaData.js"; // Ensure the correct file extension

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <NasaData />
    </main>
  );
}