## Rest API -TypeScript 👥
🌟This API was built using MySQL as the database, Express as the server framework, Sequelize as the ORM, and Jest for conducting unit tests. It provides functionality to create suppliers, load invitations from a CSV file, and retrieve a list of existing invitations 🗄️.

### Built With
- Node-Typescript
- Express
- MySQL

### Recommended Tools 🛠️
Postman https://www.postman.com/downloads/

## Getting Started 🚀
- To get a local copy up and running follow these steps.
  
### Installation 💻
- Clone the repository:
- git clone https://github.com/Pipe1098/Valee-challenge-tc.git

### Configure the Database Connection 🗄️
Before running the server, you need to set up the database connection. Open the db.ts file in the config folder and modify the following line to connect to your MySQL database:

```
const sequelize = new Sequelize("your_database_name", "your_username", "your_password", {
  host: "your_database_host",
  port: 3306,
  dialect: "mysql",
});
```
Replace "your_database_name", "your_username", "your_password", and "your_database_host" with your actual MySQL database credentials.


Create the supplier table:
```
 CREATE TABLE supplier (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(256) NOT NULL,
  code varchar(45) DEFAULT NULL,
  is_active bit(1) DEFAULT b'1',
  entry_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
```
Create the supplier_invitation table along with the foreign key reference to the supplier table:

```
CREATE TABLE supplier_invitation (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  supplier_id bigint(20) DEFAULT NULL,
  commerce_cell_phone varchar(256) DEFAULT NULL,
  entry_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (supplier_id) REFERENCES supplier (id)
);
```
## Running the app 🚀

### install dependencies
```
npm install
```
###  generate production build
```
npm run build
```

###  run generated content in dist folder on port 3000
```
npm run start
```
or
```
npm run dev
```
## Use API Endpoints 📝🌐
- you can use postman to test the following enpoints:

### POST /invitation/csv

Request Type: POST

Endpoint: /invitation/csv

Request Headers:

Content-Type: multipart/form-data

Accept: application/json

- Request Body:
File CSV: Upload a CSV file containing the invitations (prueba.csv).

- Response:
Status Code: 200 (OK)
- Example Response:
```json
{
  "code": 0,
  "message": "Invitations loaded successfully"
}
```

### POST /api/v1/suppliers:
Method: POST

Request Header:

Summary: Create a new supplier.

Description: This endpoint allows you to create a new supplier and store it in the database.

Parameters: JSON object containing supplier details (name, code).

Request Body:
```json
{
  "name": "company2",
  "code": "PROV147"
}
```
- Example Response:
Status: 201 Created
Body:

```json
{
  "id": 1,
  "name": "company2",
  "code": "PROV147",
  "isActive": true,
  "entryDate": "2023-07-27T12:34:56.000Z"
}
```
### GET /invitation
Request Type: GET

Request Headers:

Accept: application/json

Status: 200 OK

Example Response:

```json
{
  "apiResponse": {
    "code": 0,
    "message": "OK"
  },
  "list": [
    {
      "supplierId": 1,
      "supplierName": "company2",
      "commerceCellPhone": "+123456789012"
    }
    
  ]
}
```

## Testing

### Jest with supertest
npm run test

## Contributing 🤝
Contributions are welcome! Please feel free to open a pull request.


