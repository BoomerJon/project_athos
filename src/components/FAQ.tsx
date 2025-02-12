import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Is this product safe for sensitive skin?",
      answer:
        "Yes! Our facial oil is formulated with gentle, natural ingredients that are suitable for all skin types, including sensitive skin. We've conducted extensive testing to ensure its safety.",
    },
    {
      question: "How often should I use the facial oil?",
      answer:
        "For best results, we recommend using the facial oil twice daily - morning and evening. Apply 2-3 drops to clean, slightly damp skin.",
    },
    {
      question: "What are the main ingredients?",
      answer:
        "Our facial oil contains a blend of organic ingredients including jojoba oil, rosehip oil, and vitamin E. All ingredients are sustainably sourced and 100% natural.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-accent text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-accent hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;