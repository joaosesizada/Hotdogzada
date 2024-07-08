/*Basico hotdog e total*/
let hotDog = parseFloat(localStorage.getItem('hotdog')) || 0
let aumentoDeCt = 1.40
const hotDogClick = document.getElementById("click")
const qtnHotDog = document.getElementById("qtnHotDog")
const porSegHTML = document.getElementById("porSeg")

/*Função do Click*/ 
hotDogClick.addEventListener('click', function() {
    hotDog +=1
    qtnHotDog.innerHTML = `Hot Dogs: ${hotDog.toFixed(2)} `
})



/*Itens da Barraca*/ 
let barraca = document.getElementById("barraca")
let barracaCount = parseFloat(localStorage.getItem('barracaCount')) || 0
let barracaCusto = parseFloat(localStorage.getItem('barracaCusto')) || 30

const barracaNum = document.getElementById("numbarraca")
const custoBarracaHTML = document.getElementById("custobarraca")
/*Função barraca*/
barraca.addEventListener('click', function() {
    if (hotDog >= barracaCusto) {
        hotDog -= barracaCusto;
        barracaCount += 1;
        barracaCusto = Math.floor(barracaCusto * aumentoDeCt)
        barracaNum.innerHTML = `${barracaCount}`;
        qtnHotDog.innerHTML = `Hot Dogs: ${hotDog.toFixed(2)}`; 
        custoBarracaHTML.innerHTML = `Custo:${barracaCusto}`; 
    } else {
        window.alert("Faltam Hot Dogs para comprar essa construção");
    }
});


/*Itens Fabrica*/
let fabrica = document.getElementById("fabrica")
let fabricaCount = 0
let fabricaCusto = 130 
const fabricaNum = document.getElementById("numfabrica")
const custoFabricaHTML = document.getElementById("custofabrica")
/*Funções Fabrica*/
fabrica.addEventListener('click', function() {
    if (hotDog >= fabricaCusto) {
        hotDog -= fabricaCusto;
        fabricaCount += 1;
        fabricaCusto = Math.floor(fabricaCusto * aumentoDeCt)
        fabricaNum.innerHTML = `${fabricaCount}`;
        qtnHotDog.innerHTML = `Hot Dogs: ${hotDog.toFixed(2)}`;
        custoFabricaHTML.innerHTML = `Custo:${fabricaCusto}`;
    }else {
        window.alert("Faltam Hot Dogs para comprar essa construção");
    }
}) 


/*Dados para calculo barraca*/
let barracaSeg = 1

/*Funcao calculo barraca*/
function calculoBarraca() {
    if (item_HD_bonus_prata >= 1) {
        return barracaCount > 0 ? (barracaSeg * barracaCount) * TrintaPorcento :0;
    } else {
        return barracaCount > 0 ? barracaSeg * barracaCount :0;
    }
}


/*Dados para calculo fabrica*/
let fabricaSeg = 3

/*Funçaõ Calculo fabrica*/
function calculoFabrica() {
    return fabricaCount > 0 ? fabricaSeg * fabricaCount :0;
}

/*VERFICADOR E ATUALIDAOR*/

/*Calculo renda por seg*/
function calculoSeg () {
    let HDbarraca_seg = calculoBarraca()
    let HDfabrica_seg = calculoFabrica()
    let porSeg = HDbarraca_seg + HDfabrica_seg
    porSegHTML.innerHTML = `Por Segundo: ${porSeg.toFixed(2)}`
}

/*Timer calculo*/
function atualizarHD () {
    let HDbarraca = calculoBarraca();
    let HDfabrica = calculoFabrica();

    hotDog += HDbarraca + HDfabrica;
    qtnHotDog.innerHTML = `Hot Dogs: ${hotDog.toFixed(2)}`
}
setInterval(atualizarHD,1000);
setInterval(calculoSeg,300);

/*Puxando dados salvos ao carregar a pagina*/

function atualizandos_dados_salvos() {
    /*Dados da Barraca*/
    barracaNum.innerHTML = `${barracaCount}`;
    custoBarracaHTML.innerHTML = `Custo:${barracaCusto}`; 

    /*PARA BONUS*/
    /* Verificador para css */
    if (item_HD_bonus_prata == 1) {
        const elementToRemove = document.getElementById("HDnotBonus");
        if (!elementToRemove) { // Verifica se o elemento existe
        } else {
            elementToRemove.remove();;
        }}
}
window.addEventListener('load', atualizandos_dados_salvos)
/* FIM VERFICADOR E ATUALIDAOR*/

