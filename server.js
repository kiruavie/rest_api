const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Charge les variables d'environnement à partir du fichier .env

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017";
// Connectez-vous à la base de données MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion à la base de données réussie");
    // Démarrez le serveur une fois connecté à la base de données
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données", error);
  });

// GET: RENVOYER TOUS LES UTILISATEUR
app.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: "une erreur est survenu" });
    });
});

// POST: AJOUTER UN NOUVEL UTILISATEUR À LA BASE DE DONNÉES
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

  user
    .save()
    .then((savedUser) => {
      res.status(201).json(savedUser);
    })
    .catch((error) => {
      res.status(400).json({ error: "erreur d'ajout" });
    });
});

// PUT: MODIFIER UN UTILISATEUR PAR ID
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  User.findByIdAndUpdate(id, { name, email, password }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: "utilisateur introuvable" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: "erreur de mise a jour" });
    });
});

// DELETE: SUPPRIMER UN UTILISATEUR PAR ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.json({ message: "utilisateur enregistrer avec succes" });
      } else {
        res.status(404).json({ error: "utilisateur enregistre avec succes" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: "erreur" });
    });
});
