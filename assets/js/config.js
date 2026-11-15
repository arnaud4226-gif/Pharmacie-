/*
 * Configuration du site — c'est le seul fichier à modifier pour les infos pratiques.
 * Les valeurs marquées "À VÉRIFIER" ou "À COMPLÉTER" doivent être confirmées avant mise en ligne.
 */
window.PHARMACIE = {
  nom: "Pharmacie de la Grande Armée",
  adresse: "6 rue de la Grande Armée",
  codePostal: "13001",
  ville: "Marseille",
  telephone: "04 91 62 36 31",          // À VÉRIFIER (trouvé dans des annuaires en ligne)
  telephoneIntl: "+33491623631",
  email: "pharmacie@grande-armee.com",   // adresse figurant sur la plaquette PDA

  // Horaires (affichés en vitrine). 0 = dimanche … 6 = samedi. Format "HH:MM".
  horaires: {
    1: [["08:30", "19:30"]],
    2: [["08:30", "19:30"]],
    3: [["08:30", "19:30"]],
    4: [["08:30", "19:30"]],
    5: [["08:30", "19:30"]],
    6: [["08:30", "12:30"]],
    0: []
  },

  /*
   * Envoi des réservations click & collect.
   * - Laisser vide : le formulaire ouvre la messagerie du client avec la commande pré-remplie (solution de dépannage).
   * - Recommandé : créer un formulaire gratuit sur https://formspree.io et coller ici l'URL
   *   (ex. "https://formspree.io/f/abcdwxyz"). Les commandes arrivent alors directement par e-mail.
   */
  orderEndpoint: "",

  // Nombre maximum d'unités par produit dans une réservation.
  quantiteMax: 6
};
