"use client";
import React, { useEffect } from "react";
import { siteConfig } from "../siteConfig";


export default function Home() {
  useEffect(() => {
    document.title = "Algemene voorwaarden - Panopti";
  });

  return (
    <main>
  <div className="flex items-center">
    <div className="h-[30vh] w-1/2 mx-auto">
      <br/><br/>
      <h1><strong>Algemene Voorwaarden - Panopti</strong></h1><br/>

      <p>
        Deze algemene voorwaarden zijn van toepassing op het gebruik van de software Panopti, een dienst die eigendom is van Gill Bates, geregistreerd in Nederland. Door gebruik te maken van Panopti gaat de gebruiker akkoord met deze algemene voorwaarden.
      </p><br/>

      <br/><strong>1. Dienstomschrijving</strong><br/><br/>
      <p>
        Panopti biedt gebruikers digitale data-analyse die inzicht geeft in productverkopen met als doel de verkoopprestaties van bedrijven te optimaliseren. De dienst is beschikbaar op basis van een abonnement. Er worden geen fysieke producten verkocht en de inhoud is niet gegenereerd door gebruikers.
      </p><br/>

      <br/><strong>2. Gebruikers</strong><br/><br/>
      <p>
        De dienst staat open voor zowel bedrijven (waaronder eenmanszaken) als particulieren. Er zijn geen leeftijdsbeperkingen aan het gebruik van de dienst.
      </p><br/>

      <br/><strong>3. Betaling en Abonnement</strong><br/><br/>
      <p>
        Panopti biedt een abonnementsdienst met een gratis proefperiode van 30 dagen. Na de proefperiode wordt het abonnement automatisch verlengd, tenzij het door de gebruiker wordt opgezegd. Panopti accepteert iDEAL, Bancontact en creditcard als betaalmethoden. Er is geen restitutiebeleid, behalve in gevallen waar de wet anders voorschrijft.
      </p><br/>

      <br/><strong>4. Verantwoordelijkheid en Aansprakelijkheid</strong><br/><br/>
      <p>
        Panopti is verantwoordelijk voor het oplossen van eventuele bugs en technische problemen in de software. De gebruiker is echter zelf verantwoordelijk voor het juiste gebruik van de dienst. Panopti is niet verantwoordelijk voor de bedrijfsresultaten van de gebruiker. Gebruik van de dienst biedt geen garantie op succes, en Panopti kan niet aansprakelijk worden gesteld voor gemiste verkopen of andere zakelijke verliezen.
      </p><br/>

      <br/><strong>5. Gegevensbescherming</strong><br/><br/>
      <p>
        Voor het gebruik van Panopti wordt verwezen naar het <a href={siteConfig.baseLinks.privacy}>Privacybeleid van Panopti</a>, waarin wordt uitgelegd hoe wij omgaan met persoonlijke gegevens en privacy.
      </p><br/>

      <br/><strong>6. Beëindiging van het Abonnement</strong><br/><br/>
      <p>
        Gebruikers kunnen hun abonnement op elk gewenst moment beëindigen, met inachtneming van een opzegtermijn van 30 dagen. Tijdens de opzegperiode blijft de gebruiker toegang houden tot de dienst.
      </p><br/>

      <br/><strong>7. Wijzigingen in de Algemene Voorwaarden</strong><br/><br/>
      <p>
        Panopti behoudt zich het recht voor om deze algemene voorwaarden op elk moment te wijzigen. Wijzigingen worden per e-mail aan gebruikers gecommuniceerd. Door de dienst te blijven gebruiken na de wijziging van de voorwaarden, gaat de gebruiker akkoord met de gewijzigde voorwaarden.
      </p><br/>

      <br/><strong>Contactgegevens</strong><br/><br/>
      <p>
        <a href="https://www.panopti.nl/">https://www.panopti.nl/</a><br/>
        Mathenesserdijk 392 A01, 3026 GV, Rotterdam<br/>
        +31648557798
      </p><br/>
    </div>
  </div>
</main>
  );
}