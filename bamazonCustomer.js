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

    console.log("\n\nWelcome to Bamazon!\n\n" +
        "=========================================\n" +
        "=  X X X      X      X X   X X    XX    =\n" +
        "=  X   X    X   X    X   X   X    XX    =\n" +
        "=  X X X    X X X    X       X    XX    =\n" +
        "=  X   X    X   X    X       X          =\n" +
        "=  X X X    X   X    X       X    XX    =\n" +
        "=========================================\n\n")



    // The app should then prompt users with choices.
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "Buy an item"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
                products();
                break;

            case "Buy an item":
                buyItem();
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


function buyItem() {
    connection.query("SELECT * FROM products", function(error, response) {
        inquirer.prompt({
            name: "selectItem",
            type: "rawlist",
            choices: function(value) {
                var productNameArray = [];
                for (var i = 0; i < response.length; i++) {
                    var productName = response[i].product_name;
                    productNameArray.push(productName);

                }
                return productNameArray;


            },

            message: "Please select the item that you would like to buy."

        }).then(function(answer) {
            for (var i = 0; i < response.length; i++) {
                if (response[i].product_name == answer.selectItem) {
                    var chosenItem = response[i];
                    inquirer.prompt({
                        name: "quantity",
                        type: "input",
                        message: "How many items would you like to buy?",
                        validate: function(value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function(answer) {
                        var inventoryPurchased = answer.quantity;
                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: (parseInt(chosenItem.stock_quantity) +
                                parseInt(inventoryPurchased))
                        }, {
                            item_id: chosenItem.item_id
                        }], function(err, response) {
                            console.log("You have purchased " + inventoryPurchased + " " + chosenItem.product_name)

                            start();
                        });
                    })
                }

            }
        })
    })
}

