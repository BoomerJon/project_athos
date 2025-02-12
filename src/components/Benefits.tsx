import { Leaf, Star, Heart } from "lucide-react";
import { motion } from "framer-motion"; 

const Benefits = () => {
  const benefits = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Natural",
      description: "Made with organic ingredients sourced from sustainable farms",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Proven Results",
      description: "Clinically tested to improve skin texture and radiance",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Gentle Formula",
      description: "Safe for all skin types, including sensitive skin",
    },
  ];

  return (
    <section id="benefits" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-accent text-center mb-12"
        >
          Why Choose Our Facial Oil?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
            >
              <div className="text-primary mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-accent mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;