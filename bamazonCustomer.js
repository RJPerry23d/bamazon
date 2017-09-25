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
        
        inquirer.prompt([
    {
      type: "input",
      name: "itemID",
      message: "What is the ID of the product you would like to purchase?",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= response.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "quantity",
      message: "What quantity would you like to purchase?",
      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(answer) {

            var purchasedItem = (answer.itemID) - 1;
            var numberToBuy = parseInt(answer.quantity);
            var purchaseTotal = parseFloat(((response[purchasedItem].Price) * numberToBuy).toFixed(2));

            //check if quantity is sufficient
            if (response[purchasedItem].StockQuantity >= numberToBuy) {
                //after purchase, updates quantity in Products
                connection.query("UPDATE Products SET ? WHERE ?", [{
                    StockQuantity: (response[purchasedItem].StockQuantity - numberToBuy)
                }, {
                    ItemID: answer.itemID
                }], function(err, result) {
                    if (err) throw err;
                    console.log("Success! Your total is $" + purchaseTotal.toFixed(2) + ". Thanks for your business with Bamazon!");
                    start();
                });


            } else {
                console.log("uh-oh! We don't seem to have enough inventory in stock, sorry!");
                start();
            }

        })
    })
}
