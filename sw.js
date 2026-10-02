// Deel 121, Kay's verzoek: minimale service worker, puur om Chrome op Android
// te laten zien dat deze PWA "installeerbaar" is ("App installeren" stond
// grijs/niet-klikbaar in het browsermenu -- een geregistreerde service worker
// met een fetch-handler is daar een harde vereiste voor, naast het manifest
// dat al in orde was).
//
// BEWUST GEEN CACHING VAN APP-BESTANDEN. We hebben zojuist meegemaakt dat
// zelfs zonder service worker een nieuwe versie na een GitHub-push soms pas
// na een harde refresh zichtbaar werd (gewone browsercache) -- een service
// worker die zelf ook nog eens index.html/assets in een Cache Storage zou
// zetten, maakt dat probleem alleen maar erger (dat is de klassieke
// "oude versie blijft voor altijd hangen"-valkuil van PWA's). Deze worker
// doet dus NIETS anders dan zich registreren en elk verzoek gewoon
// doorgeven aan het netwerk -- geen cache.put, geen offline-fallback. Puur
// functioneel om aan Android's installatie-eisen te voldoen.
//
// self.skipWaiting()/clients.claim(): een nieuwe versie van dit bestand
// (bv. als hier ooit wél caching-logica bijkomt) wordt zo meteen actief
// i.p.v. pas na het sluiten van alle tabbladen -- belangrijk om niet
// dezelfde "blijft op de oude versie hangen"-ervaring te herhalen.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
