#Praktikum 5

##Aufgabe 3


|REST API    | HTTP Verb        | Parameter | Beschreibung  |
|:-----------|:----------------:|:---------:|--------------:|
|Get folders |    GET     |           | Ermittelt alle existierenden Folder |
|Get folder messages | GET | Folder-ID |Ermittelt alle Nachrichten eines Folders |
|Delete folder | DELETE | Folder-ID | Löscht einen existierenden Folder mit allen Nachrichten |
|Update folder name | PUT | Folder-ID, newValue | Aktualisiert den Namen eines Folders |
|Read message | GET | MSG-ID| Liest die Detailinformationen einer einzelnen Nachricht |
|Delete message | DELETE | MSG-ID | Löscht eine einzelne Nachricht |
|Create message | POST | sender, empfänger, nachricht, betreff | Erzeugt eine neue einzelne Nachricht |
|Update message | PUT | msg-id, newValue | Verschiebt eine Nachricht von einem Folder in einen anderen |


