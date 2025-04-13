
import { motion } from "framer-motion";
import { Award, CheckCircle, Lock, Handshake, Lightbulb, Target } from "lucide-react";

const CoreValuesSection = () => {
  const values = [
    {
      icon: <CheckCircle className="h-10 w-10" />,
      title: "Integrity",
      description: "Upholding the highest standards of academic and ethical responsibility."
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Excellence",
      description: "Delivering high-quality work that exceeds expectations."
    },
    {
      icon: <Lock className="h-10 w-10" />,
      title: "Confidentiality",
      description: "Ensuring your research remains safe, secure, and private."
    },
    {
      icon: <Handshake className="h-10 w-10" />,
      title: "Collaboration",
      description: "Partnering with clients to meet unique research goals and timelines."
    },
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: "Innovation",
      description: "Using cutting-edge tools and insights in research communication."
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: "Accuracy",
      description: "Every word and visual backed by clarity, coherence, and precision."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIzIDAgMi4zMTMuNDU3IDMuMTgyIDEuMTgyTS0xIFkxIiAvPjwvZz48L3N2Zz4=')] opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold dark:text-white text-sciscribe-navy">Our Core Values</h2>
          <p className="text-lg dark:text-white/80 text-sciscribe-navy/80">
            Our work is grounded in principles that reflect academic rigor, trust, and innovation. 
            These values guide how we support researchers and institutions around the globe.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="premium-card flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-white via-white to-sciscribe-mist/50 dark:from-sciscribe-navy/30 dark:via-sciscribe-navy/20 dark:to-sciscribe-navy/10 border border-sciscribe-mist/30 dark:border-white/5 shadow-sm group-hover:shadow-lg group-hover:shadow-sciscribe-gold/10 transition-shadow duration-500 transform">
                <div className="text-sciscribe-gold">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-sciscribe-navy dark:text-white">{value.title}</h3>
              <p className="text-sciscribe-navy/80 dark:text-white/70">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
