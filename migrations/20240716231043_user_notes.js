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
      CONSTRAINT user_notes_pkey PRIMARY KEY (id)
);

    ALTER TABLE public.user_notes ADD CONSTRAINT user_notes_fathers_id_fkey FOREIGN KEY (fathers_id) REFERENCES public.fathersandwritings(id);
    ALTER TABLE public.user_notes ADD CONSTRAINT user_notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
    ALTER TABLE public.user_notes ADD CONSTRAINT user_notes_verse_id_fkey FOREIGN KEY (verse_id) REFERENCES public.bible_eng(id);
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