import { motion } from 'framer-motion';

interface StepCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

// Simplified and more focused Step Card
const StepCard = ({ icon, title, description, index }: StepCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="text-center p-6 bg-white/50 rounded-2xl shadow-lg border border-gray-100"
  >
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mx-auto mb-5 shadow-orange-200/50 shadow-lg">
      <span className="text-white text-3xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export const HowItWorks = () => {
  // The new, simplified 3-step process
  const steps = [
    {
      icon: "📝",
      title: "1. Submit Your List",
      description: "Find your local store, then simply type or upload a picture of your grocery list.",
    },
    {
      icon: "🛍️",
      title: "2. We Get It Ready",
      description: "Your trusted shopkeeper receives your order instantly and prepares everything for you.",
    },
    {
      icon: "🚚",
      title: "3. Pickup or Get Delivered",
      description: "You get a notification when it's ready. Swing by to pick it up or choose home delivery.",
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 relative">
        <div 
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900"
          >
            Get Your Groceries in 3 Easy Steps
          </motion.h2>
        </div>
        
        {/* We will use a 3-column grid for larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
