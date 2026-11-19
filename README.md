# Min Ekonomi v0.18.9 Recurring Editor Runtime Fix

Rotorsaken till att Ändra på Återkommande inte reagerade var ett JavaScript runtime-fel i strict mode: variabeln `type` i recEditor tilldelades utan `let`. Klickhanteringen fungerade, men redigeringsfunktionen avbröts direkt med ReferenceError. Variabeln deklareras nu korrekt.

Datumstyrda sparkontouttag är fortsatt integrerade direkt i app.js. Ingen patchfil används.

Visual in this file was generated with Microsoft Copilot.
