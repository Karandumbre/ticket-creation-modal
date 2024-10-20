'use client';
import { forwardRef } from 'react';
import Attach from '@/assets/icons/attach.svg';
import Bold from '@/assets/icons/bold.svg';
import Emoji from '@/assets/icons/emoji.svg';
import At from '@/assets/icons/at.svg';
import Italic from '@/assets/icons/italic.svg';
import Code from '@/assets/icons/code.svg';
import HyperLink from '@/assets/icons/hyperlink.svg';
import NumberedList from '@/assets/icons/ol.svg';
import UnOrderedList from '@/assets/icons/ul.svg';
import CheckboxList from '@/assets/icons/checkbox.svg';
import Enter from '@/assets/icons/enter.svg';
import styles from './style.module.css';
import { MouseEvent } from 'react';

interface EditorFormatterProps {
  contentDescriptionRef: React.RefObject<HTMLDivElement>;
}

const EditorFormatter = forwardRef<HTMLDivElement, EditorFormatterProps>(
  ({ contentDescriptionRef }, ref) => {
    const applyFormat = (command: string, value?: string) => {
      if (contentDescriptionRef.current && document && document.execCommand) {
        contentDescriptionRef.current.focus(); // Ensure the description is focused
        const selection = window.getSelection();
        console.log(selection);

        document.execCommand(command, false, value);
      }
    };

    const insertLink = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentElement = range.commonAncestorContainer.parentElement;

        const currentLink =
          parentElement?.nodeName === 'A'
            ? (parentElement as HTMLAnchorElement).getAttribute('href')
            : '';

        const url = prompt('Enter the URL', currentLink || '');
        if (url) {
          const a = document.createElement('a');
          a.href = url;
          a.textContent = selection.toString();
          range.deleteContents(); // Delete the current selection
          range.insertNode(a); // Insert the new link
        }
      }
    };

    const insertImage = () => {
      const url = prompt('Enter Image URL');
      if (url) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Image';
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.insertNode(img);
        }
      }
    };

    const handleButtonClick = (
      e: MouseEvent<HTMLDivElement>,
      command: string,
      value?: string
    ) => {
      e.preventDefault();
      applyFormat(command, value);
    };

    return (
      <div ref={ref} className='p-5 flex gap-1.5'>
        <div className='my-auto' onClick={insertImage}>
          <Attach />
        </div>
        <div className='my-auto'>
          <At />
        </div>
        <div className='my-auto'>
          <Emoji />
        </div>
        <div className='my-auto' onClick={(e) => handleButtonClick(e, 'bold')}>
          <Bold />
        </div>
        <div
          className='my-auto'
          onClick={(e) => handleButtonClick(e, 'italic')}
        >
          <Italic />
        </div>
        <div
          className='my-auto'
          onClick={(e) => handleButtonClick(e, 'formatBlock', 'pre')}
        >
          <Code />
        </div>
        <div className='my-auto' onClick={insertLink}>
          <HyperLink />
        </div>
        <div
          className='my-auto'
          onClick={(e) => handleButtonClick(e, 'insertOrderedList')}
        >
          <NumberedList />
        </div>
        <div
          className='my-auto'
          onClick={(e) => handleButtonClick(e, 'insertUnorderedList')}
        >
          <UnOrderedList />
        </div>
        <div
          className='my-auto'
          onClick={(e) => handleButtonClick(e, 'insertCheckbox')}
        >
          <CheckboxList />
        </div>
        <button className={styles['create-button']} type='submit'>
          Create <div>|</div> <Enter />
        </button>
      </div>
    );
  }
);

EditorFormatter.displayName = 'EditorFormatter';

export default EditorFormatter;
