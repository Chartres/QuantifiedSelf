import { EXERCISES, SECTION_LABELS, youtubeSearchUrl, type ExerciseSection } from '../domain/exercises';
import { ILLUSTRATIONS } from '../components/exercises/Illustrations';

const SECTION_ORDER: ExerciseSection[] = ['ranni', 'pridane', 'mikro'];

export function Exercises() {
  return (
    <div className="view view--exercises">
      <h1 className="view__title">Cvičení</h1>
      {SECTION_ORDER.map((section) => {
        const items = EXERCISES.filter((e) => e.section === section);
        if (items.length === 0) return null;
        return (
          <div key={section}>
            <h2 className="exercise-section__title">{SECTION_LABELS[section]}</h2>
            {items.map((exercise) => {
              const Illustration = ILLUSTRATIONS[exercise.id];
              return (
                <section key={exercise.id} className="exercise-card">
                  <h3 className="exercise-card__name">
                    {exercise.nameCz}
                    {exercise.nameEn && (
                      <span className="exercise-card__name-en"> ({exercise.nameEn})</span>
                    )}
                  </h3>

                  {Illustration && (
                    <div className="exercise-card__illustration-wrap">
                      <Illustration />
                    </div>
                  )}

                  <p className="exercise-card__subtitle">Jak na to</p>
                  <ol className="exercise-card__steps">
                    {exercise.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>

                  <p className="exercise-card__subtitle">Na co si dát pozor</p>
                  <ul className="exercise-card__mistakes">
                    {exercise.mistakes.map((mistake, i) => (
                      <li key={i}>{mistake}</li>
                    ))}
                  </ul>

                  <p className="exercise-card__dose">
                    <span className="exercise-card__dose-label">Kolikrát: </span>
                    {exercise.dose}
                  </p>

                  <a
                    href={youtubeSearchUrl(exercise.videoQuery)}
                    target="_blank"
                    rel="noreferrer"
                    className="exercise-card__video-link"
                  >
                    ▶ Video
                  </a>
                </section>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
