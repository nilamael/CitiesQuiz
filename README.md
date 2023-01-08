## Technical Skills web development

### Cities Quiz wurde getestet in

* Chrome
* Safari
* Edge
* Firefox 

* iPhone 13 mini 
* iPhone 13 pro
* iPhone 12 pro (Chrome Devtools)
* iphone SE (Chrome Devtools)
* Samsung Galaxy S8 (Chrome Devtools)
* iPad Air (Chrome Devtools)


### Speichern des Highscores

* Lokale Speicherung mit Web Storage-API -> Speichern von kleinen Daten und einfache Handhabung

* Wenn das Spiel verteilt funktionieren soll und User-Authentication implementiert wird, könnte eine Cloudbasierte Datenbank integriert werden


### Verbesserungen

* State-Management (mit bspw. Redux), wenn Anwedung noch komplexer werden würde
-> Verhindert, dass die States per props durch mehrere Ebenen gegeben werden müssen
-> Bessere Übersichtlichkeit
-> Auslagerung von asynchronen Funktionen 

* Design
-> Farben, Abstände, Größen, etc. zu einem Einheitlichen Konzept
-> Mehr Erklärungen für den User bzgl. Ablauf des Spiels
-> Linie zwischen gewähltem Punkt und wahrer Location darstellen

* Der 'strict-mode' ist deaktiviert, da der Marker von Google Maps sonst nicht funktioniert. Bei Weiterführung des Projektes
müsste eine alternative Lösungsmöglichkeit gefunden werden, damit der 'strict-mode' wieder aktiviert werden kann.

* Das Updaten der Location von den Städten sollte serverseitig erfolgen

* API-Key serverseitig speichern

* Weiteres Refactoring