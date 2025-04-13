
import { motion } from "framer-motion";

const AcademicPartnersSection = () => {
  const partners = [
    {
      image: "/lovable-uploads/27be6057-6d79-41e6-9665-870e1022715a.png",
      type: "Medical Professionals & Researchers",
      description: "We assist clinicians, researchers, and healthcare professionals with expert writing, editing, and publication support — tailored to meet journal and academic standards."
    },
    {
      image: "/lovable-uploads/27be6057-6d79-41e6-9665-870e1022715a.png",
      type: "Postgraduate & PhD Scholars",
      description: "Comprehensive editorial support tailored for thesis chapters, dissertations, and high-impact publications — every step of the way."
    },
    {
      image: "/lovable-uploads/27be6057-6d79-41e6-9665-870e1022715a.png",
      type: "Academic Professionals & Scientists",
      description: "Your ideas deserve to resonate — we help polish, structure, and elevate your work for global readership and academic excellence."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-sciscribe-mist/10 to-white/80 dark:from-sciscribe-navy/80 dark:via-sciscribe-navy/60 dark:to-sciscribe-navy/80 opacity-80"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIzIDAgMi4zMTMuNDU3IDMuMTgyIDEuMTgyTS0xIFkxIiAvPjwvZz48L3N2Zz4=')] opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold dark:text-white text-sciscribe-navy">Our Academic Partners & Clients</h2>
          <p className="text-lg dark:text-white/80 text-sciscribe-navy/80">
            We're proud to collaborate with leading researchers, institutions, and professionals
            across the academic spectrum, helping them achieve publication success.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 bg-white/50 dark:bg-sciscribe-navy/30 rounded-xl p-6 border border-sciscribe-mist/30 dark:border-white/5 shadow-md`}
              variants={itemVariants}
            >
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-48 h-48 overflow-hidden rounded-full bg-gradient-to-br from-sciscribe-blue/20 to-sciscribe-purple/20 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src={partner.image} alt={partner.type} className="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3 text-sciscribe-navy dark:text-white">{partner.type}</h3>
                <p className="text-sciscribe-navy/80 dark:text-white/70">{partner.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AcademicPartnersSection;
