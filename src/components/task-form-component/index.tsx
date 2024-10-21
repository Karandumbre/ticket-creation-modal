'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import React, { useState, useEffect } from 'react';
import SelectionMenu from '@/components/selection-menu';
import { SelectionMenuInterface, Recommendation } from '@/types';
import { submitData } from '@/lib/actions';
import { getRecommendations } from '@/lib/resolvers';
import { debounce } from '@/lib/utils';
import Suggestions from '@/assets/icons/suggestions.svg';
import AnimatedSuggestion from '@/assets/icons/animated-suggesstion.svg';
import AiSuggestion from '@/components/ai-sugesstion';
import { Tiptap } from '../tiptap';
import { useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const formSchema = z.object({
  title: z.string().min(5, { message: 'Hey, the title is not long enough' }),
  description: z
    .string()
    .min(5, {
      message: 'Hey, the description is really short to provide AI suggestion',
    })
    .trim(),
  status: z.number().optional(),
  tagId: z.array(z.number()).optional(),
  assigneeId: z.array(z.string()).optional(),
  priorityId: z.number().optional(),
  projectId: z.number().optional(),
});

export default function FormComponent(props: SelectionMenuInterface) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
      status: 0,
      tagId: [],
      assigneeId: [],
      priorityId: 0,
      projectId: 0,
    },
  });

  const { priorities, statuses, assignees, tags, projects } = props;
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);

  const title = useWatch({
    control: form.control,
    name: 'title',
  });
  const description = useWatch({
    control: form.control,
    name: 'description',
  });

  const fetchRecommendations = debounce(async () => {
    if (title && description) {
      setIsRecommendationLoading(true);
      try {
        const recommendations = await getRecommendations(title, description);
        setRecommendations(recommendations);
      } catch {
        console.log('could not load the suggestions at the moment');
      } finally {
        setIsRecommendationLoading(false);
      }
    }
  }, 1000);

  useEffect(() => {
    fetchRecommendations();
    return () => {
      fetchRecommendations.cancel();
    };
  }, [title, description]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitData(values);
  }

  return (
    <Form {...form}>
      <form className='mt-8' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='px-5 pb-5 ml-[0.5rem]'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Task title'
                      {...field}
                      className='text-base font-medium leading-5 tracking-[0.20px] text-left border-none p-0 shadow-none placeholder:text-[#94989E] placeholder:text-base placeholder:leading-5 focus:outline-none'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
        </div>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Tiptap description={field.value} onChange={field.onChange}>
                    <div
                      className='px-5 ml-[0.5rem] mt-0'
                      style={{ marginTop: 0 }}
                    >
                      <div className='flex items-center gap-2 mb-3'>
                        {isRecommendationLoading ? (
                          <AnimatedSuggestion />
                        ) : (
                          <Suggestions />
                        )}
                        <AiSuggestion recommendations={recommendations} />
                      </div>
                      <SelectionMenu
                        // @ts-expect-error@Expected
                        control={form.control}
                        priorities={priorities || []}
                        statuses={statuses || []}
                        assignees={assignees || []}
                        tags={tags || []}
                        projects={projects || []}
                      />
                    </div>
                    <hr />
                  </Tiptap>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>
      </form>
    </Form>
  );
}
