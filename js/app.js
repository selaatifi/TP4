import { state } from "./state.js";
import {
    fetchPlats,
    fetchClients,
    fetchOrders // pou changer les commande 
} from "./dataService.js";
import {
    renderItems,
    renderStats,
    renderCategoryCounts,
    renderItemDetail,
    renderOrders // pour afficher les commande 
} from "./view.js";
import { getVisibleOrders } from "./selectors.js"; // pour filter les commande
const searchInput     = document.querySelector("#searchInput");
const btnAll          = document.querySelector("#btnAll");
const categoryBtns    = document.querySelectorAll(".category-btn");
const availableOnly   = document.querySelector("#availableOnly");

const clientSearch    = document.querySelector("#clientSearch");

const menuContainer   = document.querySelector("#menuContainer");
const errorMessage    = document.querySelector("#errorMessage");

const statusBtns      = document.querySelectorAll(".status-btn");


const getVisibleItems = () => {
    return state.items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(state.search.toLowerCase());
        const matchesCategory = state.category === "all" || item.category === state.category;
        const matchesAvailable = !state.activeOnly || item.available;
        return matchesSearch && matchesCategory && matchesAvailable;
    });
};


const render = () => {
    const visibleItems = getVisibleItems();
    renderItems(visibleItems);
    renderStats(state.items);
    renderCategoryCounts(state.items);
    const visibleOrders = getVisibleOrders();
    renderOrders(visibleOrders);
};
searchInput.addEventListener("input", (e) => {
    state.search = e.target.value.trim();
    render();
});

btnAll.addEventListener("click", () => {
    state.category = "all";
    render();
});

categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        state.category = btn.dataset.category;
        render();
    });
});

availableOnly.addEventListener("change", (e) => {
    state.activeOnly = e.target.checked;
    render();
});

menuContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".dish-card");
    if (!card) return;
    const id = Number(card.dataset.id);
    const item = state.items.find(i => i.id === id);
    if (item) renderItemDetail(item);
});

statusBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        state.status = btn.dataset.status;
        render();
    });
});
const init = async () => {
    try {
        const [plats, clients, orders] = await Promise.all([
            fetchPlats(),
            fetchClients(),
            fetchOrders() 
        ]);

        state.items   = plats;
        state.clients = clients;
        state.orders  = orders; 
        render();

    } catch (error) {
        console.error(error);
        errorMessage.classList.remove("d-none");
    }
};

init();