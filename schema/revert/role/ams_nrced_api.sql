-- Revert auth-c-and-e:role/ams_nrced_api from pg

BEGIN;

drop role ams_nrced_api;

COMMIT;
