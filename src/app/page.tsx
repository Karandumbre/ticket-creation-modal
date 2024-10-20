import Link from 'next/link';
import { getTasks } from '@/lib/resolvers';
import { List } from '@/components/task-list';
import React from 'react';

export default async function TaskList() {
  const tasks = await getTasks();

  return (
    <div className='m-4'>
      <div className='flex justify-end'>
        <Link
          href={{
            pathname: '/task-editor',
          }}
        >
          <button className='gap-2 ml-auto flex items-center text-sm [box-shadow:0px_3px_0px_0px_#3F2ABD] bg-[#533BE5] rounded-lg h-[34px] p-[10px] text-white'>
            Add task
          </button>
        </Link>
      </div>
      {tasks.length ? (
        <div className='grid grid-cols-2 gap-4 mt-5'>
          {tasks.map((task) => {
            return <List {...task} key={task.id} />;
          })}
        </div>
      ) : (
        <>No tasks at the moment</>
      )}
    </div>
  );
}
