const express = require('express');
const app = express();

const drinks = [
    { id: 1, name: "Mojito" },
    { id: 2, name: "Gin Tonic" },
    { id: 3, name: "Whiskey Sour" },
];

app.get("/drinks", (req, res) => {
    res.send({ data: drinks });
});

app.get("/drinks/:id", (req, res) => {
    const givenDrinkId = Number(req.params.id);
    const drink = drinks.find((drink) => drink.id === givenDrinkId);
    if (!drink) {
        res.status(404).send({ data: "Drink not found" });
    } else {
        res.send({ data: drink });
    }
});

app.post("/drinks", (req, res) => {
    const newDrink = req.body;

    if (!newDrink) {
        res.status(404).send({data: "New drink not found"})
    } else {
        drinks.push(newDrink);

        res.status(201).send({data: newDrink});
    }
});

app.put("/drinks/:id", (req, res) => {
    const givenDrinkId = Number(req.params.id);
    const updatedDrink = req.body;

    const drinkIndex = drinks.findIndex((drink) => drink.id === givenDrinkId);

    if (isNaN(drinkIndex)) {
        res.status(404).send({data: "Drink not found"})
    } else if (!updatedDrink){
            res.status(400).send({ data: "Updated drink not found" });
    } else {
        drinks[drinkIndex] = { id: givenDrinkId, name: updatedDrink.name };
        res.send({ data: drinks[drinkIndex] });
    }
});

app.delete("/drinks/:id", (req, res) => {
    const givenDrinkId = Number(req.params.id);

    if(isNaN(givenDrinkId)) {
        res.status(404).send({ data: "Invalid drink ID" });
    } else {
        const deletedDrink = drinks.splice(givenDrinkId, 1)[0];

        res.send({ data: deletedDrink, message: "Drink deleted successfully" });
    }
})

app.listen(8080)