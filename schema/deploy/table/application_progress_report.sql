-- Deploy auth-c-and-e:table/application_progress_report to pg

BEGIN;

create table ams_nrced.application_progress_report(
  job_type varchar,
  tracking_number int,
  authorization_number int,
  job_status varchar,
  sap_phase varchar,
  received_date date,
  created_date timestamptz,
  completed_date timestamptz,
  authorization_type varchar,
  administrative_area varchar,
  amendment_type varchar,
  latitude decimal,
  longitude decimal,
  application_type varchar,
  transaction_type varchar,
  complexity varchar,
  intake decimal,
  preliminary_application decimal,
  applicant_work_window decimal,
  in_screening decimal,
  review_and_decision decimal,
  processing decimal,
  days_in_process decimal,
  withdrawn_date decimal
);

\COPY ams_nrced.application_progress_report(job_type,tracking_number,authorization_number,job_status,sap_phase,received_date,created_date,completed_date,authorization_type,administrative_area,amendment_type,latitude,longitude,application_type,transaction_type,complexity,intake,preliminary_application,applicant_work_window,in_screening,review_and_decision,processing,days_in_process,withdrawn_date) FROM '../data/application_phase_progress_report.csv' WITH DELIMITER ',' CSV HEADER;
update ams_nrced.application_progress_report set longitude = -longitude;

COMMIT;
