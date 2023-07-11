# BACKend service ExpressJS and TypeScript

Instructions:

1. Clone this repo
2. Run npm install
3. Run npm dev
4. Visit localhost:8080

### Development Stack

1. Node Js
2. TypeScript
3. Express
4. MySql
5. Sequelize
6. JWT token based

### Create Test DB

CREATE TABLE `users` (
`userid` int NOT NULL AUTO_INCREMENT,
`email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`user_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`role_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
`created_at` datetime NOT NULL,
`updated_at` datetime NOT NULL,
`user_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
`contact` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

http://localhost:3000/api/v1/login
{
"userid": "admin",
"password": "password123"
}
