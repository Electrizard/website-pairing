let people = [];

updatePairLabel();


function addPerson(){
    const nameInput = document.getElementById("nameInput");
    const namesList = document.getElementById("namesList");

    let name = nameInput.value;
    if(name == ""){
        console.log("no name")
        return;
    }
    people.push(name);
    updatePairLabel();
    const personDiv = document.createElement("div");
    personDiv.classList.add("person");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = `● ${name}`;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("person-btn");
    removeBtn.textContent = "X";
    removeBtn.onclick = function () {
        personDiv.remove()
        people.splice(people.indexOf(name), 1);
        updatePairLabel();
    };
    
    personDiv.appendChild(nameSpan);
    personDiv.appendChild(removeBtn);

    namesList.append(personDiv);

    nameInput.value = "";

}


function disableBtn(){
    const btn = document.getElementById("createBtn");
    btn.style.disabled = "true";
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
}

function enableBtn(){
    const btn = document.getElementById("createBtn");
    btn.style.disabled = "false";
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
}

function updatePairLabel(){
    let num = people.length;
    const totalPpl = document.getElementById("totalPplLabel");
    const subLabel = document.getElementById("totalPplSublabel");

    totalPpl.textContent = `Total People: ${num}`;
    if(num == 0){
        disableBtn();
        subLabel.textContent = "Add people to start pairing";
    }
    else if(num % 2 == 0){
        enableBtn();
        subLabel.textContent = `Ready to pair ${num} people`;
    }
    else{
        disableBtn();
        subLabel.textContent = "Add one more person to start pairing"
    }
    
}


function createPairs(){
    clearPairs();
    //newPeople is created so the amount of times the for loop runs isnt affected
    let newPeople = people.slice();
    let pairList = [];
    for(let i =0; i< people.length; i++){
        let index = Math.floor(Math.random() * newPeople.length);
        pairList.push(newPeople[index]);
        newPeople.splice(index, 1);
    }


    for(let i=0; i<pairList.length/2; i++){
        const pairDiv = document.createElement("div");
        pairDiv.classList.add("pair");

        const pairNames = document.createElement("h1");
        pairNames.textContent = `${pairList[i * 2]} & ${pairList[i * 2 + 1]}`;

        const pairNum = document.createElement("p");
        pairNum.textContent = `Pair ${i + 1}`;

        pairDiv.appendChild(pairNames);
        pairDiv.appendChild(pairNum);
        document.getElementById("pairsDiv").append(pairDiv);
    }

    document.getElementById("createdPairs").textContent = `Created Pairs (${pairList.length/2})`;
}


function clearPairs(){
    const pairs = document.querySelectorAll(".pair");
    pairs.forEach((pair) => {
        pair.remove();
    });
}

document.getElementById("nameInput").addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        addPerson();
    }
});