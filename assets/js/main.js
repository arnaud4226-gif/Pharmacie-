/* Fonctions partagées : panier (localStorage), statut ouvert/fermé, rendu des cartes produit. */
(function () {
  "use strict";

  var CLE = "pga-panier-v1";
  var P = window.PHARMACIE || {};

  function lire() {
    try { return JSON.parse(localStorage.getItem(CLE)) || {}; } catch (e) { return {}; }
  }
  function ecrire(panier) {
    try { localStorage.setItem(CLE, JSON.stringify(panier)); } catch (e) { /* navigation privée */ }
    majCompteur();
    document.dispatchEvent(new CustomEvent("panier:maj"));
  }

  var Panier = {
    contenu: lire,
    ajouter: function (id, qte) {
      var p = lire();
      p[id] = Math.min((p[id] || 0) + (qte || 1), P.quantiteMax || 6);
      ecrire(p);
    },
    definir: function (id, qte) {
      var p = lire();
      if (qte <= 0) delete p[id]; else p[id] = Math.min(qte, P.quantiteMax || 6);
      ecrire(p);
    },
    vider: function () { ecrire({}); },
    nombre: function () {
      var p = lire(), n = 0;
      for (var k in p) n += p[k];
      return n;
    },
    lignes: function () {
      var p = lire(), out = [];
      for (var k in p) {
        var prod = trouver(k);
        if (prod) out.push({ produit: prod, qte: p[k] });
      }
      return out;
    }
  };

  function trouver(id) {
    var l = window.PRODUITS || [];
    for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i];
    return null;
  }

  function euros(n) {
    return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
  }

  function echapper(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function nomCategorie(id) {
    var c = (window.CATEGORIES || []).filter(function (x) { return x.id === id; })[0];
    return c ? c.nom : "";
  }

  function visuel(p) {
    if (p.image) {
      return '<img src="' + echapper(p.image) + '" alt="' + echapper(p.marque + " " + p.nom) + '" loading="lazy" width="400" height="400">';
    }
    return '<div class="visuel-vide cat-' + p.cat + '" aria-hidden="true"><span>' + echapper(p.marque) + "</span></div>";
  }

  function carte(p) {
    return (
      '<article class="carte-produit">' +
        '<a class="carte-lien" href="produit.html?id=' + encodeURIComponent(p.id) + '">' +
          '<div class="carte-visuel">' + visuel(p) + "</div>" +
          '<p class="carte-marque">' + echapper(p.marque) + "</p>" +
          '<h3 class="carte-nom">' + echapper(p.nom) + "</h3>" +
          '<p class="carte-format">' + echapper(p.format) + "</p>" +
        "</a>" +
        '<div class="carte-bas">' +
          '<span class="prix">' + euros(p.prix) + "</span>" +
          '<button type="button" class="btn btn-petit" data-ajouter="' + echapper(p.id) + '">Ajouter</button>' +
        "</div>" +
      "</article>"
    );
  }

  /* Délégation : tout bouton [data-ajouter] ajoute au panier. */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-ajouter]");
    if (!b) return;
    Panier.ajouter(b.getAttribute("data-ajouter"), 1);
    var t = b.textContent;
    b.textContent = "Ajouté ✓";
    b.disabled = true;
    setTimeout(function () { b.textContent = t; b.disabled = false; }, 1200);
  });

  function majCompteur() {
    var n = Panier.nombre();
    document.querySelectorAll("[data-compteur]").forEach(function (el) {
      el.textContent = n;
      el.hidden = n === 0;
    });
  }

  /* Heure de Marseille, quel que soit le fuseau du visiteur. */
  function maintenantParis() {
    var s = new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" });
    return new Date(s);
  }

  function statut() {
    var h = P.horaires || {};
    var d = maintenantParis();
    var minutes = d.getHours() * 60 + d.getMinutes();
    var plages = h[d.getDay()] || [];
    function m(x) { var a = x.split(":"); return +a[0] * 60 + +a[1]; }
    for (var i = 0; i < plages.length; i++) {
      if (minutes >= m(plages[i][0]) && minutes < m(plages[i][1])) {
        return { ouvert: true, texte: "Ouvert · ferme à " + plages[i][1].replace(":", "h") };
      }
    }
    return { ouvert: false, texte: "Fermé en ce moment" };
  }

  function majStatut() {
    var s = statut();
    document.querySelectorAll("[data-statut]").forEach(function (el) {
      el.textContent = s.texte;
      el.classList.toggle("ouvert", s.ouvert);
    });
  }

  /* Menu mobile */
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".menu-bouton");
    if (!b) return;
    var nav = document.getElementById("nav-principale");
    var ouvert = nav.classList.toggle("ouverte");
    b.setAttribute("aria-expanded", ouvert ? "true" : "false");
  });

  document.addEventListener("DOMContentLoaded", function () {
    majCompteur();
    majStatut();
    document.querySelectorAll("[data-annee]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    var vitrine = document.getElementById("produits-phares");
    if (vitrine) {
      vitrine.innerHTML = (window.PRODUITS || []).filter(function (p) { return p.phare; }).slice(0, 4).map(carte).join("");
    }
  });

  window.PGA = { Panier: Panier, trouver: trouver, euros: euros, echapper: echapper, carte: carte, nomCategorie: nomCategorie, visuel: visuel };
})();
