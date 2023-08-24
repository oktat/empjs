# empjs felhasználói dokumentáció

## Feltételek

A következő parancsokra van szükség a beüzemeléshez:

* git
* npm vagy pnpm
* code

## Beüzemelés

### Kezdés

Letöltjük a projektet:

```cmd
git clone https://github.com/oktat/empjs.git
```

Belépünk a projekt gyökérkönyvtárába és indítunk egy VSCode-t:

```cmd
cd empjs
code .
```

### Függőségek telepítése

NodeJS függőségek:

```cmd
npm install
```

### Az auth.config állomány

A config könyvtárban találunk egy auth.config.js.example fájlt. Készítsünk másolatot auth.config.js néven. Állítsuk be a secret értéket.

```javascript
module.exports = {
    secret: 'aaaa'
};
```

### Adatbázis beállítása

A config könyvtárban találunk egy config.json.example állományt. Készítsünk róla másolatot config.json néven. Állítsuk be az adatbázis elérést, például:

```javascript
{

  "production": {
    "username": "empjs",
    "password": titok,
    "database": "empjs",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

A packages.json fájlban be van állítva, a production mód. Nélküle development módban vagyunk. A package.json fájl tartalma:

```json
  "scripts": {
    "start": "env NODE_ENV=production nodemon server.js",
    "migrate": "env NODE_ENV=production npx sequelize db:migrate"
  },
```

A választott módban állítsuk be az adatbázist.

MariaDB esetén szükség van a mariadb NodeJS csomagra, a MySQL esetén a mysql2 csomagra, SQLite esetén a sqlite3 csomagra.

Ha telepítettük a megfelelő csomagotkat, és beállítottuk az adatbázist jöhet a migráció.

Kezdjük el a migrációt, ami létrehozza az adatbázis tábláit:

```cmd
npm run migrate
```

### A szerver indítása

```cmd
npm start
```

## Végpontok

|  Végpont  |  Metódus  |  Auth  |  CRUD  |  Leírás  |
|-|-|-|-|-|
| /employees  | GET | nem  | read | összes dolgozó |
| /employees  | POST | igen  | create | új dolgozó |
| /employees/{id}  | GET | nem  | read | egy dolgozó |
| /employees/{id}  | PUT | igen  | update  | dolgozó frissítése |
| /employees/{id}  | DELETE  | igen  | delete  | dolgozó törlése  |
| /register  | POST | nem | n/a | regisztráció  |
| /login  | POST | nem | n/a | belépés  |

### Felhasználó regisztrálása

Felhasználó felvételéhez így kell összeállítani a küldendő JSON adatot:

```json
{
    "name": "mari",
    "email": "mari@zold.lan",
    "password": "titok",
    "password_confirmation": "titok"
}
```

### Bejelentkezés

Bejelentkezéshez név és jelszó szükséges:

```json
{
    "name": "janos",
    "password": "titok"
}
```

Visszakapunk egy tokent és egy nevet. Például:

```json
{
    "id": 6,
    "name": "janos",
    "emaiil": "janos@zold.lan",    
    "accessToken": "34ZqaQhOT3t5fjEgxYsKC1SwrfJHw63REalXD921",
}
```

### Dolgozók kezelés

#### Lekérdezés

Lekérdezéshez nem szükséges azonosítás, csak simán használjuk a GET metódust.

#### Új dolgozó felvétele

Végpont:

| Végpont | Metódus | Azonosítása |
|-|-|-|
| /api/employees | POST | igen |

POST metódust használunk a következő módon:

```json
{
    "name":"Erős István",
    "city":"Szeged",
    "salary":"349"
}
```

Azonosításhoz, a fejlécben el kell küldeni a Bearer tokent a következő formában:

```json
Authorization: Bearer 34ZqaQhOT3t5fjEgxYsKC1SwrfJHw63REalXD921
```

Az Authorization értéke a "Bearer" szó, majd utána egy szóköz, ezt követi a token (sorszámmal vagy nélküle).

#### Dolgozó adatainak frissítése

Végpont:

| Végpont | Metódus | Azonosítása |
|-|-|-|
| /api/employees/1 | PUT | igen |

A végpontnak paraméterként kell megadni, melyik dolgozó adatait szeretnénk változtatni. Az 1 csak egy példa. Át kell írni a megfelelő dolgozó azonosítójára.

Az új adatok:

```json
{
    "name": "Nyers Imre",
    "city": "Szolnok",
    "salary": 400
}
```

#### Dolgozó törlése

Végpont:

| Végpont | Metódus | Azonosítása |
|-|-|-|
| /api/employees/1 | DELETE | igen |

A példában a 1-s azonosítójú dolgozót töröljük. Javítsuk a megfelelőre.
