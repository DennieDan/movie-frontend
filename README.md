# SET UP GUIDE FOR MOVIE FORUM APP

### Written by: Dinh Duy Linh Dan

## MySQL Database Set up

> _Friendly note:_ Since I could not find a remote database hosting for MySQL, could you please take time to create a database to run the application

- MySQL Server: You can choose a preferred localhost MySQL server such as MySQL Workbench, or phpMyAdmin
- MySQL version: 8.0
- Create a database call `gomovieforumtest`
- Remember to take note of the following information of your database: `username, password, address of the localhost`

## Back-end set up

- Clone the code from the front-end repository [DennieDan/movie-backend](https://github.com/DennieDan/movie-backend)
- Navigate to the root directory of the folder
- Navigate to folder `.env` and replace the information of your database into the Environment Variables
- Go and get the following packages if error appears on the screen
  ````go get -u gorm.io/gorm
  go get -u gorm.io/driver/mysql
  go get github.com/gofiber/fiber/v2
  go get github.com/joho/godotenv
  go get golang.org/x/crypto/bcrypt
  go get -u github.com/golang-jwt/jwt/v5```
  ````

## Front-end set up

1.  Clone the code from the front-end repository [DennieDan/movie-frontend](https://github.com/DennieDan/movie-frontend)
2.  Open the local repository with Visual Studio Code
3.  Install the packages by
    `` npm install` or `npm install --force ``
4.  Test by continue typing `npm run dev`
    Notice this line (Line 1) in the terminal
    `➜  Local: http://localhost:5173/`
5.  Locate to the Back-end repository: `movie-backend/main.go`
6.  Find the line `AllowOrigins: "http://localhost:5173"` and modify accordingly to the address in (Line 1) pointed at #4

## Run the app

> _Note:_ As there is no fixed database for the app, a function is defined in the backend to insert data into the database every time it runs. You can choose between 2 ways to prevent errors before launching backend

a. Drop the `gomovieforumtest` database and Create it again every time prior to running the app
b. Run the app freely in the first time. In the following runs after you terminating the backend, locate to the `movie-backend/main.go` scroll down until you see the function `initializeData()` and its application in the Connect() function, comment both of them.

1. Locate to the root directory of back-end folder and type in the terminal
   `go run main.go`
2. Locate to the root directory of the front-end folder and type in the terminal
   `npm run dev`
3. Go to the browser and navigate to `http://localhost:5173/` or as indicated in your terminal

## Testing Accounts

```json
[
  {
    "id": 1,
    "username": "User1",
    "password": "password111",
    "email": "dedeui@gmail.com"
  },
  {
    "id": 2,
    "username": "User2",
    "password": "huhuhucry321",
    "email": "hurrayyygoing@hotmail.com"
  },
  {
    "id": 3,
    "username": "User3",
    "password": "thisisapassword",
    "email": "funand4587@outlook.com"
  }
]
```
