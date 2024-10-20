import { Modal } from '@/components';
import EnergyIcon from '@/assets/icons/energy.svg';
import RightArrow from '@/assets/icons/right-arrow.svg';
import styles from './style.module.css';
import {
  getPriorities,
  getStatus,
  getAssignee,
  getTags,
  getProjects,
} from '@/lib/resolvers';
import Form from '@/components/task-form-component';

async function TaskEditor() {
  const priorities = await getPriorities();
  const statuses = await getStatus();
  const assignees = await getAssignee();
  const tags = await getTags();
  const projects = await getProjects();

  return (
    <Modal isOpen={true} goBackPath='/'>
      <div className={styles['modal-wrapper']}>
        <div className='inline-flex gap-2 items-center'>
          <div className='inline-flex items-center px-2 py-[6px] gap-2 rounded-[6px] gap-2 bg-[#F5F5F580]'>
            <EnergyIcon />
            <h3 className={styles['title-tag']}>Frontend</h3>
          </div>
          <RightArrow />
          <h3 className={styles['title-tag']}>New Task</h3>
        </div>
      </div>
      <Form
        priorities={priorities || []}
        statuses={statuses || []}
        assignees={assignees || []}
        tags={tags || []}
        projects={projects || []}
      />
    </Modal>
  );
}

export default TaskEditor;
