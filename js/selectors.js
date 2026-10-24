import { state } from "./state.js";
export const getClient = (id) => {
    return state.clients.find(client => client.id === id);
};

export const getPlat = (id) => {
    return state.items.find(plat => plat.id === id);
};

export const getTotalCommande = (order) => {
    let total = 0;
    if (order && order.items) {
        order.items.forEach(item => {
            const plat = getPlat(item.platId);
            if (plat) {
                total += plat.price * item.quantite;
            }
        });
    }
    return total;
};

export const getVisibleOrders = () => {
    return state.orders.filter(order => {
        const client = getClient(order.clientId);
        const matchStatus = state.status === "all" || order.status === state.status;
        
        const matchSearch = (client && client.nom && state.search) 
            ? client.nom.toLowerCase().includes(state.search.toLowerCase()) 
            : true;

        return matchStatus && matchSearch;
    });
};