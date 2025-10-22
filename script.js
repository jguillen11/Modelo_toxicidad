const threshold = 0.5;
let modeloToxicidad;

toxicity.load(threshold).then(model => {
    modeloToxicidad = model;
    console.log("Modelo de toxicidad cargado correctamente.");
});

    document.getElementById("btnClasificar").addEventListener("click", async () => {
    const textoInput = document.getElementById("textoEntrada");    
    const texto = document.getElementById("textoEntrada").value.trim();
    if (!texto) {
        alert("Por favor ingresa un texto para clasificar.");
        return;
    }

    const predictions = await modeloToxicidad.classify([texto]);
    mostrarResultados(texto, predictions);

    textoInput.value = "";
});

function mostrarResultados(texto, predictions) {
    const tbody = document.getElementById("tablaResultados");
    const fila = document.createElement("tr");
    fila.innerHTML = `<td class="table-light">${texto}</td>`;

    const etiquetas = [
        "identity_attack",
        "insult",
        "obscene",
        "severe_toxicity",
        "sexual_explicit",
        "threat",
        "toxicity"
    ];

    etiquetas.forEach(label => {
        const prediccion = predictions.find(p => p.label === label);
        const match = prediccion?.results[0].match;
        const color = match ? "text-danger fw-bold" : "text-success";
        const textoCelda = match === null ? "null" : match.toString();
        fila.innerHTML += `<td class="${color}">${textoCelda}</td>`;
    });

    tbody.appendChild(fila);
}