/*Funçao para bonmus*/

/*Itens de bonus*/
let item_HD_bonus_prata = parseFloat(localStorage.getItem('item_HD_bonus_prata')) || 0 //bonus para barraca
let TrintaPorcento = 1.30
/*Fim itens*/

function HD_bonus_prata() {
    if (hotDog >= 100 && barracaCount >= 5 && item_HD_bonus_prata < 1) {
        let HDbonus1 = document.getElementById("HDnotBonus");
        if (HDbonus1) { // Verifica se o elemento existe
            HDbonus1.id = 'HDbonus_prata';
        } else {
            console.error('Elemento não encontrado: HDnotBonus');
        }
    }
}
/*Comprando bonus Hot Dog prata*/
function CP_HD_bonus_prata() {
    if (hotDog >= 100 && barracaCount >= 5) {
        hotDog -= 100; // Modifica variáveis conforme necessário
        item_HD_bonus_prata++; // Modifica outras variáveis, se necessário

        // Remove o elemento com o ID HDbonus_prata
        const elementToRemove = document.getElementById("HDbonus_prata");
        if (elementToRemove) {
            elementToRemove.remove();
}}};


/*Timer*/
setInterval(HD_bonus_prata,1000)


/*Guardando dados*/

function guardando_dados(){
    /*Salvando hotdog*/
    localStorage.setItem('hotdog', hotDog);

    /*Salvando barraca*/
    localStorage.setItem('barracaCount', barracaCount);
    localStorage.setItem('barracaCusto', barracaCusto);

    /*Salvando bonus*/
    localStorage.setItem('item_HD_bonus_prata', item_HD_bonus_prata)
 }
 setInterval(guardando_dados,900000)

function limpando() {
    /*Removendo itens salvos*/
    localStorage.removeItem('hotdog');
    localStorage.removeItem('barracaCount');
    localStorage.removeItem('barracaCusto');
    localStorage.removeItem('item_HD_bonus_prata')
    window.location.reload();
}
function addhotdog() {
    hotDog += 200
}
 


/*Estilização para botao*
/
/*Let de posiçao do mouse*/
let isMouseOver = false
function updateStyle() {

    /*Barraca estilo*/
    if (!isMouseOver && hotDog >= barracaCusto) {
            barraca.style.background = '#4474db';
            custoBarracaHTML.style.color = '#4caf50';
    }
    else {
            barraca.style.background = '#8aa3da';
            custoBarracaHTML.style.color = '#ff0000';
    }

    /*Fabrica estilo*/
    if (!isMouseOver && hotDog >= fabricaCusto) {
        fabrica.style.background = '#4474db';
        custoFabricaHTML.style.color = '#4caf50';
    }
    else {
        fabrica.style.background = '#8aa3da';
        custoFabricaHTML.style.color = '#ff0000';
    }

}

setInterval(updateStyle,800)
/* Verifica se a condição é atendida a cada segundo */





/*Ajuste de tamanho para construções*/

function ajuste_height_construcoes() {
    const paiConstrucoes = document.getElementById("paiConstrucoes")
    const titulo_loja = document.getElementById("pai_titulo_loja")
    const bonuspai = document.getElementById("bonuspai")

    const Height_titulo_loja = titulo_loja.offsetHeight
    const Height_bonuspai = bonuspai.offsetHeight
    const windowHeight = window.innerHeight

    const Height_ajustada = windowHeight - Height_titulo_loja - Height_bonuspai -80

    paiConstrucoes.style.height = `${Height_ajustada}px`
}

window.addEventListener('load',ajuste_height_construcoes)

window.addEventListener('resize', ajuste_height_construcoes)


function ajuste_height_rp_construcoes() {
    const rp_construcoes = document.getElementById("pai_rp_construcoes")
    const paimenu = document.getElementById("menu")

    const height_paimenu = paimenu.offsetHeight;
    const windowHeight = window.innerHeight

    const Height_ajustada = windowHeight - height_paimenu - 70

    rp_construcoes.style.height = `${Height_ajustada}px`
}


window.addEventListener('load',ajuste_height_rp_construcoes)

window.addEventListener('resize', ajuste_height_rp_construcoes)
/*Fim de tamanho para construções*/
