/* Page boutique : filtres, recherche, tri. L'état est reflété dans l'URL (?cat=visage&q=...) pour pouvoir partager un lien. */
(function () {
  "use strict";
  var produits = window.PRODUITS || [];
  var url = new URLSearchParams(location.search);
  var etat = { cat: url.get("cat") || "", q: url.get("q") || "", marque: url.get("marque") || "", tri: url.get("tri") || "" };

  var elCat = document.getElementById("catalogue");
  var elFiltres = document.getElementById("filtres");
  var elQ = document.getElementById("recherche");
  var elMarque = document.getElementById("marque");
  var elTri = document.getElementById("tri");
  var elNb = document.getElementById("nb-resultats");

  function normaliser(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  // Filtres de catégories
  var cats = [{ id: "", nom: "Tout" }].concat(window.CATEGORIES || []);
  elFiltres.innerHTML = cats.map(function (c) {
    return '<button type="button" class="filtre" data-cat="' + c.id + '" aria-pressed="false">' + PGA.echapper(c.nom) + "</button>";
  }).join("");

  // Marques
  var marques = Array.from(new Set(produits.map(function (p) { return p.marque; }))).sort(function (a, b) { return a.localeCompare(b, "fr"); });
  elMarque.insertAdjacentHTML("beforeend", marques.map(function (m) {
    return '<option value="' + PGA.echapper(m) + '">' + PGA.echapper(m) + "</option>";
  }).join(""));

  elQ.value = etat.q;
  elMarque.value = etat.marque;
  elTri.value = etat.tri;

  function rendre() {
    var q = normaliser(etat.q.trim());
    var liste = produits.filter(function (p) {
      if (etat.cat && p.cat !== etat.cat) return false;
      if (etat.marque && p.marque !== etat.marque) return false;
      if (q && normaliser(p.nom + " " + p.marque + " " + p.desc + " " + PGA.nomCategorie(p.cat)).indexOf(q) === -1) return false;
      return true;
    });
    if (etat.tri === "prix-asc") liste.sort(function (a, b) { return a.prix - b.prix; });
    else if (etat.tri === "prix-desc") liste.sort(function (a, b) { return b.prix - a.prix; });
    else if (etat.tri === "nom") liste.sort(function (a, b) { return a.nom.localeCompare(b.nom, "fr"); });

    elCat.innerHTML = liste.length
      ? liste.map(PGA.carte).join("")
      : '<p class="resultat-vide">Aucun produit ne correspond. Essayez un autre mot, ou appelez-nous : on a sans doute ce que vous cherchez en rayon.</p>';
    elNb.textContent = liste.length + (liste.length > 1 ? " produits" : " produit");

    elFiltres.querySelectorAll(".filtre").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-cat") === etat.cat ? "true" : "false");
    });

    var p = new URLSearchParams();
    Object.keys(etat).forEach(function (k) { if (etat[k]) p.set(k, etat[k]); });
    var s = p.toString();
    history.replaceState(null, "", s ? "?" + s : location.pathname);
  }

  elFiltres.addEventListener("click", function (e) {
    var b = e.target.closest(".filtre");
    if (!b) return;
    etat.cat = b.getAttribute("data-cat");
    rendre();
  });
  elQ.addEventListener("input", function () { etat.q = elQ.value; rendre(); });
  elMarque.addEventListener("change", function () { etat.marque = elMarque.value; rendre(); });
  elTri.addEventListener("change", function () { etat.tri = elTri.value; rendre(); });

  rendre();

  // Données structurées : liste des produits pour les moteurs de recherche
  var ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": produits.map(function (p, i) {
      return {
        "@type": "ListItem",
        "position": i + 1,
        "url": new URL("produit.html?id=" + encodeURIComponent(p.id), location.href).href,
        "name": p.marque + " " + p.nom
      };
    })
  };
  var s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
})();
