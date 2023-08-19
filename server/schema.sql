create table triveous_db;
use triveous_db;
create table user(uid char(40) primary key,first_Name char(50) not null,Last_Name char(50) not null,email char(100) not null unique, password varchar(150) not null);
create table addresses (uid char(40) not null,contact int(10) unique,country_code char(5) not null, address varchar(1000) not null, pin_code int(10) not null, state varchar(50) not null,city varchar(50) not null,country varchar(50) not null, foreign key (uid) references user(uid));
create table categories(id int primary key auto_increment,category varchar(200) not null unique);
create table products(id int primary key auto_increment,category_id int not null,title varchar(1000),description varchar(10000) not null,price float(10,1) not null,discountPercentage float(10,1) default 0,rating enum('1','2','3','4','5') default '1',stock int not null default 1,brand char(50) not null,thumbnail varchar(1000),images json,foreign key(category_id) references categories(id));
create table cart(id bigint primary key auto_increment,userId char(40) not null,addedAt datetime not null default current_timestamp,productId int not null,quantity int not null,createdAtTimeStamp bigint not null, foreign key (userId) references user(uid),foreign key (productId) references products(id));
create table orders(id bigint primary key auto_increment,userId char(40) not null,createdAt datetime not null default current_timestamp,products json not null,orderStatus enum("new","confirmed","cancelled") not null default "new",createdAtTimeStamp bigint not null,foreign key (userId) references user(uid));
-- for indexing 
create unique index user_email on user(email);
create index category_products on products(category_id);
create index user_cats on cart(userId);
create index user_orders on orders(userId);

-- event to confirm order
create event orderUpdate on schedule every 6 hour do update triveous_db.orders set orderStatus="confirmed" where orderStatus="new";