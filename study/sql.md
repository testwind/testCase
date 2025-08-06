CREATE DATABASE `wjtest` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!40100 DEFAULT COLLATE utf8mb4_unicode_ci */;



franchisor_id
agency_id
subdomain
profile_id
caregiver_id
external_id
first_name
last_name
email
phone_number
gender
applicant
birthday_date
onboarding_date
location_name
locations_id
applicant_status
status









ls -l "/mnt/d/0000_opt/take-home assignment/"
cp /mnt/d/0000_opt/take-home\ assignment/*.csv  /mnt/data/mysql/data/wjimport/

ls -l /mnt/data/mysql/data/wjimport

docker exec -it mysql bash


ls -l /var/lib/mysql/wjimport/

mkdir -p /var/lib/mysql-files/

mv /var/lib/mysql/wjimport /var/lib/mysql-files/

ls -l /var/lib/mysql-files/wjimport/

mysql -uwj -p
16


CREATE DATABASE `wjtest` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!40100 DEFAULT COLLATE utf8mb4_unicode_ci */;


use wjtest;

LOAD DATA INFILE '/var/lib/mysql-files/wjimport/caregiver_data_20250415_sanitized_s.csv'
INTO TABLE asd
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA INFILE '/var/lib/mysql-files/wjimport/carelog_data_20250415_sanitized_s.csv'
INTO TABLE carelog
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;




create table import_caregiver_s
(
    franchisor_id    VARCHAR(255) null,
    agency_id        VARCHAR(255) null,
    subdomain        VARCHAR(255) null,
    profile_id       VARCHAR(255) null,
    caregiver_id     VARCHAR(255) null,
    external_id      VARCHAR(255) null,
    first_name       VARCHAR(255) null,
    last_name        VARCHAR(255) null,
    email            VARCHAR(255) null,
    phone_number     VARCHAR(255) null,
    gender           VARCHAR(255) null,
    applicant        VARCHAR(255) null,
    birthday_date    VARCHAR(255) null,
    onboarding_date  VARCHAR(255) null,
    location_name    VARCHAR(255) null,
    locations_id     VARCHAR(255) null,
    applicant_status VARCHAR(255) null,
    status           VARCHAR(255) null
)




create table carelog
(
franchisor_id VARCHAR(255) null,
agency_id VARCHAR(255) null,
carelog_id VARCHAR(255) null,
caregiver_id VARCHAR(255) null,
parent_id VARCHAR(255) null,
start_datetime VARCHAR(255) null,
end_datetime VARCHAR(255) null,
clock_in_actual_datetime VARCHAR(255) null,
clock_out_actual_datetime VARCHAR(255) null,
clock_in_method	 VARCHAR(255) null,
clock_out_method VARCHAR(255) null,
status VARCHAR(255) null,
split VARCHAR(255) null,
documentation text null,
general_comment_char_count VARCHAR(255) null
)




LOAD DATA INFILE '/var/lib/mysql-files/wjimport/caregiver_data_20250415_sanitized.csv'
INTO TABLE caregiver
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

Query OK, 1004888 rows affected (37.31 sec)
Records: 1004888  Deleted: 0  Skipped: 0  Warnings: 0


LOAD DATA INFILE '/var/lib/mysql-files/wjimport/carelog_data_20250415_sanitized.csv'
INTO TABLE carelog
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

Query OK, 308602 rows affected (23.49 sec)
Records: 308602  Deleted: 0  Skipped: 0  Warnings: 0




select count(distinct franchisor_id) from caregiver;
32

select count(distinct agency_id) from caregiver;
315

select count(distinct subdomain) from caregiver;
315

select count(distinct profile_id) from caregiver;
1004888


select count(distinct caregiver_id ) from caregiver;
1004888

select count(distinct external_id  ) from caregiver;
167893


select count(distinct phone_number  ) from caregiver;
932143

"",72705
0030224842,2
0089051780,2
0616268433,2
0687796366,2
0711470210,2



select *  from caregiver where phone_number in ('0030224842','0089051780','0616268433') ;
只有40个=2


select count(distinct gender  ) from caregiver;
3

select count(distinct applicant)  from caregiver;
2
True
False



select count(distinct location_name)  from caregiver;
578


select count(distinct locations_id)  from caregiver;
602

select count(distinct location_name,locations_id)  from caregiver;
602



select  locations_id, count(locations_id) bb  from caregiver  as aa
group by locations_id order by bb desc
;
0,579489
8856,22583
13428,20014
13435,11747
6493,11359
15635,7317
9545,7190



select  location_name, count(location_name) bb  from caregiver  as aa
group by location_name order by bb desc
;
None,579489
9999 Detroit and Surrounding Areas,22583
Central Houston,20014
Chagrin Falls ,11747
Always Best Care - South Bay,11359
ADMIN,7551
Beaumont,7317
Chestnut Hill,7217






select aa.location_name, count(aa.locations_id) bb from
( select distinct location_name,locations_id  from caregiver ) as aa
group by aa.location_name order by bb desc;
ADMIN,4
Office Staff,3
Delaware County,3
Blue Bell,2
Chestnut Hill,2
Knox County,2
000,2
Virginia Beach,2
Baltimore,2
Charleston,2
Mainline,2
Bucks County,2
Nursing,2
Lehigh Valley ,2
Pleasanton,2
Kern County,2
Sacramento,2
Franklin,2
"",2
OFFICE,2
826,1




select count(distinct applicant_status)  from caregiver;
15
New Applicant
Not hired
Application Completed
Hired
Complete orientation/training
Paper work received
Interview Scheduled
Interview completed
""
Offer of hiring given
Passed Phone Screen
Conditional offer given
Passed reference check
Passed background check
Passed skills screening test



select count(distinct status)  from caregiver;
2
True=active
False=deactivated
