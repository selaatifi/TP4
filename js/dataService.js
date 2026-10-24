// cette partie pour récupérer les donner qui sont dans data json 
export const fetchPlats = async () => { //async permet d'utiliser await dedans
    try {
        const response = await fetch("data/plats.json");
         return response.json();

    } catch (error) {
        console.error(
            "Impossible de charger les plats."
        );
        
    }
}
// remarque:
//response.ok : vaut true si le serveur a renvoyé un statut HTTP de réussite
//throw new Error(...) : signaler une erreur et =>existe déjà en JavaScript

export const fetchClients = async () => {
    const response = await fetch("data/clients.json");// fetche envoie  une requête HTTP et  await attends la réponse avant de continuer
    if (!response.ok) {
        throw new Error("impossible de charger les clients.");
    }
    return response.json();//response.json() ou JSON.parse(texte) c'est le méme mais response.json lit et convertit vers objet JavaScript
}
// sa pour ordrs 
export const fetchOrders = async () => {
    const response = await fetch("data/orders.json");
    if (!response.ok) throw new Error("Impossible de charger les commandes.");
    return response.json();
};