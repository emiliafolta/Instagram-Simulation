import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password",
    database="instagram"
)

cursor = db.cursor()

drop_post_table = "DROP TABLE Post"
drop_user_table = "DROP TABLE User"

# Drop tables (in the right order)
cursor.execute(drop_post_table)
cursor.execute(drop_user_table)

create_user_table = """CREATE TABLE User (
    id bigint NOT NULL,
    username varchar(50) NOT NULL,
    name varchar(50),
    biography varchar(250), 
    profile_picture_url varchar(1000),
    followers_count int,
    follows_count int,
    media_count int,
    PRIMARY KEY (id)
)"""


# media_product_type: AD, FEED, STORY or REELS.
# media_type: CAROUSEL_ALBUM, IMAGE, or VIDEO.
create_post_table = """CREATE TABLE Post (
    id bigint NOT NULL,
    userID bigint NOT NULL,
    caption varchar(1000),
    like_count int,
    comments_count int,
    media_product_type varchar(50),
    media_type varchar(50),
    media_url varchar(1000),
    timestamp varchar(50),
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES User(id)
)"""

# Create tables (in the right order)
cursor.execute(create_user_table)
cursor.execute(create_post_table)
