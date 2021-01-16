const express = require("express")
const { rateController } = require("./controllers/rates_controller")

const PORT = process.env.PORT || 4000;

const app = express()

// Middle wares
app.use(express.json());

app.get("/api/rates", rateController);


app.listen(PORT, () => {
    console.log("App is listening on http://localhost:"+PORT);
})