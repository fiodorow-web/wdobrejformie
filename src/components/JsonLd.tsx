/**
 * Emits a JSON-LD block.
 *
 * The payload is built by our own code from typed content modules — never from
 * user input — so serialising it into a script tag is safe. `<` is escaped
 * anyway so a stray sequence in copy can never close the tag early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
