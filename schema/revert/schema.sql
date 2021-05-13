-- Revert auth-c-and-e:schema from pg

BEGIN;

drop schema ams_nrced;

COMMIT;
