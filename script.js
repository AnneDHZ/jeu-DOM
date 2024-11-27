
//  cases
let nbCases = window.prompt("combien de cases voulez vous?", 2);
// demande le nombre de boites voulues, valeur par défaut 2

let timer = 60000;
let interval;
const timerDisplay = document.getElementById('timer');


// Fonction pour démarrer le minuteur
function startTimer() {
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(function() {
        timer -= 1000;  // Décrémentation de 1 seconde (1000 ms)

        // Calcul des minutes et secondes restantes
        let minutes = Math.floor(timer / 60000);
        let seconds = Math.floor((timer % 60000) / 1000);

        // Formatage du temps affiché (minutes:secondes)
        let result = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerDisplay.innerHTML = result;

        // Arrêter le minuteur lorsque le temps est écoulé
        if (timer <= 0) {
            clearInterval(interval);
            timerDisplay.innerHTML = "Temps écoulé!";
        }
    }, 1000);  // Le minuteur se répète toutes les secondes (1000 ms)
}




function shuffleChildren(parent){
    let children= parent.children;
    let i = children.length, k, temp;
    while (--i > 0){
        k= Math.floor(Math.random() * (i+1));
        temp= children[k];
        children[k] = children [i];
        parent.appendChild(temp)
    }
}

function showReaction(type, clickedBox){
    clickedBox.classList.add(type);
    if (type !== "success"){
        setTimeout(function(){
            clickedBox.classList.remove(type)
        }, 800);
    }
}

const box = document.createElement("div");
box.classList.add("box");        

const board = document.querySelector("#board");

let nb =1;

// définit le nb de cases clônées  ici nbCases (avec la variable let nbCases)
for (let i = 1; i <=nbCases; i++){
    let newBox = box.cloneNode();
    newBox.innerText = i;
    board.appendChild(newBox);
    
    // newBox.addEventListener("mouseover", function(){
    //     newBox.style.cursor = "pointer";
    // })
    // soit ici, soit il est dans le CSS sur .box

    // définit ce qu'il se passe lorsqu'on clique sur les cases, normalement dans l'ordre
    newBox.addEventListener("click", function(){
        if(i == nb){
            newBox.classList.add("box-valid");

            if(nb == board.children.length){
                board.querySelectorAll(".box").forEach(function(box){
                    showReaction("success", box);
                });
            }
            nb++;
            shuffleChildren(board);
            }
            else if (i> nb){
                showReaction("error", newBox);
                nb =1;
                board.querySelectorAll(".box-valid").forEach(function(validBox){
                    validBox.classList.remove("box-valid");
                });
                shuffleChildren(board);
            }
            
                else{
                    showReaction("notice", newBox);
                }
            })    
        }

// sans la fonction shuffleChildren
// let i = board.children.length, k, temp;
// while (--i >0){
//     k = Math.floor(Math.random()* (i+1));
//     temp = board.children[k];
//     board.children[k] = board.children[i];
//     board.appendChild(temp);
// }


shuffleChildren(board);

// Démarrer le minuteur automatiquement dès que les cases sont créées
startTimer();
