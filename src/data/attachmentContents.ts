// src/data/attachmentContents.ts
// Zentrale Datei, die alle tagesbasierten Attachment-Dateien importiert und zusammenführt

import { day1Attachments } from './attachmentDay1';
import { day2Attachments } from './attachmentDay2';
import { day3Attachments } from './attachmentDay3';
import { day4Attachments } from './attachmentDay4';
import { day5Attachments } from './attachmentDay5';
import { day6Attachments } from './attachmentDay6';
import { day7Attachments } from './attachmentDay7';
import { day8Attachments } from './attachmentDay8';
import { day9Attachments } from './attachmentDay9';
import { day10Attachments } from './attachmentDay10';
import { day11Attachments } from './attachmentDay11';
import { day12Attachments } from './attachmentDay12';
import { day13Attachments } from './attachmentDay13';
import { day14Attachments } from './attachmentDay14';

export interface AttachmentContent {
  filename: string;
  title: string;
  type: 'document' | 'email' | 'spreadsheet' | 'presentation' | 'memo';
  content: string;
}

// Alle Attachments zusammenführen
export const attachmentContents: Record<string, AttachmentContent> = {
  ...day1Attachments,
  ...day2Attachments,
  ...day3Attachments,
  ...day4Attachments,
  ...day5Attachments,
  ...day6Attachments,
  ...day7Attachments,
  ...day8Attachments,
  ...day9Attachments,
  ...day10Attachments,
  ...day11Attachments,
  ...day12Attachments,
  ...day13Attachments,
  ...day14Attachments
};