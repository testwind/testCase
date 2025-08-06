```sql
drop table if exists wjtest.import_carelog;

create table if not exists wjtest.import_carelog
(
    franchisor_id              varchar(255) null,
    agency_id                  varchar(255) null,
    carelog_id                 varchar(255) null,
    caregiver_id               varchar(255) null,
    parent_id                  varchar(255) null,
    start_datetime             datetime     null,
    end_datetime               datetime     null,
    clock_in_actual_datetime   datetime     null,
    clock_out_actual_datetime  datetime     null,
    clock_in_method            int          null,
    clock_out_method           int          null,
    status                     int          null,
    split                      tinyint(1)   null,
    documentation              text         null,
    general_comment_char_count int          null
);

drop table if exists wjtest.import_caregiver;

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



-- drop table if exists wjtest.tbl_location;

create table if not exists wjtest.tbl_location
(
    locations_id  varchar(255) not null
        -- primary key
        ,
    location_name varchar(255) null
);

-- drop table if exists wjtest.tbl_franchisor;

create table if not exists wjtest.tbl_franchisor
(
    franchisor_id  varchar(255) not null
        -- primary key
        ,
    new_franchisor_name varchar(255) null
);

-- drop table if  exists wjtest.tbl_agency;
create table if not exists wjtest.tbl_agency
(
    agency_id     varchar(255) not null
        primary key,
    subdomain     varchar(255) null,
    franchisor_id varchar(255) null
--    ,
--    constraint tbl_agency_tbl_franchisor_franchisor_id_fk
--        foreign key (franchisor_id) references wjtest.tbl_franchisor (franchisor_id)
);



-- drop table if exists wjtest.tbl_caregiver;
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


-- drop table if exists wjtest.tbl_documentation;

create table if not exists wjtest.tbl_documentation
(
    carelog_id    varchar(255) not null
        -- primary key
        ,
    documentation text         null
);



-- drop table if exists wjtest.tbl_carelog;

create table if not exists wjtest.tbl_carelog
(
    carelog_id                 varchar(255) not null
        primary key,
    caregiver_id               varchar(255) null,
    agency_id                  varchar(255) null,
    parent_id                  varchar(255) null,
    start_datetime             datetime     null,
    end_datetime               datetime     null,
    clock_in_actual_datetime   datetime     null,
    clock_out_actual_datetime  datetime     null,
    clock_in_method            int          null,
    clock_out_method           int          null,
    status                     int          null,
    split                      tinyint(1)   null,
    general_comment_char_count int          null
--    ,
--    constraint tbl_carelog_tbl_carelog_carelog_id_fk
--        foreign key (parent_id) references wjtest.tbl_carelog (carelog_id)
);

```




```sql
-- truncate wjtest.tbl_location;

insert into wjtest.tbl_location (locations_id, location_name)
select distinct locations_id, location_name
from wjtest.import_caregiver
ON DUPLICATE KEY UPDATE location_name = VALUES(location_name);


-- truncate wjtest.tbl_franchisor;

insert into wjtest.tbl_franchisor (franchisor_id, new_franchisor_name)
select distinct franchisor_id, ''
from wjtest.import_caregiver
ON DUPLICATE KEY UPDATE new_franchisor_name = '';


-- truncate wjtest.tbl_agency;

insert into wjtest.tbl_agency (agency_id, subdomain, franchisor_id)
select distinct agency_id, subdomain, franchisor_id
from wjtest.import_caregiver
ON DUPLICATE KEY UPDATE
                     subdomain = VALUES(subdomain),
                     franchisor_id = VALUES(franchisor_id);



insert into wjtest.tbl_documentation (carelog_id, documentation)
select carelog_id, documentation
from wjtest.import_carelog
ON DUPLICATE KEY UPDATE
                     documentation = VALUES(documentation);

```











```sql


insert into wjtest.tbl_caregiver
select profile_id,
       caregiver_id,
       agency_id,
       external_id,
       locations_id,
       first_name,
       last_name,
       email,
       phone_number,
       case
           when lower(trim(gender)) = 'm' then 'M'
           when lower(trim(gender)) = 'f' then 'F'
           else null end,
       case
           when length(trim(birthday_date)) = 19
               then str_to_date(trim(birthday_date), '%Y-%m-%d %H:%i:%s')
           else null end,
       case
           when length(trim(onboarding_date)) = 19
               then str_to_date(trim(onboarding_date), '%Y-%m-%d %H:%i:%s')
           else null end,
       case
           when lower(trim(applicant)) = 'true' then true
           when lower(trim(applicant)) = 'false' then false
           else null end,
       case
           when lower(trim(applicant_status)) = 'new applicant' then 1
           when lower(trim(applicant_status)) = 'not hired' then 2
           when lower(trim(applicant_status)) = 'application completed' then 3
           when lower(trim(applicant_status)) = 'hired' then 4
           when lower(trim(applicant_status)) = 'complete orientation/training' then 5
           when lower(trim(applicant_status)) = 'paper work received' then 6
           when lower(trim(applicant_status)) = 'interview scheduled' then 7
           when lower(trim(applicant_status)) = 'interview completed' then 8
           when lower(trim(applicant_status)) = 'offer of hiring given' then 9
           when lower(trim(applicant_status)) = 'passed phone screen' then 10
           when lower(trim(applicant_status)) = 'conditional offer given' then 11
           when lower(trim(applicant_status)) = 'passed reference check' then 12
           when lower(trim(applicant_status)) = 'passed background check' then 13
           when lower(trim(applicant_status)) = 'passed skills screening test' then 14
           else null end,
       case
           when lower(trim(status)) = 'active' then true
           when lower(trim(status)) = 'deactivated' then false
           else null end
from import_caregiver;







```











```sql








select *
from wjtest.import_caregiver where length( birthday_date) = 0;

select min(length( onboarding_date)), max(length( onboarding_date))
from wjtest.import_caregiver ;

select distinct(applicant_status)
from wjtest.import_caregiver ;
--
0-""
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
14-Passed skills screening test

0-False
1-True


```