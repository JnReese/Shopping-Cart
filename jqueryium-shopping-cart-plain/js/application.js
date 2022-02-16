document.addEventListener("DOMContentLoaded", function () {
  let itemInput = document.getElementById("itemInput");
  let priceInput = document.getElementById("priceInput");
  itemInput.addEventListener("keyup", handleAddButtonState);
  priceInput.addEventListener("keyup", handleAddButtonState);
  let newRowButton = document.getElementById("addButton");
  newRowButton.addEventListener("click", addNewItem);
  function updateRemoveButtons() {
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i];
    }
    button.addEventListener("click", function (event) {
      var buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove();
      totalUpCart();
    });
  }
  function handleAddButtonState() {
    let itemInputHasValue = Boolean(itemInput.value === 0 || itemInput.value);
    let priceInputHasValue = Boolean(
      priceInput.value === 0 || priceInput.value
    );
    if (itemInputHasValue && priceInputHasValue) {
      document.getElementById("addButton").disabled = false;
    } else {
      document.getElementById("addButton").disabled = true;
    }
  }
  function addNewItem() {
    const defaultItem = document.getElementById("defaultItem");
    let currentItemCount = document.getElementsByClassName("infoSector").length;
    let newItem = defaultItem.cloneNode(true);
    let itemValue = itemInput.value;
    let priceValue = priceInput.value;
    newItem.id = "item" + (currentItemCount + 1);
    newItem.querySelector("#defaultRow").innerHTML = itemValue;
    newItem.querySelector(".pricePerItem").innerHTML = priceValue;
    newItem
      .querySelector(".numberOfItems")
      .addEventListener("keyup", (event) => {
        quantityInputNodes = event.target;
        userQuantityInput = event.target.value;
        let userSetPrice =
          quantityInputNodes.parentElement.previousSibling.previousSibling
            .innerHTML;
        let newRowCost =
          quantityInputNodes.parentElement.nextSibling.nextSibling.innerHTML;
        factorInQuantity();
        function factorInQuantity() {
          newRowCost = userSetPrice * userQuantityInput;
          newItem.querySelector(".costOfItems").innerHTML = newRowCost;
          totalUpCart();
        }
      });
    document.getElementsByClassName("collumnsContainer")[0].append(newItem);
    itemInput.value = "";
    priceInput.value = "";
    updateRemoveButtons();
    handleAddButtonState();
  }
  function totalUpCart() {
    var rowCost = document.querySelectorAll(".costOfItems");
    var sumOfInputs = 0;
    var total = document.getElementById("finalCost");
    console.log(total);
    for (i = 1; i < rowCost.length; i++) {
      sumOfInputs += parseFloat(rowCost[i].innerHTML);
      total.innerHTML = sumOfInputs;
    }
  }
});
