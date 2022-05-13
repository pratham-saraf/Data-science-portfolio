
import pandas as pd
import numpy as np 



def recommender(books):
    liked_books = books
    liked_books = list(map(str,liked_books))
    csv_book_mapping = {}
    
    with open("model/data/book_id_map.csv", "r") as f:
        while True:
            line = f.readline()
            if not line:
                break
            csv_id, book_id = line.strip().split(",")
            csv_book_mapping[csv_id] = book_id

    overlap_users = set()
    with open("model/data/goodreads_interactions.csv", 'r') as f:

        while True:
            line = f.readline()

            if not line:
                break
            user_id, csv_id, _, rating, _ = line.split(",")
            
            if user_id in overlap_users:
                continue

            try:
                rating = int(rating)
            except ValueError:
                continue
            
            book_id = csv_book_mapping[csv_id]
            
            if book_id in liked_books and rating >= 4:
                    overlap_users.add(user_id)
        
    rec_lines = []

    
    with open("model/data/goodreads_interactions.csv", 'r') as f:

        while True:
            line = f.readline()

            if not line:
                break
            user_id, csv_id, _, rating, _ = line.split(",")
            
            if user_id in overlap_users:
                book_id = csv_book_mapping[csv_id]
                rec_lines.append([book_id, rating])

    del overlap_users 
    del csv_book_mapping

    recs = pd.DataFrame(rec_lines, columns=["book_id", "rating"])
    recs["book_id"] = recs["book_id"].astype(str)


    books = pd.read_json("model/data/book.json")
    books["book_id"] = books["book_id"].astype(str)

    all_recs = recs["book_id"].value_counts()

    all_recs = all_recs.to_frame().reset_index()
    all_recs.columns = ["book_id", "book_count"]

    all_recs = all_recs.merge(books, how="inner", on="book_id")



    all_recs["score"] = all_recs["book_count"] * (all_recs["book_count"] / all_recs["ratings"])

    popular_recs = all_recs[all_recs["book_count"] > 150].sort_values("score", ascending=False)
    popular_recs.drop(["book_count","ratings","score"], axis=1, inplace=True)

    result = popular_recs.head(100).to_json(orient="records")

    return result
