import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah J.",
      role: "Verified Customer",
      content:
        "This facial oil has completely transformed my skincare routine. My skin feels more hydrated and radiant than ever!",
      rating: 5,
    },
    {
      name: "Dr. Emily Chen",
      role: "Dermatologist",
      content:
        "As a dermatologist, I highly recommend this oil. The natural ingredients and careful formulation make it suitable for all skin types.",
      rating: 5,
    },
    {
      name: "Michael R.",
      role: "Verified Customer",
      content:
        "I was skeptical at first, but after two weeks of use, I noticed a significant improvement in my skin's texture and appearance.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-accent text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              style={{
                animation: `fadeIn 0.5s ease-out forwards ${index * 0.2}s`,
                opacity: 0,
              }}
            >
              <div className="flex text-primary mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">{testimonial.content}</p>
              <div>
                <p className="font-semibold text-accent">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;