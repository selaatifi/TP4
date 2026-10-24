// Récupérer les éléments HTML
// document.querySelector():Cette méthode permet de rechercher un élément HTML dans la page et de le récupérer en JavaScript
const menuContainer = document.querySelector("#menuContainer");//Contient les cartes des plats
const resultCount = document.querySelector("#resultCount");//Affiche le nombre de plats affichés
const noResults = document.querySelector("#noResults");//Affiche un message lorsqu'il n'y a aucun résultat

const totalItems      = document.querySelector("#totalItems");//Affiche le nombre total de plats
const availableItems  = document.querySelector("#availableItems");//Affiche le nombre de plats disponibles
const categoryCount   = document.querySelector("#categoryCount");//Affiche le nombre de catégories présentes
const averagePrice    = document.querySelector("#averagePrice");//Affiche le prix moyen

const pizzaCount      = document.querySelector("#pizzaCount");//Affiche le nombre de pizzas
const burgerCount     = document.querySelector("#burgerCount");//Affiche le nombre de burgers
const saladeCount     = document.querySelector("#saladeCount");//Affiche le nombre de salades
const dessertCount    = document.querySelector("#dessertCount");//Affiche le nombre de desserts
// On importe les fonctions du fichier selectors.js pour relier les données
import { getClient, getTotalCommande } from "./selectors.js";

// On récupère la div qui va contenir les commandes (ajoutée dans index.html)
const ordersContainer = document.querySelector("#ordersContainer");



// elle permet de construire visuellement chaque plat 
//Elle reçoit un plat et fabrique le code HTML de sa carte.
//Prend un objet dish en paramètre
//Renvoie une chaîne de caractères HTML (avec les backticks `)



const createDishCard = (dish) => `

    <div class="col-md-6 col-lg-4">

        <div class="dish-card ${dish.available ? '' : 'unavailable'}"
             data-id="${dish.id}">

            <div class="dish-img">
                <img
                    src="${dish.image}"
                    alt="${dish.name}"
                    loading="lazy"
                    onerror="this.parentElement.classList.add('no-img'); this.remove();"
                >
            </div>

            <div class="dish-body">

                <h5 class="dish-name">${dish.name}</h5>

                <p class="dish-desc">${dish.description}</p>

                <div class="dish-footer">

                    <span class="dish-price">
                        ${dish.price} <small>DH</small>
                    </span>

                    <span class="dish-status ${dish.available ? 'status-ok' : 'status-no'}">
                        ${dish.available ? 'Dispo' : 'Épuisé'}
                    </span>

                </div>

            </div>

        </div>

    </div>
`;
//dish = une variable qui contient un objet plat.
//dish.available Propriété JS True ou false
// si true  La classe finale est dish-card
// si faule  La classe finale est dish-card unavailable
//data-id="${dish.id}"	Attribut personnalisé	Pour stocker l'id



// Affichage des plats


export const renderItems = (items) => {

    resultCount.textContent = `${items.length} plat(s) affiché(s)`;

    if (items.length === 0) {
        menuContainer.innerHTML = "";
        noResults.classList.remove("d-none");
        return;
    }
    noResults.classList.add("d-none");
    menuContainer.innerHTML = items.map(createDishCard).join("");

};
//items.length donne le nombre de plats dans la liste
//d-none est une classe Bootstrap qui cache un élément
//La méthode map() prend chaque plat et lui applique la fonction createDishCard
//join("") les rassemble en une seule chaîne de caractères, sans ajouter de séparateur entre eux.
//items.map(createDishCard) → transforme chaque objet plat en HTML


// Statistiques


export const renderStats = (items) => {

    totalItems.textContent = items.length;

    const disponibles = items.filter(i => i.available);
    availableItems.textContent = disponibles.length;

    const cats = [...new Set(items.map(i => i.category))];
    categoryCount.textContent = cats.length;

    let somme = 0;
    items.forEach(i => somme += i.price);

    const moyenne = items.length > 0
        ? Math.round(somme / items.length)
        : 0;

    averagePrice.textContent = `${moyenne} DH`;

};
// Compteurs par catégorie
export const renderCategoryCounts = (items) => {

    const countBy = (cat) =>
        items.filter(i => i.category === cat).length;

    pizzaCount.textContent   = `${countBy("Pizza")} plats`;
    burgerCount.textContent  = `${countBy("Burger")} plats`;
    saladeCount.textContent  = `${countBy("Salade")} plats`;
    dessertCount.textContent = `${countBy("Dessert")} plats`;

};
// Modal

const itemModal = new bootstrap.Modal(
    document.querySelector("#itemModal")
);

const modalTitle       = document.querySelector("#modalTitle");
const modalName        = document.querySelector("#modalName");
const modalCategory    = document.querySelector("#modalCategory");
const modalPrice       = document.querySelector("#modalPrice");
const modalAvailable   = document.querySelector("#modalAvailable");
const modalDescription = document.querySelector("#modalDescription");


const modalImage = document.querySelector("#modalImage");  

export const renderItemDetail = (item) => {

    modalTitle.textContent       = `Détail : ${item.name}`;
    modalImage.src               = item.image;              
    modalImage.alt               = item.name;               
    modalName.textContent        = item.name;
    modalCategory.textContent    = item.category;
    modalPrice.textContent       = `${item.price} DH`;
    modalAvailable.textContent   = item.available ? "Disponible" : "Indisponible";
    modalDescription.textContent = item.description;

    itemModal.show();

};
export const renderOrders = (orders) => {
    if (!ordersContainer) return;

    // Si aucune commande ne contiant pas dans le filtre 
    if (orders.length === 0) {
        ordersContainer.innerHTML = `<p class="text-muted text-center w-100">Aucune commande trouvée.</p>`;
        return;
    }

    // on utilise map() pour transeform les elemnt en html
    ordersContainer.innerHTML = orders.map(order => {
        // on récupire les élémnt avec sont ID 
        const client = getClient(order.clientId);
        
        // on calcul total grace a le prix du plats
        const total = getTotalCommande(order);
        
        // la couleur du bg
        let badgeClass = "status-attente";
        if (order.status === "Livrée") badgeClass = "status-livree";
        if (order.status === "Annulée") badgeClass = "status-annulee";

        //on génére la carte html
        return `
        <div class="col-md-6 col-lg-4">
            <div class="dish-card" style="padding: 20px;">
                
                <h5 class="dish-name">Commande #${order.id}</h5>
                
                <p class="dish-desc">
                    <strong>Client :</strong> ${client ? client.nom : "Inconnu"}<br>
                    <strong>Ville :</strong> ${client ? client.ville : "-"}<br>
                    <strong>Date :</strong> ${order.date}
                </p>

                <div class="dish-footer">
                    <span class="dish-price">${total} <small>DH</small></span>
                    <span class="client-status ${badgeClass}">${order.status}</span>
                </div>
                
            </div>
        </div>
        `;
    }).join("");
};