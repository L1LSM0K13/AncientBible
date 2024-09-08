module.exports = {
  name: 'bible_eng',

  /**
   * Applies the migration
   * @param {import('pg').Pool} pool
   */
  apply: async function (pool) {
    await pool.query(`

    CREATE TABLE public.bible_eng (
        id serial4 NOT NULL,
        book text NULL,
        chapter_number int4 NULL,
        verse_number int4 NULL,
        is_red bool NULL,
        verse_text text NULL,
        book_order int4 NULL,
        CONSTRAINT bible_eng_pkey PRIMARY KEY (id)
  );`)

  },

  /**
   * Reverts the migration
   * @param {import('pg').Pool} pool
   */
  revert: async function (pool) {
    await pool.query(`DROP TABLE public.bible_eng;`)
  }
}