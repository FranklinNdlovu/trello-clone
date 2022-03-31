import { createStore } from "vuex";

export default createStore({
  state: {
    overlay: false,
    lastListId: 0,
    lastCardId: 0,
    currentData: null,
    lists: [],
    cards: [],
  },
  getters: {
    lastListId(state) {
      return state.lastListId;
    },
    lastCardId(state) {
      return state.lastCardId;
    },
    lists(state) {
      return state.lists;
    },
    cards(state) {
      return state.cards;
    },
    overlay(state) {
      return state.overlay;
    },
    currentData(state) {
      return state.currentData;
    },
  },
  mutations: {
    createNewList(state, payload) {
      state.lastListId++;
      const list = {
        id: state.lastListId,
        name: payload,
      };
      state.lists.push(list);
    },
    createNewCard(state, payload) {
      state.lastCardId++;
      const card = {
        listId: payload.listId,
        id: this.lastCardId,
        name: payload.name,
      };
      state.cards.push(card);
    },
    toggleOverlay(state) {
      state.overlay = !state.overlay;
    },
    openForm(state, payload) {
      state.currentData = payload;
    },
    saveCard(state, payload) {
      state.cards = state.cards.map((card) => {
        if (card.id === payload.id) {
          return Object.assign({}, card, payload);
        }
        return card;
      });
    },
    deleteCard(state, payload) {
      const indexToDelete = state.cards
        .map((card) => card.id)
        .indexOf(payload.id);
      state.cards.splice(indexToDelete, 1);
    },
  },
  actions: {
    createList(context, payload) {
      context.commit("createNewList", payload);
    },
    createCard(context, payload) {
      context.commit("createNewCard", payload);
    },
    toggleOverlay(context) {
      context.commit("toggleOverlay");
    },
    openForm(context, payload) {
      context.commit("openForm", payload);
    },
    saveCard(context, payload) {
      context.commit("saveCard", payload);
    },
    deleteCard(context, payload) {
      context.commit("deleteCard", payload);
    },
  },
  modules: {},
});
