const JUROS_LUCRA = 0.03072;
const JUROS_CONCORRENCIA = 0.04999;

function getJurosFinal(jurosBase, modo, retorno) {
    const modoOperator = modo ? 1 : -1;
    return jurosBase + (retorno / 100) * modoOperator;
}

function updateDisplay(selector, value) {
    document.querySelector(selector).textContent = value;
}

function calculateSimulation() {
    const parcelas = parseInt(document.getElementById("parcelas").value);
    const valor = parseFloat(document.getElementById("receber").value);
    const modo = document.getElementById("modo").checked;
    const retorno = modo ? parseFloat(document.getElementById("retorno").value) : 0;

    document.getElementById('retorno').disabled = !modo;

    const jurosFinalLucra = getJurosFinal(JUROS_LUCRA, modo, retorno);
    const valorFinalLucra = valor * (1 + jurosFinalLucra);
    
    updateDisplay(".output.lucra .display_value", "R$ " + valorFinalLucra.toFixed(2));
    updateDisplay(".output.lucra .tax", "Taxa: " + (JUROS_LUCRA * 100).toFixed(3) + "%");

    document.querySelectorAll(".output .little").forEach((element) => {
        element.textContent = modo ? "O comprador vai pagar" : "O vendedor vai receber";
    });

    updateDisplay("#call_to_action .call_text", 
        modo ? "Seu cliente paga menos e você LUCRA+" : "Com sua maquininha, você economiza e LUCRA+");

    const jurosFinalConcorrencia = getJurosFinal(JUROS_CONCORRENCIA, modo, retorno);
    const valorFinalConcorrencia = valor * (1 + jurosFinalConcorrencia);
    
    updateDisplay(".output.concorrencia .display_value", "R$ " + valorFinalConcorrencia.toFixed(2));
    updateDisplay(".output.concorrencia .tax", "Taxa: 5%");
    updateDisplay(".value", "+ R$ " + (valorFinalLucra - valorFinalConcorrencia).toFixed(2));
}

document.getElementById("simulador").addEventListener("change", calculateSimulation);
document.getElementById("retorno").addEventListener("change", calculateSimulation);
document.getElementById("receber").addEventListener("input", calculateSimulation);
calculateSimulation();
