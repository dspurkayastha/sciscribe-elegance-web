import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQSchema from "@/components/seo/FAQSchema";

/**
 * ServicesFAQ component with structured data for better SEO
 * This component renders FAQs about scientific editing services
 * and adds schema.org FAQ markup for rich results in search
 */
const ServicesFAQ: React.FC = () => {
  // FAQ data for services page
  const faqs = [
    {
      question: "What types of documents does SciScribe edit?",
      answer: "SciScribe edits a wide range of scientific documents including research papers, journal articles, theses, dissertations, grant proposals, conference abstracts, book chapters, and technical reports across all scientific disciplines."
    },
    {
      question: "How long does the editing process take?",
      answer: "Our standard turnaround time is 5-7 business days for manuscripts up to 6,000 words. We also offer expedited services with 48-72 hour turnaround for urgent projects at an additional fee. The exact timeline depends on document length, complexity, and selected service level."
    },
    {
      question: "Who will be editing my document?",
      answer: "Your document will be edited by a subject matter expert with a PhD or equivalent advanced degree in your field. All our editors are native English speakers with extensive experience in academic publishing and have edited papers published in high-impact journals."
    },
    {
      question: "What's included in your scientific editing service?",
      answer: "Our scientific editing service includes comprehensive language editing (grammar, spelling, punctuation), improvements in clarity and flow, structural suggestions, citation formatting, discipline-specific terminology refinement, and a detailed feedback report with recommendations for strengthening your manuscript."
    },
    {
      question: "Do you offer journal-specific formatting?",
      answer: "Yes, we provide formatting according to specific journal guidelines as part of our Journal Submission Support service. This includes reference formatting, document structure, figure and table preparation, and cover letter drafting tailored to your target journal's requirements."
    },
    {
      question: "How do I submit my document for editing?",
      answer: "You can submit your document through our secure online portal. After creating an account, you'll be able to upload your files, select your service level, provide specific instructions, and make payment. You'll receive confirmation once your document is assigned to an editor."
    }
  ];

  return (
    <>
      {/* Add structured data for FAQs */}
      <FAQSchema faqs={faqs} />

      <section className="py-12 bg-white dark:bg-sciscribe-navy/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Get answers to common questions about our scientific editing and publication support services
            </p>
          </div>
          <div className="mx-auto max-w-3xl mt-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesFAQ;
