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
