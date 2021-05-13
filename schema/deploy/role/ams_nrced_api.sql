-- Deploy auth-c-and-e:role/ams_nrced_api to pg

BEGIN;

create user ams_nrced_api;
grant usage on schema ams_nrced to ams_nrced_api;
grant select on all tables in schema ams_nrced to ams_nrced_api;
alter default privileges in schema ams_nrced grant select on tables to ams_nrced_api;

COMMIT;
