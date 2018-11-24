const firebase = require('firebase')
const config = {
	apiKey: "AIzaSyAcIFJAkCSk_RhODZVlmpga_msPQ7AnWQA",
	authDomain: "http://localhost:3000",
	databaseURL: "https://ouradventures-1542167907279.firebaseio.com",
	projectId: "ouradventures-1542167907279",
	storageBucket: "ouradventures-1542167907279.appspot.com",
};
firebase.initializeApp(config);
export default firebase;