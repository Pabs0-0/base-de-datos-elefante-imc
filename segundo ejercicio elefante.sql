CREATE TABLE formulario (
    id_user SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    lastname TEXT NOT NULL,
    cc TEXT NOT NULL,
    edad INT NOT NULL,
    genero TEXT NOT NULL,
    weight NUMERIC(5,2) NOT NULL,  /*el 5 es para: Número total de dígitos que puede almacenar. el 2 
	es el Número de dígitos que estarán después del punto decimal. (chatgpt dice que: con NUMERIC(5,2) 
	el valor máximo sería 999.99 y el mínimo -999.99)*/
    height NUMERIC(5,2) NOT NULL,
    imc NUMERIC(5,2),
	classe TEXT NOT NULL
);

CREATE OR REPLACE FUNCTION calcular_imc()
RETURNS TRIGGER AS $$
BEGIN
    NEW.imc := NEW.weight / ((NEW.height / 100) * (NEW.height / 100));

	IF NEW.imc<18.5 THEN
		NEW.classe='inferior al normal';
	ELSIF NEW.imc BETWEEN 18.5 AND 24.9 THEN
		NEW.classe='normal';
	ELSIF NEW.imc BETWEEN 25 AND 29.9 THEN
		NEW.classe='superior al normal';
	ELSE
		NEW.classe='obsesidad';
	END IF;
	
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_calcular_imc
BEFORE INSERT ON formulario
FOR EACH ROW
EXECUTE FUNCTION calcular_imc();

SELECT * FROM formulario;