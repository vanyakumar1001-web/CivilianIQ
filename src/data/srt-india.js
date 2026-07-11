import srt from '../../data/SRT_India_Police_v2.json';

export const metadata = srt.metadata;
export const entries = srt.entries;

export function findEntryById(id) {
  return entries.find((e) => e.id === id);
}
