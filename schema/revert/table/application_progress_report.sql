-- Revert auth-c-and-e:table/application_progress_report from pg

BEGIN;

drop table ams_nrced.application_progress_report;

COMMIT;
