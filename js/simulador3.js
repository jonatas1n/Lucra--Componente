const TAX_FACTOR = 1.62727;

function getJurosFinal(concorrencia, modo, retorno, bandeira, parcelas, plano) {
    let tax = taxas[plano][bandeira][parcelas];
    
    if (concorrencia) {
        tax *= TAX_FACTOR;
    }

    const modoOperator = modo ? 1 : -1;
    return (tax + (retorno / 100)) * modoOperator;
}

// Update the DOM element with the provided selector
function updateDisplay(selector, value) {
    document.querySelector(selector).textContent = value;
}

// Calculate the final value based on the tax
function calculateFinalValue(valor, jurosFinal) {
    return valor * (1 + jurosFinal);
}

// Main calculation and display logic
function calculateSimulation() {
    const parcelas = parseInt(document.getElementById("parcelas").value);
    const bandeira = document.getElementById('bandeira').value;
    const valor = parseFloat(document.getElementById("receber").value);
    const modo = document.getElementById("modo").checked;
    const retorno = modo ? parseFloat(document.getElementById("retorno").value) : 0;
    const plano = document.getElementById("plano").value;
    const slogan = document.querySelector("#call_to_action .slogan");

    document.getElementById('retorno').disabled = !modo;

    const jurosFinalLucra = getJurosFinal(false, modo, retorno, bandeira, parcelas, plano);
    const valorFinalLucra = calculateFinalValue(valor, jurosFinalLucra);
    
    updateDisplay(".output.lucra .display_value", `R$ ${valorFinalLucra.toFixed(2)}`);
    updateDisplay(".output.lucra .tax span.val", (Math.abs(jurosFinalLucra) * 100).toFixed(3));

    document.querySelector("#output-title").textContent = modo
        ? "O cliente paga"
        : "O vendedor recebe";

    slogan.className = modo ? "slogan" : "slogan hide";

    updateDisplay("#call_to_action .call_text", 
        modo ? "Com sua maquininha, seu cliente paga menos e você lucra+" : "Com sua maquininha, você economiza e Lucra+");

    const jurosFinalConcorrencia = getJurosFinal(true, modo, retorno, bandeira, parcelas, plano);
    const valorFinalConcorrencia = calculateFinalValue(valor, jurosFinalConcorrencia);
    
    updateDisplay(".output.concorrencia .display_value", `R$ ${valorFinalConcorrencia.toFixed(2)}`);
    updateDisplay(".output.concorrencia .tax span.val", (Math.abs(jurosFinalConcorrencia) * 100).toFixed(3));
    
    const difference = valorFinalLucra - valorFinalConcorrencia;
    updateDisplay(".value", `${modo ? '-' : '+'} R$ ${Math.abs(difference.toFixed(2))}`);
}

// Attach event listeners
document.getElementById("simulador").addEventListener("change", calculateSimulation);
document.getElementById("retorno").addEventListener("change", calculateSimulation);
document.getElementById("receber").addEventListener("input", calculateSimulation);

// Initial calculation
calculateSimulation();