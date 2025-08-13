const express = require('express');
const cors = require('cors');
const pool = require('./conexion');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/formulario", async (req, res) =>{
    const {name, lastname, cc, edad, genero, weight, height} = req.body;

    try{
        const result = await pool.query(
            `INSERT INTO formulario
            (username, lastname, cc, edad, genero, weight, height)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [name, lastname, cc, edad, genero, weight, height]
        );
    
    res.json({
            message: 'Formulario guardado correctamente',
            imc: result.rows[0].imc,
            classe: result.rows[0].classe
        });    

    }catch (error){
        console.error(error);
    }
});

app.listen(3000, () => {
    console.log("conectao en http://localhost:3000");
});