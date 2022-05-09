var util= require('util');
var encoder = new util.TextEncoder('utf-8');

const express = require('express');
const app     = express();
app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.use(function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Content-type', 'application/json');
    next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectId;
const url         = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if(!err) {
        console.log("Connexion à MongoDB OK");
    }
    else {
        console.log("Erreur de connexion à MongoDB");
    }
    let db = client.db("SUPERRECETTES");

    /**
     * Des recettes par défaut (spécialement pour l'acceuil)
     */
    app.get("/default", (req,res) => {
        console.log("/default (pour les recettes par défaut)");
        try {
            db.collection("recettes")
            .find()
            .toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /default (pour les recettes par défaut) : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /**
     * Vérification des informations saisies lors de l'inscription (Pseudo, Email)
     */
    app.post("/inscription/verification", (req,res) => {
        console.log("/inscription/verificationn avec "+JSON.stringify(req.body));
        try {
            db.collection("utilisateurs")
            .find(req.body)
            .toArray((err, documents) => {
                if (documents.length == 1)
                    res.end(JSON.stringify({"resultat": 1, "message": "Authentification réussie"}));
                else res.end(JSON.stringify({"resultat": 0, "message": "Email et/ou mot de passe incorrect"}));
            });
        } catch (e) {
            res.end(JSON.stringify({"resultat": -1, "message": e}));
        }
    });

    /**
     * Inscription d'un utilisateur
     */
    app.post("/inscription", (req,res) => {
        console.log("/inscrpition avec "+JSON.stringify(req.body)); 
        try {
            // revérifier si les données sont présentets dans la bdd ?
            db.collection("utilisateurs")
            .insertOne(req.body, (err, result) => {
                if(err) {
                    console.log("erreur : " + err);
                    res.end(JSON.stringify({"resultat": 0, "data":err}));
                }
                else{
                    console.log("result : " + result);
                    res.end(JSON.stringify({"resultat": 1, "data":result}));
                }
            });
        } catch(e) {
            console.log("Erreur sur /inscrpition avec "+JSON.stringify(req.body)+" : " + e);
            res.end(JSON.stringify({"resultat": -1, "data":e}));
        }
    });

    /**
     * Vérification des identifiants dans le corps de la requête pour une connexion
     */
    app.post("/connexion", (req,res) => {
        console.log("/connexion avec "+JSON.stringify(req.body));
        try {
            db.collection("utilisateurs")
            .find(req.body)
            .toArray((err, documents) => {
                res.end(JSON.stringify({"resultat": documents.length, "message": "Authentification réussie"}));
            });
        } catch (e) {
            res.end(JSON.stringify({"resultat": -1, "message": e}));
        }
    });

    /**
     * Fournir à un client ses informations personnelles (pour une mise à jour ?).
     */
    app.post("/moncompte", (req,res) => {
        console.log("/moncompte avec "+JSON.stringify(req.body));
        try {
            db.collection("utilisateurs")
            .find(req.body)
            .toArray((err, documents) => {
                if (documents.length == 1) {
                    console.log("=========================="+documents);
                    res.end(JSON.stringify({"resultat": documents}));
                }
                else 
                    res.end(JSON.stringify({"resultat": []}));
            });
        } catch(e) {
            console.log("Erreur sur /moncompte avec "+JSON.stringify(req.body)+" : " + e);
            res.end({"resultat": JSON.stringify([])});
        }
    });

    /**
     * Mise à jour des informations du compte
     */
    app.put("/moncompte/edit/:strObjectId",(req, res)=>{
        db.collection("utilisateurs").updateOne({_id:new ObjectID(req.params.strObjectId)}, {$set:req.body}, function (err, res_) {
            if(err){
                console.log("[ERROR]============== "+err);
                res.end(JSON.stringify({"ok": false}));
            } 
            else{
                console.log("[OK]   ============== compte mis à jour")
                res.end(JSON.stringify({"ok": true }));
            }
        })
    });

    /**
     * Recherche complexe
    */
    app.post("/recherche", (req,res) => {
        console.log("/recherche avec "+JSON.stringify(req.body));
        try {
            db.collection("recettes")
            .find(req.body)
            .toArray((err, documents) => {
                res.end(JSON.stringify({"taille": documents.length, "data": documents}));
            });
        } catch (e) {
            res.end(JSON.stringify({"taille": -1, "data": []}));
        }
    });

    /**
     * Fournir à un utilisateur connecté ses recettes
     */
    app.post("/mesrecettes", (req,res) => {
        console.log("/mesrecettes avec "+JSON.stringify(req.body));
        try {
            db.collection("recettes")
            .find(req.body)
            .toArray((err, documents) => {
                res.end(JSON.stringify({"resultat": documents}));
            });
        } catch(e) {
            console.log("Erreur sur /mesrecettes avec "+JSON.stringify(req.body)+" : " + e);
            res.end(JSON.stringify({"resultat": []}));
        }
    });

    /**
     * Ajouter une nouvelle recette
     */
    app.post("/mesrecettes/creation", (req,res) => {
        console.log("/mesrecettes/creation avec "+JSON.stringify(req.body)); 
        try {
            db.collection("recettes")
            .insertOne(req.body, (err, result) => {
                if(err) {
                    console.log("erreur : " + err);
                    res.end(JSON.stringify({"resultat": false, "data":err}));
                }
                else{
                    console.log("result : " + result);
                    res.end(JSON.stringify({"resultat": true, "data":result}));
                }
            });
        } catch(e) {
            console.log("Erreur sur /mesrecettes/creation avec "+JSON.stringify(req.body)+" : " + e);
            res.end(JSON.stringify({"resultat": []}));
        }
    });

    /**
     * Obtenir les avis d'une recette par son identifiant
     */
    app.get("/avis/:recette_id", (req,res) => {
        let param_recette_id = req.params.recette_id;
        try {
            console.log(`/avis/${param_recette_id}`);
            db.collection("avis")
            .find({recette_id:param_recette_id})
            .toArray((err, documents) => {
                res.end(JSON.stringify({taille:documents.length, data:documents}));
            });
        } catch(e) {
            console.log(`Erreur sur /avis/${param_recette_id} : ${e}`);
            res.end(JSON.stringify({taille:-1, data:[]}));
        }
    });

    /**
     * Enregistrer avis utilisateur
     */
     app.post("/avis/enregistrement", (req,res) => {
        try {
            console.log("/avis/enregistrement avec "+JSON.stringify(req.body)); 
            db.collection("avis")
            .insertOne(req.body, (err, result) => {
                if(err) {
                    console.log("erreur : " + err);
                    res.end(JSON.stringify({"resultat": 0, "data":err}));
                }
                else{
                    console.log("result : " + result);
                    res.end(JSON.stringify({"resultat": 1, "data":result}));
                }
            });
        } catch(e) {
            console.log("Erreur sur /avis/enregistrement avec "+JSON.stringify(req.body)+" : " + e);
            res.end(JSON.stringify({"resultat": -1, "data":e}));
        }
    });


    // POURSUIVRE LE TEST DE JOINTURE
    // app.post("/test", (req,res) => {
    //     try {
    //         db.collection("utilisateurs")
    //         .aggregate([
    //             { $lookup:
    //                {
    //                  from: 'recettes',
    //                  localField: 'email',
    //                  foreignField: 'email',
    //                  as: 'allrecettes'
    //                }
    //              }
    //         ])
    //         .toArray((err, documents) => {
    //             res.end(JSON.stringify({"taille": documents.length, "data": documents}));
    //         });
    //     } catch (e) {
    //         res.end(JSON.stringify({"taille": -1, "data": []}));
    //     }
    // });


















    /**
     * Obtenir une recette par son identifiant
     */
    // app.get("/recette/:strObjectId", (req,res) => {
    //     console.log("/recette/"+req.params.strObjectId);
    //     try {
    //         db.collection("recettes")
    //         .find({_id:new ObjectID(req.params.strObjectId)})
    //         .toArray((err, documents) => {
    //             res.end(JSON.stringify(documents));
    //         });
    //     } catch(e) {
    //         console.log("Erreur sur /recette/"+req.params.strObjectId+" : " + e);
    //         res.end(JSON.stringify([]));
    //     }
    // });

    // app.get("/produits", (req,res) => {
    //     console.log("/produits");
    //     try {
    //         db.collection("produits").find().toArray((err, documents) => {
    //             res.end(JSON.stringify(documents));
    //         });
    //     } catch(e) {
    //         console.log("Erreur sur /produits : " + e);
    //         res.end(JSON.stringify([]));
    //     }
    // });

    // Recettes d'un utilisateur (si un utilisateur souhaite afficher ses recettes)
    // app.get("/mesrecettes/:utilisateur", (req,res) => {
    //     let utilisateur = req.params.utilisateur;
    //     console.log("/mesrecettes/"+utilisateur);
    //     try {
    //         db
    //         .collection("avis")
    //         .find({email:utilisateur})
    //         .toArray((err, documents) => {
    //             res.end(JSON.stringify({"resultat":documents}));
    //         });
    //     } catch(e) {
    //         console.log("Erreur sur /mesrecettes/"+utilisateur+" : " + e);
    //         res.end(JSON.stringify({"resultat":[]}));
    //     }
    // });

    // Recherche de recettes par mot clé (si un utilisateur souhaite afficher ses recettes)
    // app.get("/recettes/recherche/:keyword", (req,res) => {
    //     let keyword = req.params.keyword;
    //     console.log("/recettes/"+keyword);
    //     try {
    //         db
    //         .collection("recettes")
    //         .find({$text: { $search: keyword, $caseSensitive: false, $diacriticSensitive: false }})
    //         .toArray((err, documents) => {
    //             res.end(JSON.stringify({"taille": documents.length, "data": documents}));
    //         });
    //     } catch(e) {
    //         console.log("Erreur sur /recettes/recherche/"+keyword+" : " + e);
    //         res.end(JSON.stringify({"taille": -1}));
    //     }
    // });
});

var port = 8888;
app.listen(port, () => {
    console.log("Serveur Express ouvert sur le port", port, "...");
});