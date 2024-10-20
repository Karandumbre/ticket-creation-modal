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
import { SelectionMenuInterface } from '@/types';
import { MultiSelectDropdown } from '@/components/multi-select'; // Import the new multi-select dropdown
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Control, FieldValues } from 'react-hook-form';
function formatStatus(status: string): string {
  return status
    .toLowerCase() // Convert to lower case
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}

function SelectionMenu({
  control,
  priorities,
  statuses,
  assignees,
  tags,
  projects,
}: SelectionMenuInterface & {
  control: Control<FieldValues>;
}) {
  // @ts-expect-error@Expected
  const handleMultiSelect = (selectedOptions: Option[], field) => {
    const values = selectedOptions.map((option) => option.value);
    field.onChange(values);
  };

  return (
    <div className='flex gap-2 flex-wrap'>
      <FormField
        control={control}
        name='status'
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <Dropdown
                  {...field}
                  options={statuses.map((item) => ({
                    value: item.id,
                    label: formatStatus(item.name),
                  }))}
                  label='Status'
                  icon={<Elipses />}
                  onSelect={(option) => field.onChange(option.value)}
                />
              </FormControl>{' '}
              <FormMessage />
            </FormItem>
          );
        }}
      ></FormField>

      <FormField
        control={control}
        name='assigneeId'
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <MultiSelectDropdown
                  {...field}
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
                    handleMultiSelect(selectedOptions, field)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      ></FormField>

      <FormField
        control={control}
        name='priorityId'
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <Dropdown
                  {...field}
                  options={priorities.map((item) => ({
                    value: item.id,
                    label: item.level,
                  }))}
                  label='Priority'
                  icon={<Flag />}
                  onSelect={(option) => field.onChange(option.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      ></FormField>

      <FormField
        control={control}
        name='tagId'
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <MultiSelectDropdown
                  {...field}
                  options={tags.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  label='Select Tags'
                  icon={<Tag />}
                  onSelect={(selectedOptions) =>
                    handleMultiSelect(selectedOptions, field)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      ></FormField>

      <FormField
        control={control}
        name='projectId'
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <Dropdown
                  {...field}
                  options={projects.map((project) => ({
                    value: project.id,
                    label: project.name,
                  }))}
                  label='Project'
                  icon={<Menu />}
                  onSelect={(option) => field.onChange(option.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      ></FormField>

      <DateInput />
    </div>
  );
}

export default SelectionMenu;
