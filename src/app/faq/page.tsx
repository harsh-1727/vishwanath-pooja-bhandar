import type { Metadata } from "next";
import { businessConfig } from "@/config";
import { buildWhatsAppLink } from "@/lib/utils/contact-links";
import { Button } from "@/components/ui";
import { Accordion, type AccordionItemData } from "@/components/ui";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Common questions about ordering puja kits at ${businessConfig.name}, West Patel Nagar, New Delhi.`,
};

const FAQ_ITEMS: AccordionItemData[] = [
  {
    id: "q1",
    question: "What types of puja kits do you offer?",
    answer:
      "We offer a wide range of puja kits including festival kits (Navratri, Diwali, Holi, etc.), vrat and katha kits, devta vishesh kits for specific deities like Hanuman and Satyanarayan, griha pravesh and vastu kits, samskara kits, and graha shanti / dosh nivaran kits. Each kit is complete and ready to use.",
  },
  {
    id: "q2",
    question: "Can I order on WhatsApp?",
    answer:
      "Yes! WhatsApp is our preferred way to take orders. Just message us with the kit name or occasion and we will guide you to the right samagri. Our WhatsApp number is the same as our phone number.",
  },
  {
    id: "q3",
    question: "Do you offer home delivery?",
    answer:
      "Please ask us on WhatsApp about delivery availability in your area. Walk-in is always welcome at our West Patel Nagar location.",
  },
  {
    id: "q4",
    question: "What are your shop hours?",
    answer:
      "We are open daily from 9:00 AM to 10:30 PM. You can walk in during these hours or message us on WhatsApp at any time.",
  },
  {
    id: "q5",
    question: "Do you have samagri for specific deities or occasions not listed?",
    answer:
      "Very likely, yes. Our catalog is extensive and we stock samagri for a wide range of deities and occasions. If you don't see what you need, message us on WhatsApp and we will check availability for you.",
  },
  {
    id: "q6",
    question: "Are the kit prices fixed or negotiable?",
    answer:
      "Most of our kits have fixed prices. For bulk orders or special occasions, please message us to discuss. We always aim to provide fair, honest pricing.",
  },
  {
    id: "q7",
    question: "Can I buy individual samagri items instead of a full kit?",
    answer:
      "Yes, we stock individual puja items as well as complete kits. Message us on WhatsApp or visit the shop to ask for specific items.",
  },
  {
    id: "q8",
    question: "How do I get directions to your shop?",
    answer:
      "We are located at 679, Baba Farid Puri, West Patel Nagar, New Delhi. You can use the Get Directions link on our contact page to open Google Maps.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        Frequently Asked Questions
      </h1>
      <p className="mt-3 max-w-xl text-sm text-ink/60 sm:text-base">
        Common questions about our shop, products, and ordering. Can&apos;t find
        your answer? Ask us on WhatsApp.
      </p>

      <div className="mt-10 max-w-3xl">
        <Accordion items={FAQ_ITEMS} />
      </div>

      <div className="mt-14 max-w-3xl rounded-card border border-gold/30 bg-cream p-8 text-center">
        <h2 className="font-display text-2xl text-ink">
          Still have a question?
        </h2>
        <p className="mt-3 text-sm text-ink/60 sm:text-base">
          Message us on WhatsApp and we&apos;ll get back to you quickly.
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            href={buildWhatsAppLink(
              `Hi ${businessConfig.name}, I have a question about your puja kits.`
            )}
            external
            target="_blank"
            variant="whatsapp"
            iconStart={<MessageCircle size={18} aria-hidden="true" />}
          >
            Ask on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
