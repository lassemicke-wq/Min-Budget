# Min Ekonomi v0.13.0 Swedish Holidays

Automatiska återkommande poster tar hänsyn till svenska helgdagar och banknära lediga dagar. Om valt datum är lördag, söndag eller en svensk ledig dag flyttas posten bakåt till föregående bankvardag.

Hanteras: nyårsdagen, trettondedag jul, långfredagen, påskdagen, annandag påsk, första maj, Kristi himmelsfärdsdag, nationaldagen, midsommarafton, midsommardagen, alla helgons dag, julafton, juldagen, annandag jul och nyårsafton. Midsommarafton, julafton och nyårsafton tas med eftersom svenska löne- och bankflöden normalt inte körs som vanliga bankdagar.

Dag 29-31 i en kortare månad blir först månadens sista kalenderdag och flyttas därefter bakåt vid helgdag/helg. Startdatum, valfritt slutdatum, Auto På/Av och dublettskydd ingår.

Samma IndexedDB används. Exportera backup först.

Visual in this file was generated with Microsoft Copilot.
