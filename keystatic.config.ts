import { collection, config, fields } from '@keystatic/core';

/**
 * Keystatic — the blog editor at /keystatic.
 *
 * Posts stay what they always were: MDX files in content/blog/ with the same
 * front matter (title, date, updated, excerpt). The editor only reads and
 * writes those files, so the blog code does not change and every existing post
 * can be edited too.
 *
 * Storage:
 *  - "github" (default in production): the client signs in with her GitHub
 *    account; saving a post commits it to the repository, and Vercel publishes
 *    it about a minute later. Needs the KEYSTATIC_* variables in Vercel.
 *  - "local" (default in `next dev`, or NEXT_PUBLIC_KEYSTATIC_STORAGE=local):
 *    writes straight to the files on disk — for trying the editor out.
 */
const storageKind =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE ??
  (process.env.NODE_ENV === 'production' ? 'github' : 'local');

export default config({
  storage:
    storageKind === 'local'
      ? { kind: 'local' }
      : { kind: 'github', repo: { owner: 'fiodorow-web', name: 'wdobrejformie' } },
  locale: 'pl-PL',
  ui: {
    brand: { name: 'W Dobrej Formie — blog' },
  },
  collections: {
    posts: collection({
      label: 'Wpisy na blogu',
      slugField: 'title',
      path: 'content/blog/*',
      entryLayout: 'content',
      columns: ['title', 'date'],
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Tytuł', validation: { isRequired: true } },
          slug: {
            label: 'Adres wpisu',
            description: 'Końcówka adresu po /blog/. Tworzy się sama z tytułu — zwykle nie trzeba jej zmieniać.',
          },
        }),
        date: fields.date({
          label: 'Data publikacji',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        updated: fields.date({
          label: 'Data ostatniej zmiany',
          description: 'Opcjonalnie — gdy wpis został poprawiony.',
        }),
        excerpt: fields.text({
          label: 'Zajawka',
          description: '1–2 zdania o czym jest wpis. Widać je na liście wpisów i w Google.',
          multiline: true,
          validation: { isRequired: true, length: { min: 20 } },
        }),
        // The post's address on the old WordPress site, on the 28 migrated posts.
        // Not shown in the editor; kept as it is when a post is saved.
        legacyUrl: fields.ignored(),
        content: fields.mdx({
          label: 'Treść',
          options: {
            heading: [2, 3, 4],
            image: { directory: 'public/blog', publicPath: '/blog/' },
          },
        }),
      },
    }),
  },
});
