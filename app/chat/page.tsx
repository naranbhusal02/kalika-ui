"use client";
import KalikaChatbot from "@/components/Chatbot";
// Remove Navbar import since it's now in layout.tsx
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen overflow-x-hidden flex-col">
      <div className="w-10/12 mx-auto px-4 py-12 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a2e] mb-8 text-center">
          Chat with Our AI Assistant
        </h2>
        <KalikaChatbot />
      </div>
      <Footer></Footer>
    </div>
  );
}
