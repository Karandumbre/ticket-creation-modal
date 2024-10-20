import React from 'react';
import EnergyIcon from '@/assets/icons/energy.svg';
import RightArrow from '@/assets/icons/right-arrow.svg';
import Image from 'next/image';
import Elipses from '@/assets/icons/elipses.svg';
import TagIcon from '@/assets/icons/tag.svg'; // Renamed to avoid conflict with 'Tag' component
import Menu from '@/assets/icons/menu.svg';
import { ListProps, User, Tag } from '@/types';

export const Button = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <button
      type='button'
      className='inline-flex justify-between items-center border border-[#DFE1E4] h-[30px] rounded-[8px] bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none px-2 mt-4'
      style={{
        color: '#374151',
      }}
    >
      {icon || ''}
      <span className='whitespace-nowrap text-xs font-medium leading-5 tracking-tight text-left ml-2'>
        {label}
      </span>
    </button>
  );
};

export function List({
  id,
  priority,
  title,
  description,
  users,
  status,
  project,
  tags,
}: ListProps) {
  return (
    <div
      key={id}
      className='task-item border rounded-lg p-4 mb-4 bg-white shadow-sm w-full m-auto h-full'
    >
      <div className='inline-flex gap-2 items-center mb-2'>
        <div className='inline-flex items-center px-2 py-[6px] gap-2 rounded-[6px] bg-[#F5F5F580]'>
          <EnergyIcon />
          <h3 className='text-[14px] font-medium leading-[20px] tracking-[0.2px] text-left'>
            {priority.level}
          </h3>
        </div>
        <RightArrow />
        <h3 className='text-[14px] font-medium leading-[20px] tracking-[0.2px] text-left'>
          {title}
        </h3>
      </div>

      <p className='text-sm text-gray-700 mb-2'>{description}</p>

      <div className='inline-flex flex-row gap-1 flex-wrap'>
        {/* Render multiple users */}
        {users.map((user: User) => (
          <Button
            key={user.id}
            label={user.firstName}
            icon={
              <Image
                src={user.imageSrc!}
                alt={user.firstName}
                width={20}
                height={20}
                className='rounded-full'
              />
            }
          />
        ))}

        {/* Status Button */}
        <Button label={status.name} icon={<Elipses />} />

        {/* Project Button */}
        <Button label={project.name} icon={<Menu />} />

        {/* Render multiple tags */}
        {tags.map((tag: Tag) => (
          <Button key={tag.id} label={tag.name} icon={<TagIcon />} />
        ))}
      </div>
    </div>
  );
}
