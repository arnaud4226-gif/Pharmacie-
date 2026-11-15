/*
 * Catalogue de la boutique.
 *
 * PRIX INDICATIFS : ils ont été saisis pour la démonstration et doivent être remplacés
 * par les prix réellement pratiqués en officine avant toute mise en ligne.
 *
 * Pour ajouter une photo : déposer le fichier dans assets/img/produits/ et renseigner
 * le champ "image" (ex. "assets/img/produits/avene-cicalfate.webp").
 *
 * Seuls des produits de parapharmacie, d'hygiène, de puériculture, des tests et des
 * compléments alimentaires figurent ici. Les médicaments n'y sont volontairement pas
 * (voir README : la vente en ligne de médicaments demande une autorisation de l'ARS).
 */
window.CATEGORIES = [
  { id: "visage", nom: "Visage" },
  { id: "corps", nom: "Corps & hygiène" },
  { id: "cheveux", nom: "Cheveux" },
  { id: "solaire", nom: "Solaire" },
  { id: "bebe", nom: "Bébé & maman" },
  { id: "intime", nom: "Hygiène intime" },
  { id: "complements", nom: "Compléments alimentaires" },
  { id: "tests", nom: "Tests & soins" }
];

window.PRODUITS = [
  // — Visage —
  { id: "avene-cicalfate-creme-40", nom: "Cicalfate+ Crème réparatrice protectrice", marque: "Avène", cat: "visage", format: "40 ml", prix: 11.90, phare: true,
    desc: "Crème pour les peaux irritées, les petites zones abîmées et les rougeurs. Visage et corps, utilisable chez l'enfant." },
  { id: "avene-cleanance-gel-400", nom: "Cleanance Gel nettoyant", marque: "Avène", cat: "visage", format: "400 ml", prix: 15.90,
    desc: "Gel sans savon pour le visage et le corps, adapté aux peaux grasses à tendance acnéique." },
  { id: "avene-cold-cream-creme-100", nom: "Cold Cream Crème", marque: "Avène", cat: "visage", format: "100 ml", prix: 13.50,
    desc: "Crème nourrissante pour les peaux sèches, en particulier l'hiver. Visage et corps." },
  { id: "lrp-effaclar-gel-400", nom: "Effaclar Gel moussant purifiant", marque: "La Roche-Posay", cat: "visage", format: "400 ml", prix: 17.90, phare: true,
    desc: "Gel nettoyant pour les peaux grasses et sensibles. S'utilise matin et soir sur peau humide." },
  { id: "cerave-gel-moussant-236", nom: "Gel moussant anti-imperfections", marque: "CeraVe", cat: "visage", format: "236 ml", prix: 12.90,
    desc: "Nettoyant à l'acide salicylique pour les peaux à imperfections." },
  { id: "svr-sebiaclear-gel-200", nom: "Sebiaclear Gel moussant", marque: "SVR", cat: "visage", format: "200 ml", prix: 11.50,
    desc: "Gel nettoyant pour les peaux mixtes à grasses, sans savon." },
  { id: "embryolisse-lait-creme-75", nom: "Lait-Crème Concentré", marque: "Embryolisse", cat: "visage", format: "75 ml", prix: 19.90, phare: true,
    desc: "Crème hydratante multi-usage, base de maquillage, démaquillant. Un classique des trousses de toilette." },

  // — Corps & hygiène —
  { id: "comptoir-bain-marseille-citron-1l", nom: "Savon de Marseille liquide Citron & Menthe", marque: "Le Comptoir du Bain", cat: "corps", format: "1 L", prix: 6.90,
    desc: "Savon liquide extra-doux pour les mains et le corps, flacon pompe." },
  { id: "comptoir-bain-marseille-aloe-1l", nom: "Savon de Marseille liquide Aloe Vera", marque: "Le Comptoir du Bain", cat: "corps", format: "1 L", prix: 6.90,
    desc: "Savon liquide extra-doux pour les mains et le corps, flacon pompe." },
  { id: "cerave-creme-lavante-473", nom: "Crème lavante hydratante", marque: "CeraVe", cat: "corps", format: "473 ml", prix: 14.90, phare: true,
    desc: "Nettoyant crème pour les peaux normales à sèches, visage et corps." },
  { id: "lrp-lipikar-huile-400", nom: "Lipikar Huile lavante AP+", marque: "La Roche-Posay", cat: "corps", format: "400 ml", prix: 16.90,
    desc: "Huile lavante pour les peaux très sèches à tendance atopique, bébés, enfants et adultes." },
  { id: "avene-xeracalm-baume-400", nom: "XeraCalm A.D Baume relipidant", marque: "Avène", cat: "corps", format: "400 ml", prix: 24.90,
    desc: "Baume pour les peaux très sèches à tendance atopique ou qui grattent." },
  { id: "la-rosee-creme-corps-200", nom: "Crème corps hydratante", marque: "La Rosée", cat: "corps", format: "200 ml", prix: 14.90,
    desc: "Crème pour le corps au beurre de karité, texture fondante." },

  // — Cheveux —
  { id: "la-rosee-shampooing-purifiant-200", nom: "Shampooing purifiant", marque: "La Rosée", cat: "cheveux", format: "200 ml", prix: 10.90,
    desc: "Shampooing pour cuir chevelu et cheveux à tendance grasse." },
  { id: "la-rosee-shampooing-nourrissant-200", nom: "Shampooing nourrissant", marque: "La Rosée", cat: "cheveux", format: "200 ml", prix: 10.90,
    desc: "Shampooing pour cheveux secs ou abîmés." },

  // — Solaire —
  { id: "la-rosee-lait-solaire-spf50-150", nom: "Lait solaire SPF 50", marque: "La Rosée", cat: "solaire", format: "150 ml", prix: 19.90,
    desc: "Protection haute pour le visage et le corps, texture fluide." },
  { id: "svr-sun-secure-spf50-50", nom: "Sun Secure Crème SPF 50+", marque: "SVR", cat: "solaire", format: "50 ml", prix: 16.90,
    desc: "Crème solaire visage, très haute protection." },

  // — Bébé & maman —
  { id: "mam-sucette-original-0-6", nom: "Sucette Original 0-6 mois (x2)", marque: "MAM", cat: "bebe", format: "2 sucettes", prix: 10.90,
    desc: "Sucettes en silicone avec boîte de stérilisation. Coloris selon arrivage." },
  { id: "mam-biberon-easy-start-160", nom: "Biberon Easy Start Anti-colique", marque: "MAM", cat: "bebe", format: "160 ml", prix: 13.90,
    desc: "Biberon auto-stérilisant, tétine débit 1." },
  { id: "lrp-lipikar-baume-bebe-200", nom: "Lipikar Baume AP+M", marque: "La Roche-Posay", cat: "bebe", format: "200 ml", prix: 18.90,
    desc: "Baume relipidant pour les peaux sèches dès la naissance." },

  // — Hygiène intime —
  { id: "saforelle-soin-lavant-250", nom: "Soin lavant doux", marque: "Saforelle", cat: "intime", format: "250 ml", prix: 8.90,
    desc: "Soin lavant pour la toilette intime et le corps." },
  { id: "saugella-dermoliquide-250", nom: "Dermoliquide", marque: "Saugella", cat: "intime", format: "250 ml", prix: 7.90,
    desc: "Soin lavant pour l'hygiène intime quotidienne." },

  // — Compléments —
  { id: "digestic-60-gelules", nom: "Confort digestif — gélules", marque: "Digestic", cat: "complements", format: "60 gélules", prix: 24.90, phare: true,
    desc: "Complément alimentaire à base de plantes pour le confort digestif. Ne remplace pas une alimentation variée. Demandez conseil au comptoir en cas de troubles qui durent." },

  // — Tests & soins —
  { id: "clearblue-test-grossesse-x2", nom: "Test de grossesse (x2)", marque: "Clearblue", cat: "tests", format: "2 tests", prix: 12.90,
    desc: "Test urinaire à résultat rapide. Retrait discret au comptoir." },
  { id: "urgo-pansements-assortis", nom: "Pansements assortis", marque: "Urgo", cat: "tests", format: "boîte", prix: 4.90,
    desc: "Boîte de pansements de différentes tailles pour les petites plaies du quotidien." }
];
