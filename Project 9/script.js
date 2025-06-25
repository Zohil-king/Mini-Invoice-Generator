const clientNameInput = document.getElementById("clientName");
const itemNameInput = document.getElementById("itemName");
const itemQtyInput = document.getElementById("itemQty");
const itemPriceInput = document.getElementById("itemPrice");
const addItemBtn = document.getElementById("addItem");
const displayClient = document.getElementById("displayClient");
const invoiceTableBody = document.querySelector("#invoiceTable tbody");
const totalAmount = document.getElementById("totalAmount");
const printBtn = document.getElementById("printBtn");

let itemCount = 0;
let total = 0;
let items = [];

function updateInvoice() {
  // Reset table and total
  invoiceTableBody.innerHTML = "";
  total = 0;

  items.forEach((item, index) => {
    const subtotal = item.qty * item.price;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${subtotal.toFixed(2)}</td>
      <td><button class="removeBtn" data-index="${index}">❌</button></td>
    `;
    invoiceTableBody.appendChild(row);
  });

  // VAT 5%
  const vat = total * 0.05;
  const grandTotal = total + vat;

  // Append total rows
  const vatRow = document.createElement("tr");
  vatRow.innerHTML = `
    <td colspan="4" style="text-align:right"><strong>VAT (5%)</strong></td>
    <td colspan="2"><strong>$${vat.toFixed(2)}</strong></td>
  `;
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td colspan="4" style="text-align:right"><strong>Total + VAT</strong></td>
    <td colspan="2"><strong>$${grandTotal.toFixed(2)}</strong></td>
  `;

  invoiceTableBody.appendChild(vatRow);
  invoiceTableBody.appendChild(totalRow);

  totalAmount.textContent = grandTotal.toFixed(2);

  // Attach remove events
  document.querySelectorAll(".removeBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-index"));
      items.splice(index, 1);
      updateInvoice();
    });
  });
}

addItemBtn.addEventListener("click", () => {
  const client = clientNameInput.value.trim();
  const item = itemNameInput.value.trim();
  const qty = parseInt(itemQtyInput.value);
  const price = parseFloat(itemPriceInput.value);

  if (!client || !item || isNaN(qty) || isNaN(price)) {
    alert("Please fill all fields with valid values.");
    return;
  }

  displayClient.textContent = client;

  items.push({ name: item, qty, price });
  updateInvoice();

  // Clear inputs after adding
  itemNameInput.value = "";
  itemQtyInput.value = "1";
  itemPriceInput.value = "";
});

printBtn.addEventListener("click", () => {
  window.print();
});
