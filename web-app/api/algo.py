import mysql.connector
from config import gender_weight, age_weight

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password",
    database="instagram"
)

cursor = db.cursor()

# intialise the scores to 0 for all categories that are in db
def init_category_scores(category_scores):
    # get categories from db
    query = "SELECT c.name FROM categories c"
    cursor.execute(query)
    category_names = cursor.fetchall()
    # initialise the categories to have scores 0
    # db result has the shape [[category_name_1], [category_name_2], ...]
    for cat_name in category_names:
        category_scores[cat_name[0]] = 0

# add the number of likes to the category scores 
# categories: [[category_name, overall_likes, likes_in_last_scroll], ['fashion', 3, 2], ['sports', 4, 0]],
# category_scores: {category_name: current_score}  
def add_category_scores(categories, category_scores):
    # add the given category scores to the dictionary
    for cat in categories:
        category_name = cat[0]
        overall_likes = cat[1]
        momentum = cat[2]
        # we assume category_scores was initialised with all categories in the db 
        if category_name in category_scores:
            category_scores[category_name] += (overall_likes + momentum)
        else: 
            print("Error: unknown category name")
    
# add a constant to score of each category matching the given gender
def add_gender_scores(gender, category_scores):
    # get categories for the given gender
    query = f"SELECT c.name FROM categories c WHERE c.gender={gender}"
    cursor.execute(query)
    category_names = cursor.fetchall()
    # add the constant to 
    # db result has the shape [[category_name_1], [category_name_2], ...]
    for cat_name in category_names:
        # we assume category_scores was initialised with all categories from db                                              
        if cat_name[0] in category_scores:
            category_scores[cat_name[0]] += gender_weight
        else: 
            print("Error: unknown category name")

# add a constant to score of each category matching the given gender
def add_age_scores(age, category_scores):
    # get categories for the given gender
    query = f"SELECT c.name FROM categories c WHERE c.age={age}" # not gonna work because age is a number and there are ranges in db
    cursor.execute(query)
    category_names = cursor.fetchall()
    # add the constant to 
    # db result has the shape [[category_name_1], [category_name_2], ...]
    for cat_name in category_names:
        # we assume category_scores was initialised with all categories from db                                              
        if cat_name[0] in category_scores:
            category_scores[cat_name[0]] += age_weight
        else: 
            print("Error: unknown category name")