# Min Ekonomi v0.16.3 Edit & Forecast Fix

Fixar Ändra på vanliga poster: dialogen saknade de DOM-fält som JavaScript förväntade sig efter att Sparande återinfördes.

Framtida månader visar nu planerade återkommande inkomster/utgifter utan att bokföra dem i förtid. De markeras Planerad ↻. På förfallodagen skapar autoGenerate den riktiga posten och dublettskyddet hindrar dubbelbokning. Det betyder att t.ex. månadshyra och lön syns i februari-april 2027 redan under planering, trots att faktiska poster ännu inte ska skapas.

Visual in this file was generated with Microsoft Copilot.
