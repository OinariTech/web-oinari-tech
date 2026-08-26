export function FoxMark({ className }: { className: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- vector mark; next/image optimization adds no value for SVG
  return <img src="/brand/fox-mark.svg" alt="" className={className} />;
}
