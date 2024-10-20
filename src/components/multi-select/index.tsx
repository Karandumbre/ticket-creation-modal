'use client';
import { Fragment, useState } from 'react';
import { Option } from '@/types';

export type DropdownProps = {
  options: Array<Option>;
  label: string;
  onSelect: (options: Option[]) => void;
  icon?: React.ReactNode;
};

export const MultiSelectDropdown: React.FC<DropdownProps> = ({
  options,
  label,
  icon,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    const alreadySelected = selectedOptions.some(
      (selected) => selected.value === option.value
    );

    const updatedSelectedOptions = alreadySelected
      ? selectedOptions.filter((selected) => selected.value !== option.value)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelectedOptions);
    onSelect(updatedSelectedOptions);
  };

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          onClick={handleToggle}
          className='inline-flex justify-between items-center w-full border border-[#DFE1E4] h-[30px] rounded-[8px] bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none px-2'
          style={{
            color: selectedOptions.length ? '#374151' : '#94989E',
          }}
        >
          {selectedOptions.length > 0 ? '' : icon}
          <span className='flex gap-2 text-xs font-medium leading-5 tracking-tight text-left ml-2'>
            {selectedOptions.length > 0
              ? selectedOptions.map((opt, id) => {
                  const isLast = selectedOptions.length - 1 === id;
                  return (
                    <Fragment key={`${opt.value}-${id}`}>
                      {opt?.icon || ''} {opt.label} {!isLast && ','}
                    </Fragment>
                  );
                })
              : label}
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
                type='button'
                key={option.value}
                className={`block w-full text-left px-4 py-2 text-sm flex gap-2 
                  ${
                    selectedOptions.some(
                      (selectedOption) => selectedOption.value === option.value
                    )
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-700'
                  }
                  hover:bg-gray-100`}
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
