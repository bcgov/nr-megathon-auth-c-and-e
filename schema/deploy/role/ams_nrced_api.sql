-- Deploy auth-c-and-e:role/ams_nrced_api to pg

BEGIN;


DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles  -- SELECT list can be empty for this
      WHERE  rolname = 'ams_nrced_api') THEN

      CREATE user ams_nrced_api;
   END IF;
END
$do$;
grant usage on schema ams_nrced to ams_nrced_api;
grant select on all tables in schema ams_nrced to ams_nrced_api;
alter default privileges in schema ams_nrced grant select on tables to ams_nrced_api;

COMMIT;
