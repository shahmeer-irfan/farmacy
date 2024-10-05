// app/page.js

import NasaData from "./NasaData/page"; // Corrected import path

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <NasaData />
    </main>
  );
}