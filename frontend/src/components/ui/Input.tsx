interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, id, icon, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          {...props}
          className={`w-full py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent 
                     transition-shadow duration-200 ${icon ? 'pl-10 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  );
};
