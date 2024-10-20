'use server';
import prisma from '@/lib/prisma';
import { Recommendation } from '@/types';

export const getPriorities = async () => {
  return await prisma.priority.findMany();
};

export const getStatus = async () => {
  return await prisma.status.findMany();
};

export const getAssignee = async () => {
  return await prisma.user.findMany();
};

export const getTags = async () => {
  return await prisma.tag.findMany();
};

export const getProjects = async () => {
  return await prisma.project.findMany();
};

export const getTasks = async () => {
  try {
    return await prisma.ticket.findMany({
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            imageSrc: true,
          },
        },
        priority: {
          select: {
            id: true,
            level: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        status: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  } catch {
    throw new Error('Error fetching records');
  }
};

const apiKey = process.env.GOOGLE_GEMINI_KEY;

export const getRecommendations = async (
  title: string,
  description: string
): Promise<Recommendation[]> => {
  const apiRequestJson = {
    contents: [
      {
        parts: [
          {
            text: `Given the title "${title}" and description "${description}", suggest short tags (1-3 words) that capture the main ideas, along with a corresponding hex color code for each tag. Return the response in this format: "tag: color code, another tag: color code". No additional text or explanation.`,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestJson),
      }
    );

    if (!response.ok) {
      throw new Error('Error fetching recommendations');
    }

    const data = await response.json();

    // Extracting tags from the response
    const generatedText = data.candidates[0]?.content?.parts[0]?.text || '';

    return generatedText
      .trim()
      .split(', ')
      .map((tag: string) => {
        const [label, colorCode] = tag.split(':').map((part) => part.trim());
        return { label, colorCode };
      });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw new Error('Error fetching recommendations');
  }
};
