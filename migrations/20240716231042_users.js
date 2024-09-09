module.exports = {
  name: 'users',

  /**
   * Applies the migration
   * @param {import('pg').Pool} pool
   */
  apply: async function (pool) {
    await pool.query(`

    CREATE TABLE public.users (
      id bigserial NOT NULL,
      "name" varchar(200) NOT NULL,
      email varchar(200) NOT NULL,
      "password" varchar(200) NOT NULL,
      is_verified bool DEFAULT false NULL,
      email_token text NULL,
      passwordreset_token text NULL,
      CONSTRAINT users_email_key UNIQUE (email),
      CONSTRAINT users_pkey PRIMARY KEY (id)
    );`)

  },

  /**
   * Reverts the migration
   * @param {import('pg').Pool} pool
   */
  revert: async function (pool) {
    await pool.query(`DROP TABLE public.users;`)

  }
}