
import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "D S",
      role: "Chief Executive Officer & Founder",
      bio: "D S leads SciScribe Solutions with extensive expertise in scientific communication and research publication. His vision drives our commitment to excellence in academic editing and consulting.",
      image: "/placeholder.svg"
    },
    {
      name: "S S",
      role: "Senior Editor & Co-Founder",
      bio: "With a background in research methodology and data analysis, Maria ensures the highest standards of scientific accuracy in our editing services.",
      image: "/placeholder.svg"
    },
    {
      name: "S G",
      role: "Statistical Consultant",
      bio: "Specializing in research design and statistical analysis, James helps researchers optimize their methodology and data presentation.",
      image: "/placeholder.svg"
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
    <section className="py-20 bg-white/80 dark:bg-sciscribe-navy/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold dark:text-white text-sciscribe-navy">
            Working With You, Not Just For You
          </h2>
          <p className="text-lg dark:text-white/80 text-sciscribe-navy/80">
            We take pride in our Passionate, Innovative Team
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="premium-card group"
            >
              <div className="mb-6 relative">
                <div className="aspect-square rounded-full overflow-hidden border-4 border-white dark:border-sciscribe-navy shadow-md mx-auto w-48 h-48">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="bg-white p-2 rounded-full shadow-md hover:bg-sciscribe-blue hover:text-white transition-colors">
                    <Linkedin size={16} />
                  </a>
                  <a href="#" className="bg-white p-2 rounded-full shadow-md hover:bg-sciscribe-blue hover:text-white transition-colors">
                    <Twitter size={16} />
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-1 text-sciscribe-navy dark:text-white">{member.name}</h3>
                <p className="text-sciscribe-gold font-medium mb-3">{member.role}</p>
                <p className="text-sm text-sciscribe-navy/80 dark:text-white/70">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="max-w-4xl mx-auto text-lg italic dark:text-white/80 text-sciscribe-navy/80">
            "We're passionate about research and communication — and it shows in the work we do. 
            Whether you're preparing a <span className="font-semibold">thesis</span>, a <span className="font-semibold">journal manuscript</span>, 
            or a <span className="font-semibold">presentation</span>, we craft thoughtful, tailored solutions to help you publish and present with confidence. 
            At <span className="text-sciscribe-gold font-semibold">SciScribe Solutions</span>, we're not just service providers — we're partners in your academic journey."
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
