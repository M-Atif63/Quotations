import {
    initializeApp,
    firebaseConfig,
    getFirestore,
    doc,
    setDoc,
    serverTimestamp,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc
} from "./firebase.js";

const app = initializeApp(firebaseConfig)
console.log("app=>", app)
const database = getFirestore(app)
console.log("database=>", database)

var quoteBtn = document.getElementById("quoteBtn")
quoteBtn.addEventListener("click", addQuote)

var quoteInput = document.getElementById("quoteInput")
var quoteList = document.getElementById("quoteList")

async function addQuote() {
var dataColl = doc(database, "quotes", "1")
    await setDoc(dataColl, {
        QuoteMess: quoteInput.value,
        time:serverTimestamp()
    });
}
var dataColl = collection(database, "quotes")

quoteBtn.addEventListener("click", setQuote)
async function setQuote() {
    await addDoc((dataColl), {
        quote: quoteInput.value,
        time: serverTimestamp()
    })
    getQoute()
}
