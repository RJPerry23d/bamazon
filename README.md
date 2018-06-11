# bamazon
Amazon like MYSQL and Node app

Node.js & MySQL

# Overview

In this activity, I created an Amazon-like storefront with the MySQL skills you learned this week. 

Make sure you save and require the MySQL and Inquirer npm packages in your homework files--your app will need them for data input and storage.


# Instructions

Challenge #1: Customer View (Minimum Requirement)

The app should then prompt users with two messages.
The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.
Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill the customer's order.
This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

Challenge #2: Manager View (Next Level)

This Node application is called bamazonManager.js. Running this application will:
List a set of menu options:
View Products for Sale
View Low Inventory
Add to Inventory
Add New Product
If a manager selects View Products for Sale, the app will list every available item: the item IDs, names, prices, and quantities.
If a manager selects View Low Inventory, then it will list all items with an inventory count lower than five.
If a manager selects Add to Inventory, your app will display a prompt that will let the manager "add more" of any item currently in the store.
If a manager selects Add New Product, it will allow the manager to add a completely new product to the store.


# view a video of it in action here  [Bamazon Video](https://youtu.be/xxzkB3mRZgg)
