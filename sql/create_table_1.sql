create table if not exists wjtest.import_caregiver
(
    franchisor_id    varchar(255) null,
    agency_id        varchar(255) null,
    subdomain        varchar(255) null,
    profile_id       varchar(255) null,
    caregiver_id     varchar(255) null,
    external_id      varchar(255) null,
    first_name       varchar(255) null,
    last_name        varchar(255) null,
    email            varchar(255) null,
    phone_number     varchar(255) null,
    gender           char      null,
    applicant        tinyint(1)   null comment 'True/False',
    birthday_date    datetime     null,
    onboarding_date  datetime     null,
    location_name    varchar(255) null,
    locations_id     varchar(255) null,
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
);