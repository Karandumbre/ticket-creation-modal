'use client';
import { useState } from 'react';
import { DropdownProps, Option } from '@/types';
const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  icon,
  onSelect,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option); // Callback to parent component
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className='relative inline-block text-left' {...props}>
      <div>
        <button
          type='button'
          onClick={handleToggle}
          className='inline-flex justify-between items-center w-full border border-[#DFE1E4] h-[30px] rounded-[8px] bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none px-2'
          style={{
            color: selectedOption?.label ? '#374151' : '#94989E',
          }}
        >
          {selectedOption?.icon || icon}
          <span className='text-xs font-medium leading-5 tracking-tight text-left ml-2'>
            {selectedOption?.label || label}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className='absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg min-w-32'>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {options.map((option) => (
              <button
                key={option.value}
                className={`block w-full text-left px-4 py-2 text-sm flex gap-2 
                  ${
                    selectedOption?.value === option.value
                      ? 'bg-blue-100 text-blue-700 font-semibold' // Highlight selected option
                      : 'text-gray-700'
                  }
                  hover:bg-gray-100`} // Hover effect for all options
                onClick={() => handleOptionSelect(option)}
                role='menuitem'
              >
                {option?.icon || ''} {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
