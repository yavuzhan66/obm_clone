
function saveService(service){
  localStorage.setItem("service", JSON.stringify(service));
}



function getService() {
        let service = localStorage.getItem("service");
        if (service == null) {
            return [];
        } else {
            service = JSON.parse(service);
        }
    }


   




//ajouter un service
function addService(product) {
  let service = getService();
  let foundProduct = service.find(p => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity++;
  } else {
    product.quantity = 1;
    service.push(product);
  }
  saveService(service);
}


//retirer un service 
function removeFromService(product) {
  let service = getService();

  service = service.filter(p => p.id == product.id);
  saveService(service);
}


//changer la quantite du service
function changeQuantity(product, quantity) {
  let service = getService();
  let foundProduct = service.find(p => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
        removeFromService(foundProduct);
    } else {
        saveService(service);
    }
  }
}


//calculer la quantité
function getNumberProduct() {
  let service = getService();
let number = 0;
for(let product of service) {
    number += product.quantity;
}
return number;

}


//le prix des service
function getTotalPrice() {
  let service = getService();
let total = 0;
for (let product of service) {
    total =+ product.quantity * product.price
}
return total;
}

