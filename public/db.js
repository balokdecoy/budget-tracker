let db;
// create db request for budget database.
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
  // create object store called and set autoIncrement
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log("Error: " + event.target.errorCode);
};

function saveRecord(record) {

  const transaction = db.transaction(["pending"], "readwrite");

  const store = transaction.objectStore("pending");

  store.add(record);
}

function checkDatabase() {
 
  const transaction = db.transaction(["pending"], "readwrite");

  const store = transaction.objectStore("pending");

  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          // if successful, open a transaction on pending db
          const transaction = db.transaction(["pending"], "readwrite");
          // access pending object store
          const store = transaction.objectStore("pending");
          // clear all items in store
          store.clear();
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
