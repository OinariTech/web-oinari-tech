const TILE = 18.4;
const GAP = 3.2;
const RADIUS = 6.4;

/**
 * Puzzlio's in-app wordmark glyph, reproduced from
 * https://github.com/Nf07-yuma/game-puzzlio `lib/widgets/app_mark.dart`:
 * four rounded tiles in the app's per-game accent colors.
 */
export function PuzzlioMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x={0} y={0} width={TILE} height={TILE} rx={RADIUS} fill="#DC9A34" />
      <rect
        x={TILE + GAP}
        y={0}
        width={TILE}
        height={TILE}
        rx={RADIUS}
        fill="#3E7CA6"
      />
      <rect
        x={0}
        y={TILE + GAP}
        width={TILE}
        height={TILE}
        rx={RADIUS}
        fill="#5F9A52"
      />
      <rect
        x={TILE + GAP}
        y={TILE + GAP}
        width={TILE}
        height={TILE}
        rx={RADIUS}
        fill="#E85A41"
      />
    </svg>
  );
}
