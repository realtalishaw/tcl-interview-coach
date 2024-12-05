import ClientPractice from "./client";

export function generateStaticParams() {
  return [
    { type: "personal-intro" },
    { type: "platform-speech" },
    { type: "spokesmodel" },
  ];
}

export default function PracticePage() {
  return <ClientPractice />;
}