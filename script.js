//quando clicco il bottone chiamo l'api del randomUser
const addBtn = document.getElementById("addUser");
addBtn.addEventListener('click', addUser);

//costruisco la funzione randomUser
function addUser() {
    //chiamo l'api con axios
    axios
        .get('https://randomuser.me/api')
        .then((response) => {
            //console.log(response.data.results[0]);
            createCard(response.data.results[0]);
        })
        .catch((error) => {
            console.log(error);
        });
}

//costruisco la card e la aggiungo al dom
function createCard(user) {
    //lo user che ho passato formalmente è il json che mi arriva da response.data -> posso accedere alle sue parti con la dot notation
    const firstName = user.name.first;
    const lastName = user.name.last;
    const cardTitle = firstName + " " + lastName;
    const cardText = user.email;
    const city = user.location.city;
    const state = user.location.state;
    const country = user.location.country;
    const textMuted = city + ", " + state + ", " + country;
    const picture = user.picture.large;

    //creo gli elementi del dom
    const cardContainer = createDomElement('div', 'col-4');
    const card = createDomElement('div', 'card');
    const img = createDomElement('img', 'card-img-top');
    img.src = picture;
    const cardBody = createDomElement('div', 'card-body');
    const cardTitleText = createDomElement('h5', 'card-title'); //cardTitle (nom+cognome)
    const cardTextContent = createDomElement('p', 'card-text'); //email
    const textMutedContent = createDomElement('p', 'card-text'); //contenitore per l'inidirzzo
    const effectiveTextMuted = createDomElement('small', 'text-muted'); //indirizzo
    cardTitleText.innerText = cardTitle;
    cardTextContent.innerText = cardText;
    effectiveTextMuted.innerText = textMuted;
    textMutedContent.appendChild(effectiveTextMuted);
    cardBody.appendChild(img);
    cardBody.appendChild(cardTitleText);
    cardBody.appendChild(cardTextContent);
    cardBody.appendChild(textMutedContent);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

    //aggiungo la card al gruppo di card del dom
    document.getElementById('card-group').appendChild(cardContainer);
}

//funzione di servizio che crea gli elementi del dom a partire dal tipo di card e dalle classi
function createDomElement(type, className) {
    const el = document.createElement(type);
    el.className = className;
    return el;
}