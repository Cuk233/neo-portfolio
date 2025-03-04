"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-heading text-[#2A2A2A]">500</h1>
        <h2 className="text-2xl font-heading text-[#2A2A2A]">Server Error</h2>
        <p className="text-[#2A2A2A]/80 max-w-md mx-auto">
          Something went wrong on our end. Please try again later.
        </p>
        <Button
          variant="default"
          size="lg"
          className="bg-[#FF6B6B] text-[#2A2A2A] font-bold hover:opacity-90 mt-4"
          onClick={() => router.push("/")}
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
} 