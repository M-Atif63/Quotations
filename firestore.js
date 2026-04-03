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
async function getQoute() {
    quoteList.innerHTML = ""
    const querySnapshot = await getDocs(dataColl);
    querySnapshot.forEach((doc) => {
        var li = document.createElement("li")
        li.textContent = `${doc.data().quote}`
        var editBtn = document.createElement("button")
        editBtn.textContent = "Edit"
        editBtn.addEventListener("click", function () {
            editQoute(doc.id, doc.data().quote)
        })
        var deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"
        deleteBtn.addEventListener("click", function () {
            deleteQoute(doc.id)
        })
        li.appendChild(editBtn)
        li.appendChild(deleteBtn)
        quoteList.appendChild(li)
    });
}
getQoute()

async function editQoute(id, oldQuote) {
    var newQuote = prompt("enter new quote", oldQuote)
    await updateDoc(doc(database, "quotes", id), {
        quote: newQuote
    })
}
getQoute()


async function deleteQoute(id) {
    await deleteDoc(doc(database, "quotes", id))
    getQoute()
}