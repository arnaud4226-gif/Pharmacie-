/* Fiche produit : produit.html?id=... */
(function () {
  "use strict";
  var id = new URLSearchParams(location.search).get("id");
  var p = id && PGA.trouver(id);
  var zone = document.getElementById("fiche");
  var max = (window.PHARMACIE || {}).quantiteMax || 6;
  var e = PGA.echapper;

  if (!p) {
    zone.innerHTML = '<h1>Produit introuvable</h1><p>Ce produit n\'est plus en ligne. Retournez à <a href="boutique.html">la boutique</a> ou appelez-nous.</p>';
    return;
  }

  var titre = p.marque + " " + p.nom;
  document.title = titre + " – " + p.format + " | Pharmacie de la Grande Armée, Marseille";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", titre + " (" + p.format + ") à réserver en ligne et retirer à la Pharmacie de la Grande Armée, 13001 Marseille. " + p.desc);
  var canon = document.querySelector('link[rel="canonical"]');
  if (canon) canon.setAttribute("href", new URL("produit.html?id=" + encodeURIComponent(p.id), canon.href).href);

  zone.innerHTML =
    '<nav class="fil" aria-label="Fil d\'Ariane"><a href="./">Accueil</a> › <a href="boutique.html">Boutique</a> › ' +
      '<a href="boutique.html?cat=' + e(p.cat) + '">' + e(PGA.nomCategorie(p.cat)) + "</a></nav>" +
    '<div class="fiche">' +
      '<div class="carte-visuel">' + PGA.visuel(p) + "</div>" +
      "<div>" +
        '<p class="carte-marque">' + e(p.marque) + "</p>" +
        "<h1>" + e(p.nom) + "</h1>" +
        '<p class="carte-format">' + e(p.format) + "</p>" +
        '<p class="prix" style="margin:16px 0">' + PGA.euros(p.prix) + "</p>" +
        "<p>" + e(p.desc) + "</p>" +
        '<div class="achat">' +
          '<div class="qte"><button type="button" data-moins aria-label="Retirer un">−</button>' +
          '<input id="qte" type="number" min="1" max="' + max + '" value="1" aria-label="Quantité">' +
          '<button type="button" data-plus aria-label="Ajouter un">+</button></div>' +
          '<button type="button" class="btn" id="ajouter">Ajouter au panier</button>' +
        "</div>" +
        '<p class="note">Retrait au 6 rue de la Grande Armée, paiement au comptoir. Un doute sur l\'utilisation ? Demandez au pharmacien lors du retrait.</p>' +
      "</div>" +
    "</div>";

  var input = document.getElementById("qte");
  function borne(n) { return Math.max(1, Math.min(max, n || 1)); }
  zone.addEventListener("click", function (ev) {
    if (ev.target.closest("[data-moins]")) input.value = borne(+input.value - 1);
    if (ev.target.closest("[data-plus]")) input.value = borne(+input.value + 1);
  });
  input.addEventListener("change", function () { input.value = borne(+input.value); });
  document.getElementById("ajouter").addEventListener("click", function () {
    PGA.Panier.ajouter(p.id, borne(+input.value));
    this.textContent = "Ajouté ✓ — voir le panier";
    var b = this;
    b.onclick = function () { location.href = "panier.html"; };
  });

  // Produits similaires
  var sim = (window.PRODUITS || []).filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 4);
  if (sim.length) {
    document.getElementById("similaires").innerHTML = sim.map(PGA.carte).join("");
    document.getElementById("bloc-similaires").hidden = false;
  }

  // Données structurées Product
  var ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": titre,
    "brand": { "@type": "Brand", "name": p.marque },
    "description": p.desc,
    "sku": p.id,
    "category": PGA.nomCategorie(p.cat),
    "offers": {
      "@type": "Offer",
      "price": p.prix.toFixed(2),
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStoreOnly",
      "seller": { "@type": "Pharmacy", "name": "Pharmacie de la Grande Armée" }
    }
  };
  if (p.image) ld.image = new URL(p.image, location.href).href;
  var s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
})();
