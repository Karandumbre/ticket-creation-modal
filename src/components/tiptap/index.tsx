'use client';
import { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Text from '@tiptap/extension-text';
import { Toggle } from '@/components/ui/toggle';

// Icons
import Attach from '@/assets/icons/attach.svg';
import Bold from '@/assets/icons/bold.svg';
import Emoji from '@/assets/icons/emoji.svg';
import At from '@/assets/icons/at.svg';
import Italic from '@/assets/icons/italic.svg';
import Code from '@/assets/icons/code.svg';
import HyperLink from '@/assets/icons/hyperlink.svg';
import ListOrder from '@/assets/icons/ol.svg';
import UnOrderedList from '@/assets/icons/ul.svg';
import CheckboxList from '@/assets/icons/checkbox.svg';
import Link from '@tiptap/extension-link';
import Enter from '@/assets/icons/enter.svg';
import styles from './style.module.css';

export const Tiptap = ({
  description,
  onChange,
  children,
}: {
  description: string;
  onChange: (richText: string) => void;
  children: React.ReactNode;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: 'Describe the task',
        emptyNodeClass:
          'first:before:text-[#94989E] first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none',
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Code,
      Text,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          'h-20 text-base font-medium leading-5 tracking-[0.20px] text-left border-none p-0 shadow-none placeholder:text-[#94989E] placeholder:text-base placeholder:leading-5 focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);

      if (url === null) {
        return;
      }

      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();

        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className='px-5 ml-[0.5rem]'>
        <EditorContent editor={editor} />
      </div>
      {children}
      <div className='ml-[0.5rem] p-[1rem]' style={{ marginTop: 0 }}>
        {editor && (
          <div className='flex'>
            <Toggle size={'sm'} className='p-[5px]'>
              <Attach className='w-4 h-4' />
            </Toggle>

            <Toggle size={'sm'} className='p-[5px]'>
              <At className='w-4 h-4' />
            </Toggle>
            <Toggle size={'sm'} className='p-[5px]'>
              <Emoji className='w-4 h-4' />
            </Toggle>
            <Toggle
              pressed={editor.isActive('bold')}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
              size={'sm'}
              className='p-[5px]'
            >
              <Bold className='w-4 h-4' />
            </Toggle>
            <Toggle
              pressed={editor.isActive('italic')}
              onPressedChange={() =>
                editor.chain().focus().toggleItalic().run()
              }
              size={'sm'}
              className='p-[5px]'
            >
              <Italic className='w-4 h-4' />
            </Toggle>

            <Toggle
              pressed={editor.isActive('code')}
              onPressedChange={() => editor.chain().focus().toggleCode().run()}
              className='p-[5px]'
            >
              <Code />
            </Toggle>

            <Toggle
              pressed={editor.isActive('link')}
              onPressedChange={() =>
                editor.isActive('link')
                  ? editor.chain().focus().unsetLink().run()
                  : setLink()
              }
              className='p-[5px]'
            >
              <HyperLink />
            </Toggle>
            <Toggle
              pressed={editor.isActive('orderedList')}
              onPressedChange={() =>
                editor.chain().focus().toggleOrderedList().run()
              }
              size={'sm'}
              className='p-[5px]'
            >
              <ListOrder className='w-4 h-4' />
            </Toggle>
            <Toggle
              pressed={editor.isActive('bulletList')}
              onPressedChange={() =>
                editor.chain().focus().toggleBulletList().run()
              }
              size={'sm'}
              className='p-[5px]'
            >
              <UnOrderedList className='w-4 h-4' />
            </Toggle>
            <Toggle
              pressed={editor.isActive('list')}
              onPressedChange={() =>
                editor.chain().focus().toggleList('taskList', 'taskItem').run()
              }
              size={'sm'}
              className='p-[5px]'
            >
              <CheckboxList className='w-4 h-4' />
            </Toggle>

            <button className={styles['create-button']} type='submit'>
              Create <div>|</div> <Enter />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
