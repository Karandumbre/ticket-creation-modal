'use client';
import React, { useState, useRef, useEffect } from 'react';
import SelectionMenu from '@/components/selection-menu';
import {
  SelectionMenuInterface,
  SelectedValueInterface,
  Recommendation,
} from '@/types';
import EditorFormatter from '../editor-formatter';
import { submitData } from '@/lib/actions';
import { getRecommendations } from '@/lib/resolvers'; // Import the getRecommendations function
import { debounce } from '@/lib/utils'; // Import debounce from lodash
import Suggestions from '@/assets/icons/suggestions.svg';
import AnimatedSuggestion from '@/assets/icons/animated-suggesstion.svg';
import AiSuggestion from '@/components/ai-sugesstion';
import { SelectedSelectionsInterface } from '@/types';

export function Form(props: SelectionMenuInterface) {
  const { priorities, statuses, assignees, tags, projects } = props;
  const [taskTitle, setTaskTitle] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const contentTitleRef = useRef<HTMLDivElement | null>(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const contentDescriptionRef = useRef<HTMLDivElement | null>(null);
  const editorFormatterRef = useRef<HTMLDivElement | null>(null);
  const [selectedSelections, setSelectedSelection] =
    useState<SelectedSelectionsInterface>({
      statusId: null,
      assigneeId: [],
      priorityId: null,
      tagId: [],
      projectId: null,
    });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isRecommendationLoading, setIsRecommendationLoading] = useState(false);

  const handleTaskFocus = () => {
    setIsTitleFocused(true);
  };

  const handleTaskBlur = () => {
    setIsTitleFocused(false);
    const content = contentTitleRef.current?.innerText;
    setTaskTitle(content || '');
  };

  const handleDescriptionFocus = () => {
    setIsDescriptionFocused(true);
  };

  const handleDescriptionBlur = () => {
    setIsDescriptionFocused(false);
    const content = contentDescriptionRef.current?.innerHTML; // Store as HTML for rich text
    setTaskDescription(content || '');
  };

  const handleSelections = (selectedValue: SelectedValueInterface) => {
    setSelectedSelection((prev) => ({
      ...prev,
      [selectedValue.type]: selectedValue.value,
    }));
  };

  // Debounced function to fetch recommendations
  const fetchRecommendations = debounce(async () => {
    setIsRecommendationLoading(true);
    try {
      if (taskTitle && taskDescription) {
        const recommendations = await getRecommendations(
          taskTitle,
          taskDescription
        );
        setRecommendations(recommendations);
      }
    } catch {
      console.log('could not load the suggestions at the moment');
    } finally {
      setIsRecommendationLoading(false);
    }
  }, 500); // Adjust debounce time as needed

  useEffect(() => {
    fetchRecommendations();
    // Cleanup function to cancel the debounce on unmount
    return () => {
      fetchRecommendations.cancel();
    };
  }, [taskTitle, taskDescription]);

  return (
    <form
      className='mt-8'
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        setDataSubmitted(true);

        if (!taskTitle || !taskDescription) {
          return;
        }
        submitData({
          taskTitle,
          taskDescription,
          selectedSelections,
        });
      }}
    >
      <div className='px-5 pb-5 ml-[0.5rem]'>
        <div
          aria-label='task-title'
          contentEditable={true}
          suppressContentEditableWarning={true}
          onFocus={handleTaskFocus}
          onBlur={handleTaskBlur}
          ref={contentTitleRef}
          className={`py-2 ${
            dataSubmitted && !taskTitle
              ? 'border border-red-500 rounded-[8px]'
              : ''
          }`}
          style={{
            color: taskTitle === '' && !isTitleFocused ? '#94989E' : '#000',
          }}
        >
          {taskTitle === '' && !isTitleFocused ? 'Task title' : taskTitle}
        </div>
        {dataSubmitted && !taskTitle ? (
          <p className='text-[14px] leading-[20px] text-red-500 py-2'>
            Title required
          </p>
        ) : (
          ''
        )}
        <div
          aria-label='task-description'
          contentEditable={true}
          suppressContentEditableWarning={true}
          onFocus={handleDescriptionFocus}
          onBlur={handleDescriptionBlur}
          ref={contentDescriptionRef}
          className={`py-2 mt-4 h-20 overflow-scroll ${
            dataSubmitted && !taskDescription
              ? 'border border-red-500 rounded-[8px]'
              : ''
          }`}
          style={{
            color:
              taskDescription === '' && !isDescriptionFocused
                ? '#94989E'
                : '#000',
          }}
          dangerouslySetInnerHTML={{
            __html:
              taskDescription === '' && !isDescriptionFocused
                ? 'Describe the task'
                : taskDescription,
          }}
        ></div>
        {dataSubmitted && !taskDescription ? (
          <p className='text-[14px] leading-[20px] text-red-500 py-2'>
            Description required
          </p>
        ) : (
          ''
        )}

        <div className='flex items-center gap-2 mb-3 mt-3'>
          {isRecommendationLoading ? <AnimatedSuggestion /> : <Suggestions />}
          <AiSuggestion recommendations={recommendations} />
        </div>

        <SelectionMenu
          priorities={priorities || []}
          statuses={statuses || []}
          assignees={assignees || []}
          tags={tags || []}
          projects={projects || []}
          handleSelections={handleSelections}
        />
      </div>
      <hr />
      <EditorFormatter
        contentDescriptionRef={contentDescriptionRef}
        ref={editorFormatterRef}
      />
    </form>
  );
}
