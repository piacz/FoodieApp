
# FoodieApp


<p>
  <img height="200" src="https://i.pinimg.com/originals/1a/e8/d4/1ae8d48b8f239e195db7a446a227c23b.jpg" align="right"/>
  Web App in JavaScript to find recipes, filter them by diets, sort them by score and other filters. Users can also post their own recipes storing them in the project's own Postgres database through a CRUD with server routes. Some recipes come from consuming an external food API.
</p>



Technologies used:
-Express
-Sequelize
-React
-Redux
-CSS

To run this project: 

1. Create an SQL database named food
2. Get an API key on https://spoonacular.com/food-api/
3. Create an .env file in the folder api with the next variables:
```
DB_USER= your_user
DB_PASSWORD=your_pass
DB_HOST=localhost
apiKey=your_api_key
```

4. Run ```npm i``` on the api and the server
5. Run ```npm start``` on the api and the server

<hr/>

## Screens
 
### Landing Page:

![2021-05-04 (4)](https://user-images.githubusercontent.com/73494684/116958747-f95f8200-ac71-11eb-91ac-22f41bc6845b.png)

### Home: Nav, search bar, filters and recipe cards:

![2021-05-04 (5)](https://user-images.githubusercontent.com/73494684/116958838-3d528700-ac72-11eb-9d2c-610e114c8d56.png)

### Pagination and diet filter buttons:

![2021-05-04 (6)](https://user-images.githubusercontent.com/73494684/116958918-768af700-ac72-11eb-94c3-4af12e0c5bb3.png)

### Recipe post:

![2021-05-04 (8)](https://user-images.githubusercontent.com/73494684/116959083-e8fbd700-ac72-11eb-9ff2-4c75639d971e.png)



