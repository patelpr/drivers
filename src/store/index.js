import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import H from "../assets/fastpolylines.js";

Vue.use(Vuex);
function urltoFile(url, filename, mimeType) {
	return fetch(url)
		.then((res) => res.arrayBuffer())
		.then((buf) => new File([buf], filename, { type: mimeType }));
}

export default new Vuex.Store({
	state: {
		load: null,
		user: null,
		driver: null,
	},
	mutations: {
		storeUser(state, payload) {
			state.user = payload;
		},
		storeDriver(state, payload) {
			state.driver = payload;
		},
		storeLoad(state, payload) {
			state.load = payload;
		},
		storeLocation(state, payload) {
			state.location = payload;
		},
	},
	actions: {
		async setDriver({ commit, state, dispatch }) {
			await firebase
				.firestore()
				.collection("drivers")
				.where("email", "==", state.user.email)
				.onSnapshot((doc) => {
					doc.forEach((nd) => {
						const driver = nd.data();

						nd.exists && commit("storeDriver", driver);
						dispatch("setLoad", driver);
					});
				});
		},
		async setLoad({ commit, state }, driver) {
			let stat = state;
			console.log(stat);
			await firebase
				.firestore()
				.collection("users")
				.doc(driver.carrier)
				.collection("loads")
				.where("driver", "==", driver.id)
				.onSnapshot((doc) =>
					doc.forEach((nd) => {
						let load = nd.data();
						load.poly = H.decode(load.route.geometry.coordinates).polyline;
						commit("storeLoad", load);
						console.log(load);
					})
				);
		},
		async updateLocation({ dispatch, state }, { coords }) {
			await firebase
				.firestore()
				.collection("drivers")
				.doc(state.driver.id)
				.update({
					location: { lat: coords.latitude, lng: coords.longitude },
				});
			dispatch("setDriver");
		},
		async uploadToStorage({ state }, { file, data = "receipt" }) {
			urltoFile(file, `${data}.png`, "image/png").then((file) =>
				firebase
					.storage()
					.ref()
					.child(`${state.load.id}/${data}.png`)
					.put(file)
					.then((snapshot) => {
						console.log("Uploaded a blob or file!", snapshot);
					})
			);
		},

		// async updateDriver({ dispatch, state }, payload) {
		// 	await firebase
		// 		.firestore()
		// 		.collection("drivers")
		// 		.doc(state.driver.id)
		// 		.update(payload);
		// 	dispatch("setDriver");
		// },
		// async updateLoad({ dispatch, state }, payload) {
		// 	await firebase
		// 		.firestore()
		// 		.collection("users")
		// 		.doc(state.driver.carrier)
		// 		.collection("loads")
		// 		.doc(state.load.id)
		// 		.update(payload);
		// 	dispatch("setLoad");
		// },
	},
	getters: {
		getCurrentUser: (state) => state.user,
		getCurrentDriver: (state) => state.driver,
		getCurrentLoad: (state) => state.load,
		getDriverLocation: (state) => state.driver.location,
		getPoly: (state) => state.load.poly,
	},
});
