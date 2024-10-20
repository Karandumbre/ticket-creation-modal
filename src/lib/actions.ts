'use server';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { FormData } from '@/types';
import { revalidatePath } from 'next/cache';

export async function submitData(formData: FormData) {
  try {
    const {
      taskTitle,
      taskDescription,
      selectedSelections: {
        statusId,
        assigneeId,
        priorityId,
        tagId,
        projectId,
      },
    } = formData;

    await prisma.ticket.create({
      data: {
        title: taskTitle,
        description: taskDescription,
        status: {
          connect: { id: Number(statusId) }, // Connect status by ID
        },
        users: {
          connect: assigneeId.map((id: string) => ({ id: String(id) })), // Connect multiple users
        },
        priority: {
          connect: { id: Number(priorityId) }, // Connect priority by ID
        },
        tags: {
          connect: tagId.map((id: number) => ({ id: Number(id) })), // Connect multiple tags
        },
        project: {
          connect: { id: Number(projectId) }, // Connect project by ID
        },
      },
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw new Error('Error creating ticket');
  } finally {
    revalidatePath('/');
    redirect('/');
  }
}
