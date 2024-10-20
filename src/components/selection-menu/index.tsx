'use client';
import React from 'react';
import Dropdown from '@/components/tag-dropdown';
import Elipses from '@/assets/icons/elipses.svg';
import Person from '@/assets/icons/person.svg';
import Tag from '@/assets/icons/tag.svg';
import Flag from '@/assets/icons/flag.svg';
import Menu from '@/assets/icons/menu.svg';
import { Option } from '@/types';
import Image from 'next/image';
import DateInput from '@/components/calendar';
import { SelectionMenuInterface, SelectedValueInterface } from '@/types';
import { MultiSelectDropdown } from '@/components/multi-select'; // Import the new multi-select dropdown

function formatStatus(status: string): string {
  return status
    .toLowerCase() // Convert to lower case
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}

function SelectionMenu({
  priorities,
  statuses,
  assignees,
  tags,
  projects,
  handleSelections,
}: SelectionMenuInterface & {
  handleSelections: (values: SelectedValueInterface) => void;
}) {
  const handleSelect = (option: Option, type: string) => {
    handleSelections({ value: option.value, label: option.label, type });
  };

  const handleMultiSelect = (selectedOptions: Option[], type: string) => {
    const values = selectedOptions.map((option) => option.value);
    handleSelections({ value: values, type });
  };

  return (
    <div className='flex gap-2 flex-wrap'>
      <Dropdown
        options={statuses.map((item) => ({
          value: item.id,
          label: formatStatus(item.name),
        }))}
        label='Status'
        icon={<Elipses />}
        onSelect={(option) => handleSelect(option, 'statusId')}
      />

      <MultiSelectDropdown
        options={assignees.map((item) => ({
          value: item.id,
          label: item.firstName,
          icon: (
            <Image
              src={item.imageSrc!}
              alt={item.firstName}
              width={20}
              height={20}
              className='rounded-full'
            />
          ),
        }))}
        label='Select Assignees'
        icon={<Person />}
        onSelect={(selectedOptions) =>
          handleMultiSelect(selectedOptions, 'assigneeId')
        }
      />

      <Dropdown
        options={priorities.map((item) => ({
          value: item.id,
          label: item.level,
        }))}
        label='Priority'
        icon={<Flag />}
        onSelect={(option) => handleSelect(option, 'priorityId')}
      />

      <MultiSelectDropdown
        options={tags.map((item) => ({
          value: item.id,
          label: item.name,
        }))}
        label='Select Tags'
        icon={<Tag />}
        onSelect={(selectedOptions) => {
          return handleMultiSelect(selectedOptions, 'tagId');
        }}
      />

      <Dropdown
        options={projects.map((project) => ({
          value: project.id,
          label: project.name,
        }))}
        label='Project'
        icon={<Menu />}
        onSelect={(option) => handleSelect(option, 'projectId')}
      />

      <DateInput />
    </div>
  );
}

export default SelectionMenu;
