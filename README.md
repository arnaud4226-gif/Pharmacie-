# Site de la Pharmacie de la Grande Armée

Site vitrine + boutique en click & collect pour la Pharmacie de la Grande Armée, 6 rue de la Grande Armée, 13001 Marseille.

Le site est fait de simples fichiers HTML, CSS et JavaScript. Pas de base de données, pas de serveur à maintenir, pas de mises à jour de sécurité de type WordPress. On peut l'héberger gratuitement (GitHub Pages, Netlify, Cloudflare Pages).

## Ce qu'il y a dedans

| Page | Rôle |
|---|---|
| `index.html` | Accueil : horaires (avec « ouvert / fermé » en temps réel), services, produits mis en avant, équipe, plan, pharmacie de garde |
| `boutique.html` | Catalogue avec recherche, filtres par catégorie et par marque, tri par prix |
| `produit.html?id=…` | Fiche produit |
| `panier.html` | Panier et formulaire de réservation |
| `mentions-legales.html`, `cgv.html`, `confidentialite.html` | Pages obligatoires, **à compléter** (passages surlignés en jaune) |

## Comment fonctionne la vente

J'ai choisi le **click & collect avec paiement au comptoir** plutôt qu'un paiement en ligne, pour trois raisons :

1. **La réglementation.** Vendre des médicaments en ligne (même sans ordonnance) demande une autorisation de l'ARS, une déclaration à l'Ordre, un hébergeur certifié HDS et le logo commun européen sur chaque page. C'est faisable, mais c'est un dossier à part entière. Ici, seuls la parapharmacie, l'hygiène, la puériculture, des tests et des compléments alimentaires sont proposés, ce qui ne demande pas d'autorisation.
2. **Pas de livraison à gérer** : pas d'emballage, de transporteur, de retours ni de droit de rétractation de 14 jours.
3. **Le conseil reste au comptoir**, ce qui est cohérent avec le métier.

Le client remplit son panier, laisse ses coordonnées et choisit un jour de retrait. La pharmacie reçoit la réservation par e-mail.

### Recevoir les réservations par e-mail (à faire avant la mise en ligne)

1. Créer un compte gratuit sur [formspree.io](https://formspree.io) avec l'adresse e-mail de la pharmacie, puis un formulaire.
2. Copier l'URL donnée (du type `https://formspree.io/f/abcdwxyz`).
3. La coller dans `assets/js/config.js`, champ `orderEndpoint`.

Tant que ce champ est vide, le formulaire ouvre la messagerie du client avec la commande pré-remplie. Ça marche, mais beaucoup de gens n'envoient pas le message : à éviter en production.

## Modifier le contenu

- **Horaires, téléphone, e-mail** : `assets/js/config.js`. Les horaires apparaissent aussi en dur dans `index.html` (tableau et données Google en haut du fichier) : penser à les changer aux deux endroits.
- **Produits et prix** : `assets/js/products.js`. Chaque produit est une ligne. Pour en ajouter un, copier une ligne existante et changer `id` (unique, sans espace ni accent), `nom`, `marque`, `cat`, `format`, `prix`, `desc`. Mettre `phare: true` pour l'afficher sur l'accueil (les 4 premiers sont montrés).
- **Photos produits** : déposer les images (carrées, ~800 px, format .webp ou .jpg) dans `assets/img/produits/` et ajouter `image: "assets/img/produits/nom-du-fichier.webp"` au produit. Les photos des laboratoires sont en général fournies par leurs délégués ou sur leurs espaces pros. Sans photo, une vignette avec le nom de la marque s'affiche.

> ⚠️ **Les prix actuels sont indicatifs.** Ils ont été saisis pour la démonstration. Il faut les remplacer par les vrais prix de l'officine avant d'ouvrir la boutique.

## Mettre en ligne

**Option simple : GitHub Pages**
Settings → Pages → « Deploy from a branch » → choisir la branche et le dossier `/ (root)`. Le site est en ligne en quelques minutes à une adresse du type `xxx.github.io`.

**Nom de domaine**
Acheter un domaine (OVH, Gandi… environ 10 €/an), par exemple `pharmacie-grande-armee-marseille.fr`, et le relier à l'hébergement.
Le site utilise pour l'instant l'adresse `https://www.pharmacie-grande-armee-marseille.fr/` dans les balises pour Google (`index.html`, `robots.txt`, `sitemap.xml`, et `canonical` de chaque page). **Si le domaine choisi est différent, remplacer cette adresse partout** (une recherche/remplacement suffit).

## Être trouvé sur Google

Pour une pharmacie, la grande majorité des visites vient de recherches locales (« pharmacie Marseille 1er », « pharmacie ouverte rue de la Grande Armée »). Ce qui compte le plus, dans l'ordre :

1. **Fiche Google Business Profile** ([business.google.com](https://business.google.com)). C'est elle qui apparaît sur Google Maps. Vérifier qu'elle existe, la revendiquer, mettre les bons horaires, les photos de la façade, le lien vers le site, et répondre aux avis. Penser aux horaires exceptionnels (jours fériés, gardes).
2. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)) : déclarer le site, puis envoyer `sitemap.xml`. Ça permet de voir sur quelles recherches le site apparaît.
3. **Cohérence nom / adresse / téléphone** : les mêmes partout (site, fiche Google, PagesJaunes, annuaires de pharmacies). Google s'en sert pour faire confiance aux informations.

Déjà en place dans le site :
- titres et descriptions de pages rédigés pour les recherches locales ;
- données structurées `Pharmacy` (adresse, horaires, téléphone) et `Product` (nom, marque, prix) lisibles par Google ;
- `sitemap.xml` et `robots.txt` ;
- pages légères (images compressées, pas de framework), affichage correct sur mobile.

Piste d'amélioration plus tard : générer une vraie page HTML par produit (au lieu de `produit.html?id=…`) pour un meilleur référencement des fiches produits.

## Tester en local

```bash
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000.

## Si un jour vous voulez aller plus loin

- **Paiement en ligne** : passer à une solution e-commerce (Shopify, WooCommerce) ou à une plateforme spécialisée pharmacie, qui gère paiement, stock et parfois la connexion au LGO.
- **Vente de médicaments en ligne** : demande d'autorisation à l'ARS PACA, déclaration au Conseil régional de l'Ordre, hébergement HDS, respect des bonnes pratiques de dispensation par voie électronique (arrêté du 28 novembre 2016).
- **Envoi d'ordonnances** : le formulaire actuel ne doit pas servir à ça. Une ordonnance est une donnée de santé ; il faut un outil hébergé chez un hébergeur HDS (beaucoup de groupements et de LGO en proposent un).
