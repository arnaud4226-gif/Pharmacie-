/* Page panier : lignes, quantités, formulaire de réservation. */
(function () {
  "use strict";
  var P = window.PHARMACIE || {};
  var e = PGA.echapper;
  var elLignes = document.getElementById("lignes");
  var elTotal = document.getElementById("total");
  var elZone = document.getElementById("zone-panier");
  var elRetour = document.getElementById("retour");
  var form = document.getElementById("form-reservation");
  var max = P.quantiteMax || 6;

  function rendre() {
    var lignes = PGA.Panier.lignes();
    if (!lignes.length) {
      elZone.hidden = true;
      if (!elRetour.innerHTML) {
        elRetour.innerHTML = '<p>Votre panier est vide.</p><p><a class="btn" href="boutique.html">Aller à la boutique</a></p>';
      }
      return;
    }
    elZone.hidden = false;
    var total = 0;
    elLignes.innerHTML = lignes.map(function (l) {
      var p = l.produit;
      total += p.prix * l.qte;
      return '<div class="ligne-panier">' +
        '<div class="carte-visuel">' + PGA.visuel(p) + "</div>" +
        '<div><p class="carte-marque">' + e(p.marque) + '</p><h3><a href="produit.html?id=' + encodeURIComponent(p.id) + '">' + e(p.nom) + '</a></h3><p class="carte-format">' + e(p.format) + " · " + PGA.euros(p.prix) + "</p></div>" +
        '<div class="droite">' +
          '<div class="qte"><button type="button" data-delta="-1" data-id="' + e(p.id) + '" aria-label="Retirer un">−</button>' +
          '<input type="number" min="0" max="' + max + '" value="' + l.qte + '" data-id="' + e(p.id) + '" aria-label="Quantité de ' + e(p.nom) + '">' +
          '<button type="button" data-delta="1" data-id="' + e(p.id) + '" aria-label="Ajouter un">+</button></div>' +
          "<strong>" + PGA.euros(p.prix * l.qte) + "</strong>" +
          '<button type="button" class="lien-retirer" data-retirer="' + e(p.id) + '">Retirer</button>' +
        "</div></div>";
    }).join("");
    elTotal.textContent = PGA.euros(total);
  }

  elLignes.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-delta]");
    if (b) {
      var id = b.getAttribute("data-id");
      PGA.Panier.definir(id, (PGA.Panier.contenu()[id] || 0) + +b.getAttribute("data-delta"));
    }
    var r = ev.target.closest("[data-retirer]");
    if (r) PGA.Panier.definir(r.getAttribute("data-retirer"), 0);
  });
  elLignes.addEventListener("change", function (ev) {
    if (ev.target.matches("input[data-id]")) PGA.Panier.definir(ev.target.getAttribute("data-id"), parseInt(ev.target.value, 10) || 0);
  });
  document.addEventListener("panier:maj", rendre);

  function hh(x) { return x.replace(/^0/, "").replace(":", "h"); }

  /* Créneaux de retrait : les 6 prochains jours d'ouverture. */
  function creneaux() {
    var h = P.horaires || {};
    var jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    var d = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
    var out = [{ v: "Dès que possible", t: "Dès que possible (on vous prévient)" }];
    for (var i = 0; out.length < 7 && i < 14; i++) {
      var j = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
      var plages = h[j.getDay()] || [];
      if (!plages.length) continue;
      var fin = plages[plages.length - 1][1];
      if (i === 0) {
        var f = fin.split(":");
        if (d.getHours() * 60 + d.getMinutes() > +f[0] * 60 + +f[1] - 120) continue; // trop tard aujourd'hui
      }
      var nom = i === 0 ? "Aujourd'hui" : i === 1 ? "Demain" : jours[j.getDay()].replace(/^./, function (c) { return c.toUpperCase(); }) + " " + j.getDate() + "/" + (j.getMonth() + 1);
      var libelle = nom + " (" + plages.map(function (p) { return hh(p[0]) + "–" + hh(p[1]); }).join(", ") + ")";
      out.push({ v: libelle, t: libelle });
    }
    document.getElementById("retrait").innerHTML = out.map(function (o) {
      return '<option value="' + e(o.v) + '">' + e(o.t) + "</option>";
    }).join("");
  }

  function resume(donnees) {
    var l = PGA.Panier.lignes();
    var total = 0;
    var txt = l.map(function (x) {
      total += x.produit.prix * x.qte;
      return "- " + x.qte + " × " + x.produit.marque + " " + x.produit.nom + " (" + x.produit.format + ") — " + PGA.euros(x.produit.prix * x.qte);
    }).join("\n");
    return "Réservation click & collect\n\n" + txt + "\n\nTotal estimé : " + PGA.euros(total) +
      "\n\nClient : " + donnees.prenom + " " + donnees.nom +
      "\nTéléphone : " + donnees.telephone + "\nE-mail : " + donnees.email +
      "\nRetrait souhaité : " + donnees.retrait +
      (donnees.message ? "\nMessage : " + donnees.message : "");
  }

  function confirmer(mail) {
    PGA.Panier.vider();
    elZone.hidden = true;
    elRetour.innerHTML = '<div class="message message-ok"><strong>' + (mail ? "Votre messagerie va s'ouvrir avec la réservation." : "Réservation envoyée, merci.") + "</strong><br>" +
      (mail ? "Pensez à envoyer le message pour que l'on reçoive votre commande. " : "") +
      "On vous recontacte dès que tout est prêt. Pour une question urgente : <a href=\"tel:" + e(P.telephoneIntl || "") + "\">" + e(P.telephone || "") + "</a>.</div>" +
      '<p><a class="btn btn-contour" href="boutique.html">Retour à la boutique</a></p>';
    window.scrollTo(0, 0);
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var fd = new FormData(form);
    var d = {};
    fd.forEach(function (v, k) { d[k] = String(v).trim(); });
    var corps = resume(d);
    var btn = document.getElementById("envoyer");

    if (P.orderEndpoint) {
      btn.disabled = true;
      btn.textContent = "Envoi…";
      fetch(P.orderEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ _subject: "Réservation – " + d.prenom + " " + d.nom, _replyto: d.email, email: d.email, reservation: corps })
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        confirmer(false);
      }).catch(function () {
        btn.disabled = false;
        btn.textContent = "Envoyer la réservation";
        elRetour.innerHTML = '<div class="message message-erreur">L\'envoi n\'a pas fonctionné. Réessayez dans un instant, ou appelez-nous au <a href="tel:' + e(P.telephoneIntl) + '">' + e(P.telephone) + "</a>.</div>";
      });
    } else {
      location.href = "mailto:" + encodeURIComponent(P.email || "") +
        "?subject=" + encodeURIComponent("Réservation – " + d.prenom + " " + d.nom) +
        "&body=" + encodeURIComponent(corps);
      confirmer(true);
    }
  });

  creneaux();
  rendre();
})();
