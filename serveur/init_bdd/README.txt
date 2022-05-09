Afin de pouvoir rechercher des mots parmi des groupe de mots, on commencera d'abord par créer un index à partir du champ sur lequel aura lieu la recherche :

db.recettes.createIndex({nom_du_champ:"text"})

On ajoute ensuite des documents dans la collection (recettes pour cet exemple) avec un attribut du même nom que celui du champ utilisé pour créer l'index.

db.articles.insertMany( [
	{ nom: "coffee", ... },
	{ nom: "Coffee Shopping", ... },
	{ nom: "Baking a cake", ...  },
	{ nom: "baking", ... },
	{ nom: "Café Con Leche", ... },
	{ nom: "Couscous royal", ... },
	{ nom: "coffee and cream", ... },
	{ nom: "Cafe con Leche", ... }
] )


On peut enfin effectuer des recherches plus souples :

db.recettes.find({$text : {$search:"royal"}})

Avec
{
	$text: {
		$search: <string>,
		$language: <string>,
		$caseSensitive: <boolean>,
		$diacriticSensitive: <boolean>
	}
}