-- Revert auth-c-and-e:table/nris_ams from pg

BEGIN;

drop table ams_nrced.nris_ams;

COMMIT;
