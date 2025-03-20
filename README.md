# Banking Application

## Overview
This is a simple banking application that provides basic banking operations such as adding an account, depositing funds, withdrawing funds, and deleting an account. The project is built using **Spring Boot** for the back-end and **HTML, CSS, and JavaScript** for the front-end.

### Front-End:
- **HTML** – Structure of the web pages
- **CSS** – Styling and UI design
- **JavaScript** – Client-side interactivity

### Back-End:
- **Spring Boot** – Main framework for the application
- **Spring Web** – Handles web requests
- **Spring Data JPA** – Simplifies database interactions
- **Hibernate** – ORM (Object-Relational Mapping) for database operations
- **MySQL** – Relational database for storing account details
- **Lombok** – Reduces boilerplate code in Java

## Features
- **Add Account** – Create a new bank account with user details
- **Deposit Funds** – Add money to an account
- **Withdraw Funds** – Withdraw money from an account (ensuring sufficient balance)
- **Delete Account** – Remove an account from the system

## Installation & Setup

### Prerequisites:
Ensure you have the following installed:
- Java 17+
- MySQL
- Maven

### Steps to Run:
1. Clone the repository:
   ```sh
   git clone https://github.com/Mahendra4950/Banking-application.git
   ```
2. Set up the database in MySQL:
   ```sql
   CREATE DATABASE banking_app;
   ```
3. Configure **application.properties** with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/banking_app
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```
4. Build and run the Spring Boot application:
   ```sh
   mvn spring-boot:run
   ```
5. Open the front-end by opening **index.html** in a browser.

## Contributing
Feel free to fork this repository and enhance the project by adding new features or improving the UI/UX. Contributions are always welcome!

## License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

