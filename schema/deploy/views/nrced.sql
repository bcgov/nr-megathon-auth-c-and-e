-- Deploy auth-c-and-e:views/nrced_view to pg

BEGIN;

-- {
-- "_id": "609d0130e3e2140022c6f82c",
-- "legislation": {
--   "act": "Environmental Management Act",
--   "regulation": "",
--   "section": "109",
--   "subSection": "",
--   "paragraph": ""
-- },
-- "issuedTo": {
--   "write": [
--     "sysadmin",
--     "admin:nrced"
--   ],
--   "read": [
--     "sysadmin",
--     "admin:nrced",
--     "admin:lng",
--     "admin:bcmi",
--     "public"
--   ],
--   "companyName": "CITY OF KAMLOOPS",
--   "firstName": "",
--   "middleName": "",
--   "lastName": "",
--   "fullName": "CITY OF KAMLOOPS",
--   "dateOfBirth": null,
--   "type": "Company"
-- },
-- "_schemaName": "InspectionNRCED",
-- "_epicProjectId": null,
-- "_sourceRefId": null,
-- "_sourceRefNrisId": 168627,
-- "_sourceRefAgriMisId": null,
-- "_sourceRefAgriCmdbId": null,
-- "_sourceRefStringId": null,
-- "_epicMilestoneId": null,
-- "_master": "609d0130e3e2140022c6f82e",
-- "read": [
--   "sysadmin",
--   "admin:nrced",
--   "admin:lng",
--   "admin:bcmi",
--   "public"
-- ],
-- "write": [
--   "sysadmin",
--   "admin:nrced"
-- ],
-- "recordName": "Inspection - Organic Matter Recycling Regulation - 168627",
-- "recordType": "Inspection",
-- "dateIssued": "2021-05-03T07:00:00.000Z",
-- "issuingAgency": "Environmental Protection Division",
-- "author": "Environmental Protection Division",
-- "legislationDescription": "Inspection to verify compliance with regulatory requirement.",
-- "projectName": "",
-- "location": "KAMLOOPS",
-- "centroid": [
--   -120.3773,
--   50.698
-- ],
-- "outcomeStatus": "",
-- "outcomeDescription": "Compliant - Notice",
-- "documents": [
--   "609d012fe3e2140022c6f82a"
-- ],
-- "summary": "",
-- "dateAdded": "2021-05-13T10:36:32.006Z",
-- "dateUpdated": null,
-- "datePublished": "2021-05-13T10:36:32.006Z",
-- "updatedBy": "",
-- "sourceDateAdded": null,
-- "sourceDateUpdated": null,
-- "sourceSystemRef": "nris-epd",
-- "__v": 0
-- },


  create view ams_nrced.nrced as (
    with x as (
      select record from ams_nrced.nrced_json
    )
    select
       record -> 'issuedTo' ->> 'companyName' as company_name,
       record -> 'issuedTo' ->> 'fullName' as full_name,
       record -> '_epicProjectId' as epic_project_id,
       (record ->> '_sourceRefNrisId')::int as nris_id,
       record ->> 'recordName' as name,
       record ->> 'recordType' as type,
       (record ->> 'dateIssued')::timestamptz as date_issued

    from x
 );

COMMIT;
