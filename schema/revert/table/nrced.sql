-- Revert auth-c-and-e:table/nrced from pg

BEGIN;

drop table ams_nrced.nrced_json;

COMMIT;
