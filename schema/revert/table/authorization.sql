-- Revert auth-c-and-e:table/authorization from pg

BEGIN;

drop table ams_nrced.authorization;

COMMIT;
