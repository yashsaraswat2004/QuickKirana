// src/features/homepage/Testimonials.tsx

import { motion } from 'framer-motion';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  index: number;
}

// Keeping your excellent TestimonialCard component design
const TestimonialCard = ({ name, role, content, avatar, rating, index }: TestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 h-full flex flex-col"
  >
    <div className="flex items-center mb-4">
      {[...Array(rating)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    
    <p className="text-gray-700 mb-6 leading-relaxed italic flex-grow">"{content}"</p>
    
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {avatar}
      </div>
      <div className="ml-4">
        <h4 className="font-bold text-gray-900">{name}</h4>
        <p className="text-gray-600 text-sm">{role}</p>
      </div>
    </div>
  </motion.div>
);

export const Testimonials = () => {
  // New, more authentic testimonials, including one from a shopkeeper
  const testimonials = [
    {
      name: "Priya S.",
      role: "Customer from Sector 15",
      content: "This is a lifesaver! I used to make a separate trip just to drop off my monthly list. Now I just send a photo and get a call when it's all packed. It's so simple and saves me so much time.",
      avatar: "PS",
      rating: 5
    },
    {
      name: "Mr. Gupta",
      role: "Owner, Gupta Kirana Store",
      content: "At first I was unsure, but now this platform is helping me manage orders easily. I get clear, written lists, which means no mistakes, and my regular customers are very happy with the new system.",
      avatar: "GK",
      rating: 5
    },
    {
      name: "Anjali V.",
      role: "Customer from City Center",
      content: "The best part is not having to wait at the shop. I place my order, go about my day, and just pick it up when it's ready. The 'urgent' option was also very helpful last week!",
      avatar: "AV",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900"
          >
            Loved by Customers and Shopkeepers
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Here's what our early users in Gwalior are saying about their new way to shop.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
