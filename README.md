# Min Ekonomi v0.18.6 patch

Detta är en säker patch ovanpå v0.18.5.

1. Ladda upp `patch-v0186.js` och ersätt `sw.js` i repositoryts rot.
2. Öppna `index.html` i GitHub och lägg till följande rad direkt efter `<script src="./app.js"></script>`:

`<script src="./patch-v0186.js"></script>`

Utgifter får valet Betalas från: Vanligt konto eller ett sparkonto. Sparkontouttaget skapas med samma datum och belopp, följer med vid redigering och tas bort tillsammans med utgiften efter bekräftelse. Manuella insättningar/uttag frågar också efter datum. Framtida uttag påverkar inte dagens sparkontosaldo förrän datumet nås.
