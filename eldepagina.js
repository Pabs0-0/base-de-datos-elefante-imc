document.getElementById("form1").addEventListener("submit", async (e)=>{
    e.preventDefault();

    let gen=document.querySelector('input[name="genero"]:checked').value;

    const data={
        name: document.getElementById("1").value,
        lastname: document.getElementById("2").value,
        cc: document.getElementById("3").value,
        edad: document.getElementById("4").value,
        genero: gen,
        weight: document.getElementById("6").value,
        height: document.getElementById("7").value,
    }

    try{
        const res = await fetch("http://localhost:3000/formulario", {
            method:"POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.imc && result.classe) {
            alert(`Tu IMC es ${result.imc} (${result.classe})`);
        } else {
            alert(result.message || "Datos guardados");
        }

    }catch (error){
        console.error(error);
    }
    
});