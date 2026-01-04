import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Yassine Radhouani",
  description: "Get in touch with Yassine Radhouani for artistic collaborations, architectural projects, or inquiries.",
  alternates: {
    canonical: "https://www.yassineradhouani.me/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-white/80">Phone: +216 25 976 063</p>
      <p className="mt-1 text-white/80">Email: rad_yass2000@yahoo.fr</p>
    </div>
  );
}
