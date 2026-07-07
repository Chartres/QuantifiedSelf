import { describe, expect, it } from 'vitest';
import { EXERCISES, SECTION_LABELS, youtubeSearchUrl, type ExerciseSection } from './exercises';

describe('EXERCISES', () => {
  it('has all 10 exercises from the plan', () => {
    expect(EXERCISES).toHaveLength(10);
  });

  it('has unique ids', () => {
    const ids = EXERCISES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('groups exercises into the daily-flow sections in order: ranni (1-5), pridane (6-8), mikro (9-10)', () => {
    const sections = EXERCISES.map((e) => e.section);
    expect(sections).toEqual([
      'ranni',
      'ranni',
      'ranni',
      'ranni',
      'ranni',
      'pridane',
      'pridane',
      'pridane',
      'mikro',
      'mikro',
    ]);
  });

  it('every section used has a Czech label', () => {
    const sections = new Set(EXERCISES.map((e) => e.section));
    sections.forEach((section: ExerciseSection) => {
      expect(SECTION_LABELS[section]).toBeTruthy();
    });
  });

  it('every exercise has a Czech name, 3-5 steps, 2-3 mistakes, a dose, and a video query', () => {
    EXERCISES.forEach((exercise) => {
      expect(exercise.nameCz.length).toBeGreaterThan(0);
      expect(exercise.steps.length).toBeGreaterThanOrEqual(3);
      expect(exercise.steps.length).toBeLessThanOrEqual(5);
      expect(exercise.mistakes.length).toBeGreaterThanOrEqual(2);
      expect(exercise.mistakes.length).toBeLessThanOrEqual(3);
      expect(exercise.dose.length).toBeGreaterThan(0);
      expect(exercise.videoQuery.length).toBeGreaterThan(0);
    });
  });

  it('includes the English original in parens for commonly-named exercises', () => {
    const wallAngels = EXERCISES.find((e) => e.id === 'wall-angels')!;
    expect(wallAngels.nameCz).toBe('Andělé u zdi');
    expect(wallAngels.nameEn).toBe('wall angels');

    const hollowHold = EXERCISES.find((e) => e.id === 'hollow-hold')!;
    expect(hollowHold.nameCz).toBe('Hollow hold');
  });

  it('keeps the wall-hold-belly dose matching the tracked goal (3x20s -> 60s)', () => {
    const wallHold = EXERCISES.find((e) => e.id === 'wall-hold-belly')!;
    expect(wallHold.dose).toContain('20 s');
    expect(wallHold.dose).toContain('60 s');
  });
});

describe('youtubeSearchUrl', () => {
  it('builds a YouTube search results URL, URL-encoding the query', () => {
    expect(youtubeSearchUrl('wall angels exercise')).toBe(
      'https://www.youtube.com/results?search_query=wall%20angels%20exercise',
    );
  });
});
