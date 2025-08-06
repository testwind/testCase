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


