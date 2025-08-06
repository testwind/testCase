create table if not exists wjtest.tbl_documentation
(
    carelog_id    varchar(255) not null
        -- primary key
        ,
    documentation text         null
);