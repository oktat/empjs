create database empjs
character set utf8
collate utf8_hungarian_ci;

grant all privileges
on empjs.*
to empjs@localhost
identified by 'titok';
