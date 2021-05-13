-- Revert auth-c-and-e:table/discharge from pg

BEGIN;

drop table ams_nrced.discharge;

COMMIT;
