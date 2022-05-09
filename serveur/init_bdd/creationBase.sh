# mongoimport --uri mongodb+srv://test:test@cluster0.errvb.mongodb.net/SUPERRECETTES --collection utilisateurs --file utilisateurs.json --jsonArray
# mongoimport --uri mongodb+srv://test:test@cluster0.errvb.mongodb.net/SUPERRECETTES --collection produits --file produits.json --jsonArray
# mongoimport --uri mongodb+srv://test:test@cluster0.errvb.mongodb.net/SUPERRECETTES --collection recettes --file recettes.json --jsonArray
# mongoimport --uri mongodb+srv://test:test@cluster0.errvb.mongodb.net/SUPERRECETTES --collection avis --file avis.json --jsonArray

# mongoimport --db SUPERRECETTES --collection utilisateurs --file utilisateurs.json --jsonArray --drop
# mongoimport --db SUPERRECETTES --collection produits --file produits.json --jsonArray --drop
mongoimport --db SUPERRECETTES --collection recettes --file recettes.json --jsonArray #--drop
# mongoimport --db SUPERRECETTES --collection avis --file avis.json --jsonArray --drop