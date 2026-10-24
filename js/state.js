export const state = { // export permettre a uen fichier js d'uttilisier cette varaible

    items: [],     //Tableau vide au démarrage sera rempli après le fetch des plats
    search: "",   //	Texte de recherche vide au départ
    category: "all",  //Aucune catégorie sélectionnée => on affiche tout
    activeOnly: false,  //On n'affiche pas seulement les dispos par défaut

    clients: [], //	Tableau vide des clients — rempli après le fetch
    clientSearch: "", //Recherche client vide au départ 
    ordrs:[],  // le tabaus qui va stocker les commendes de orders.json 
    status: "all"  // sa le filtre pour les commande 

}