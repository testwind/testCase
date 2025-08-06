create table if not exists wjtest.tbl_caregiver
(
    profile_id       varchar(255) not null
        -- primary key
        ,
    caregiver_id     varchar(255) not null,
    agency_id        varchar(255) not null,
    external_id      varchar(255) null,
    locations_id     varchar(255) null,
    first_name       varchar(255) null,
    last_name        varchar(255) null,
    email            varchar(255) null,
    phone_number     varchar(255) null,
    gender           char         null,
    birthday_date    date         null,
    onboarding_date  date         null,
    applicant        tinyint(1)   null,
    applicant_status tinyint      null comment '0-""
1-New Applicant
2-Not hired
3-Application Completed
4-Hired
5-Complete orientation/training
6-Paper work received
7-Interview Scheduled
8-Interview completed
9-Offer of hiring given
10-Passed Phone Screen
11-Conditional offer given
12-Passed reference check
13-Passed background check
14-Passed skills screening test',
    status           tinyint(1)   null comment 'True=active
False=deactivated'
-- ,
--     constraint tbl_caregiver_pk
--         unique (agency_id, caregiver_id),
--     constraint tbl_caregiver_tbl_agency_agency_id_fk
--         foreign key (agency_id) references wjtest.tbl_agency (agency_id),
--     constraint tbl_caregiver_tbl_location_locations_id_fk
--         foreign key (locations_id) references wjtest.tbl_location (locations_id)
);