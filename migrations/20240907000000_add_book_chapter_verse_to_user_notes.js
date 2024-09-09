module.exports = {
  name: 'add_book_chapter_verse_to_user_notes',

  /**
   * Applies the migration
   * @param {import('pg').Pool} pool
   */
  apply: async function (pool) {
    await pool.query(`
    ALTER TABLE public.user_notes
    ADD COLUMN book_title VARCHAR(255),
    ADD COLUMN chapter_number INTEGER,
    ADD COLUMN verse_number INTEGER;
    `)
  },

  /**
   * Reverts the migration
   * @param {import('pg').Pool} pool
   */
  revert: async function (pool) {
    await pool.query(`
    ALTER TABLE public.user_notes
    DROP COLUMN book_title,
    DROP COLUMN chapter_number,
    DROP COLUMN verse_number;
    `)
  }
}
