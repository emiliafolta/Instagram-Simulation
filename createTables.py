import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password",
    database="instagram"
)

cursor = db.cursor()

# drop_posts_table = "DROP TABLE Posts"
# drop_categories_table = "DROP TABLE Categories"

# Drop tables (in the right order)
# cursor.execute(drop_posts_table)
# cursor.execute(drop_categories_table)

create_categories_table = """CREATE TABLE Categories (
    id int NOT NULL,
    name varchar(50) NOT NULL,
    profile_picture_url varchar(1000),
    gender int,
    age_group varchar(50),
    PRIMARY KEY (id)
)"""


# media_product_type: AD, FEED, STORY or REELS.
# media_type: CAROUSEL_ALBUM, IMAGE, or VIDEO.
create_posts_table = """CREATE TABLE Posts (
    id bigint NOT NULL,
    category_id int NOT NULL,
    caption varchar(2500),
    like_count int,
    media_type varchar(50),
    media_name varchar(50),
    location varchar(100),
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
)"""

# Create tables (in the right order)
cursor.execute(create_categories_table)
cursor.execute(create_posts_table)
