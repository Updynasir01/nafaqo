/** Renders text, showing any **starred** phrases in the given class. */
export default function Highlight({ text, className }: { text: string; className: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className={className}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
