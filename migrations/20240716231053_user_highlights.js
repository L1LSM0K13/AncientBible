module.exports = {
  name: 'user_highlights',

  /**
   * Applies the migration
   * @param {import('pg').Pool} pool
   */
  apply: async function (pool) {
    await pool.query(`

    CREATE TABLE public.user_highlights (
      id bigserial NOT NULL,
      user_id int8 NOT NULL,
      verse_id int4 NULL,
      fathers_id int4 NULL,
      highlight_color text NOT NULL,
      CONSTRAINT user_highlights_pkey PRIMARY KEY (id)
);
    ALTER TABLE public.user_highlights ADD CONSTRAINT user_highlights_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
    `)
  },

  /**
   * Reverts the migration
   * @param {import('pg').Pool} pool
   */
  revert: async function (pool) {
    await pool.query(`DROP TABLE user_highlights`)
  }
}