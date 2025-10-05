// src/components/multiplayer/helpers/scenarioDataLoader.ts
import type { DecisionBlock, DayNewsItem } from '@/core/models/domain';

import { day1Blocks, day1News } from '@/data/scenario_day_01';
import { day2Blocks, day2News } from '@/data/scenario_day_02';
import { day3Blocks, day3News } from '@/data/scenario_day_03';
import { day4Blocks, day4News } from '@/data/scenario_day_04';
import { day5Blocks, day5News } from '@/data/scenario_day_05';
import { day6Blocks, day6News } from '@/data/scenario_day_06';
import { day7Blocks, day7News } from '@/data/scenario_day_07';
import { day8Blocks, day8News } from '@/data/scenario_day_08';
import { day9Blocks, day9News } from '@/data/scenario_day_09';
import { day10Blocks, day10News } from '@/data/scenario_day_10';
import { day11Blocks, day11News } from '@/data/scenario_day_11';
import { day12Blocks, day12News } from '@/data/scenario_day_12';
import { day13Blocks, day13News } from '@/data/scenario_day_13';
import { day14Blocks, day14News } from '@/data/scenario_day_14';

const blocksByDay: Record<number, DecisionBlock[]> = {
  1: day1Blocks,
  2: day2Blocks,
  3: day3Blocks,
  4: day4Blocks,
  5: day5Blocks,
  6: day6Blocks,
  7: day7Blocks,
  8: day8Blocks,
  9: day9Blocks,
  10: day10Blocks,
  11: day11Blocks,
  12: day12Blocks,
  13: day13Blocks,
  14: day14Blocks,
};

const newsByDay: Record<number, DayNewsItem[]> = {
  1: day1News,
  2: day2News,
  3: day3News,
  4: day4News,
  5: day5News,
  6: day6News,
  7: day7News,
  8: day8News,
  9: day9News,
  10: day10News,
  11: day11News,
  12: day12News,
  13: day13News,
  14: day14News,
};

export function getBlocksForDay(day: number): DecisionBlock[] {
  return blocksByDay[day] || [];
}

export function getNewsForDay(day: number): DayNewsItem[] {
  return newsByDay[day] || [];
}

export function getAllDays(): number[] {
  return Object.keys(blocksByDay).map(Number).sort((a, b) => a - b);
}

export function getTotalDays(): number {
  return Object.keys(blocksByDay).length;
}

export function hasDataForDay(day: number): boolean {
  return day in blocksByDay && day in newsByDay;
}
