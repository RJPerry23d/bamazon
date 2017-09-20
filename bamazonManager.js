var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "J0naspup",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {

    console.log("\n\nWelcome to Bamazon!\n\n"  
    	+"=========================================\n"
    	+"=  X X X      X      X X   X X    XX    =\n"
    	+"=  X   X    X   X    X   X   X    XX    =\n"
		+"=  X X X    X X X    X       X    XX    =\n"
		+"=  X   X    X   X    X       X          =\n"
		+"=  X X X    X   X    X       X    XX    =\n"
		+"=========================================\n\n")



    // The app should then prompt users with choices.
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
                products();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                newProduct();
                break;
            default:
                console.log("case not working")

        }
    })
}

function products() {
    connection.query("SELECT * FROM products", function(error, response) {
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + ". " + response[i].product_name + " - $" + response[i].price + " - Quantity Remaining: " + response[i].stock_quantity)
        }
        start();

    })

}

function lowInventory() {
    connection.query("SELECT * FROM products", function(error, response) {
    	console.log("\n================================================\n")
        for (var i = 0; i < response.length; i++) {
            if (response[i].stock_quantity < 5) {
                console.log("Inventory is low on: " + response[i].product_name + " There are only " + response[i].stock_quantity + " remaining in inventory.");
            }
        }
        start();

    })

}

function addInventory() {
    connection.query("SELECT * FROM products", function(error, response) {
        inquirer.prompt({
            name: "selectItem",
            type: "rawlist",
            choices: function(value) {
                var productNameArray = [];
                for (var i = 0; i < response.length; i++) {
                    //had to conver int to string for prompt to work
                    var productName = response[i].product_name;
                    productNameArray.push(productName);

                }
                return productNameArray;


            },

            message: "Please select the item that you would like to add more inventory for"

        }).then(function(answer) {
            for (var i = 0; i < response.length; i++) {
                if (response[i].product_name == answer.selectItem) {
                    var chosenItem = response[i];
                    inquirer.prompt({
                        name: "quantity",
                        type: "input",
                        message: "How many items would you like to add to the inventory?",
                        validate: function(value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function(answer) {
                        var inventoryAdded = answer.quantity;
                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: (parseInt(chosenItem.stock_quantity) +
                                parseInt(inventoryAdded))
                        }, {
                            item_id: chosenItem.item_id
                        }], function(err, response) {
                            console.log("You have added " + inventoryAdded + " " + chosenItem.product_name)

                            start();
                        });
                    })
                }

            }
        })
    })
}

function newProduct() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "What item would you like to add to the current inventory?"
    }, {
        name: "department",
        type: "input",
        message: "What category id will this item be in?"
    }, {
        name: "price",
        type: "input",
        message: "What is the price of the item you are adding?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            }
            return false;
        }
    }, {
        name: "quantity",
        type: "input",
        message: "How many items would you like to add to the current inventory?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            }
            return false;
        }
    }]).then(function(answer) {
        connection.query(
            "INSERT INTO products SET ?", {
                product_name: answer.item,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity

            },
            function(error) {
                if (error) throw error;
                console.log("Congratulations! Your new item was added to the inventory.");
                start();
            }
        )
    })
}