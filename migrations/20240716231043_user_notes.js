module.exports = {
  name: 'user_notes',

  /**
   * Applies the migration
   * @param {import('pg').Pool} pool
   */
  apply: async function (pool) {
    await pool.query(`

    CREATE TABLE public.user_notes (
      id bigserial NOT NULL,
      "text" text NOT NULL,
      user_id int4 NOT NULL,
      verse_id int4 NULL,
      fathers_id int4 NULL,
      book_title text NOT NULL,
      chapter_number int2 NOT NULL,
      verse_number int2 NOT NULL,
      CONSTRAINT user_notes_pkey PRIMARY KEY (id)
);
    ALTER TABLE public.user_notes ADD CONSTRAINT user_notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
    `)
  },

  /**
   * Reverts the migration
   * @param {import('pg').Pool} pool
   */
  revert: async function (pool) {
    await pool.query(`DROP TABLE public.user_notes`)
  }
}