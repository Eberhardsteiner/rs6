// src/utils/attachmentUtils.ts
import type { AttachmentItem } from '@/data/attachmentContents';

export function getAttachmentById(id: string, attachments: AttachmentItem[]): AttachmentItem | null {
  return attachments.find(att => att.id === id) || null;
}

export function getAttachmentsForDay(day: number, attachments: AttachmentItem[]): AttachmentItem[] {
  return attachments.filter(att => att.day === day);
}

export function hasAttachments(day: number, attachments: AttachmentItem[]): boolean {
  return attachments.some(att => att.day === day);
}

export function groupAttachmentsByDay(attachments: AttachmentItem[]): Record<number, AttachmentItem[]> {
  const grouped: Record<number, AttachmentItem[]> = {};

  for (const att of attachments) {
    if (!grouped[att.day]) {
      grouped[att.day] = [];
    }
    grouped[att.day].push(att);
  }

  return grouped;
}

export function sortAttachmentsByDay(attachments: AttachmentItem[]): AttachmentItem[] {
  return [...attachments].sort((a, b) => a.day - b.day);
}

export function getAttachmentTitle(attachment: AttachmentItem): string {
  return attachment.title || attachment.id;
}

export function formatAttachmentSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function isImageAttachment(attachment: AttachmentItem): boolean {
  if (!attachment.type) return false;
  return attachment.type.startsWith('image/');
}

export function isPdfAttachment(attachment: AttachmentItem): boolean {
  if (!attachment.type) return false;
  return attachment.type === 'application/pdf';
}

export function isTextAttachment(attachment: AttachmentItem): boolean {
  if (!attachment.type) return false;
  return attachment.type.startsWith('text/') || attachment.type === 'application/json';
}

export function getAttachmentIcon(attachment: AttachmentItem): string {
  if (isImageAttachment(attachment)) return '🖼️';
  if (isPdfAttachment(attachment)) return '📄';
  if (isTextAttachment(attachment)) return '📝';
  return '📎';
}

export function filterAttachmentsByType(
  attachments: AttachmentItem[],
  type: 'image' | 'pdf' | 'text' | 'all'
): AttachmentItem[] {
  if (type === 'all') return attachments;

  return attachments.filter(att => {
    switch (type) {
      case 'image':
        return isImageAttachment(att);
      case 'pdf':
        return isPdfAttachment(att);
      case 'text':
        return isTextAttachment(att);
      default:
        return true;
    }
  });
}

export function searchAttachments(
  attachments: AttachmentItem[],
  query: string
): AttachmentItem[] {
  if (!query.trim()) return attachments;

  const lowerQuery = query.toLowerCase().trim();

  return attachments.filter(att => {
    const title = getAttachmentTitle(att).toLowerCase();
    const id = att.id.toLowerCase();

    return title.includes(lowerQuery) || id.includes(lowerQuery);
  });
}

export function getAttachmentCount(attachments: AttachmentItem[]): number {
  return attachments.length;
}

export function getAttachmentCountByDay(attachments: AttachmentItem[]): Record<number, number> {
  const counts: Record<number, number> = {};

  for (const att of attachments) {
    counts[att.day] = (counts[att.day] || 0) + 1;
  }

  return counts;
}
