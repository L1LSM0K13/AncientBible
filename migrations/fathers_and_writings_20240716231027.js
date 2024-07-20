module.exports = {
  name: 'fathers_and_writings',

  /**
   * Applies the migration
   * @param {import('pg').Pool} pool
   */
  apply: async function (pool) {
    await pool.query(`

    CREATE TABLE public.fathersandwritings (
      id bigserial NOT NULL,
      book text NULL,
      chapter_number int4 NULL,
      text_content text NULL,
      CONSTRAINT fathersandwritings_pkey PRIMARY KEY (id)
    );`)
  },

  /**
   * Reverts the migration
   * @param {import('pg').Pool} pool
   */
  revert: async function (pool) {
    await pool.query(`DROP TABLE fathersandwritings`)

  }
}

