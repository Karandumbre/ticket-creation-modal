'use server';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { formSchema } from '@/components/task-form-component';

export async function submitData(formData: z.infer<typeof formSchema>) {
  const {
    title,
    description,
    status,
    tagId,
    assigneeId,
    priorityId,
    projectId,
  } = formData;

  try {
    await prisma.ticket.create({
      data: {
        title,
        description,
        status: {
          connect: { id: Number(status) }, // Connect status by ID
        },
        users: {
          connect: assigneeId!.map((id: string) => ({ id: String(id) })), // Connect multiple users
        },
        priority: {
          connect: { id: Number(priorityId) }, // Connect priority by ID
        },
        tags: {
          connect: tagId!.map((id: number) => ({ id: Number(id) })), // Connect multiple tags
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
