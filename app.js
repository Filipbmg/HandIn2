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

app.listen(8080)