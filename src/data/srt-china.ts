import srt from '../../data/SRT_China_Police_v1.json';
import type { RightsEntry } from '@/types';

export const metadata = srt.metadata;
export const entries = srt.entries as RightsEntry[];

export function findEntryById(id: string): RightsEntry | undefined {
  return entries.find((e) => e.id === id);
}
