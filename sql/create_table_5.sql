create table if not exists wjtest.tbl_agency
(
    agency_id     varchar(255) not null
        -- primary key
        ,
    subdomain     varchar(255) null,
    franchisor_id varchar(255) null
--    ,
--    constraint tbl_agency_tbl_franchisor_franchisor_id_fk
--        foreign key (franchisor_id) references wjtest.tbl_franchisor (franchisor_id)
);