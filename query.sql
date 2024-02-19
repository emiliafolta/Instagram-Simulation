SELECT categoryID, COUNT(*) AS row_count
FROM `instagram`.`post`
GROUP BY categoryID;