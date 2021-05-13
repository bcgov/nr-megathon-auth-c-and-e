-- Revert auth-c-and-e:views/nrced_view from pg

BEGIN;

drop view ams_nrced.nrced;

COMMIT;
