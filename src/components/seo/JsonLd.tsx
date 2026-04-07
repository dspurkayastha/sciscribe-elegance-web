export default function JsonLd() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "SciScribe Solutions",
        url: "https://www.sciscribesolutions.com",
        logo: "https://www.sciscribesolutions.com/logo.png",
        description:
            "Premium medical writing, scientific editing, and publication support services for researchers, academics, and healthcare professionals worldwide.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Hazra Road",
            addressLocality: "Kolkata",
            addressCountry: "IN",
        },
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: "+91-9395582679",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
            },
        ],
        email: "contact@sciscribesolutions.com",
        sameAs: [
            "https://wa.me/919395582679",
            "https://www.facebook.com/profile.php?id=61576386514296",
            "https://www.instagram.com/sciscribesolutions_ig/",
            "https://www.linkedin.com/company/sciscribe-solutions",
        ],
        serviceType: [
            "Medical Writing",
            "Scientific Editing",
            "Academic Proofreading",
            "Publication Support",
            "Grant Writing Assistance",
            "Statistical Analysis",
            "Plagiarism Reduction",
            "Journal Formatting",
        ],
        areaServed: {
            "@type": "GeoShape",
            name: "Worldwide",
        },
        priceRange: "$$",
        knowsAbout: [
            "Scientific manuscript editing",
            "Peer review preparation",
            "Academic publishing",
            "Research methodology",
            "Data visualization",
            "Medical communication",
        ],
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "SciScribe Solutions",
        url: "https://www.sciscribesolutions.com",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate:
                    "https://www.sciscribesolutions.com/blog?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
        </>
    );
}
