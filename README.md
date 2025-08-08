# testCase

I just study TypeScript for 1 day.
The test case is not complete now.
I will update it later.
2025-08-06

## prepar sample data
csv data files are in testCase/data_zip/csv.tgz.
Upack csv files to /data/ folder.

```sh
./unpack_csv.sh

# tar -xzf ./data_zip/csv.tgz -C ./data/

```

## prepare mysql
```shell
mysql_path=/data/data2/mysql

sudo mkdir -p ${mysql_path}/conf/conf.d/
sudo mkdir -p ${mysql_path}/conf/mysql.conf.d/
sudo mkdir -p ${mysql_path}/logs/
sudo mkdir -p ${mysql_path}/data/
sudo chmod 777 -R ${mysql_path}/conf/
sudo chmod 644 ${mysql_path}/conf/my.cnf

sudo vi ${mysql_path}/conf/my.cnf

chmod 777 -R ${mysql_path}/conf/
chmod 644 ${mysql_path}/conf/my.cnf

sudo docker run -d -p 23306:3306 --name mysql \
-v ${mysql_path}/conf:/etc/mysql \
-v ${mysql_path}/logs:/var/log/mysql \
-v ${mysql_path}/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:5.7
```

## run import data

run testCase/src/main.ts

Import speed is slow with primary key in tables.
I removed primary key and foreign key in tables for testing.


https://raw.githubusercontent.com/testwind/testCase/main/README.md

![This is a svg](https://g.gravizo.com/svg/custom_mark12?https%3A%2F%2Fraw.githubusercontent.com%2Ftestwind%2FtestCase%2Fmain%2FREADME.md)


<details>
<summary></summary>
custom_mark12
@startuml

class Franchisors {
  +franchisor_id: INT
  franchisor_name: VARCHAR
}

class Agencies {
  +agency_id: INT
  franchisor_id: INT
}

class Locations {
  +location_id: INT
  address: VARCHAR
  city: VARCHAR
  state: VARCHAR
  zip: VARCHAR
}

class Caregivers {
  +caregiver_id: INT
  profile_id: INT
  applicant_status: VARCHAR
  status: VARCHAR
}

class CareLogs {
  +carelog_id: INT
  parent_id: INT
  start_datetime: DATETIME
  end_datetime: DATETIME
  clock_in_actual_datetime: DATETIME
  clock_out_actual_datetime: DATETIME
  clock_in_method: INT
  clock_out_method: INT
  status: INT
  split: BOOLEAN
  general_comment_char_count: INT
}

class OvertimeRecords {
  +overtime_id: INT
  start_time: DATETIME
  end_time: DATETIME
  hours: DECIMAL
}

Franchisors "1" -- "N" Agencies : has
Agencies "1" -- "1" Locations : located_at
Agencies "1" -- "N" Caregivers : employs
Caregivers "1" -- "N" CareLogs : logs
Caregivers "1" -- "N" OvertimeRecords : works
CareLogs "1" -- "N" CareLogs : parent_child

@enduml
custom_mark12
</details>


```