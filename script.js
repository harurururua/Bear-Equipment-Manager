document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#equipmentTable tbody');
  const addBtn = document.getElementById('addBtn');
  const equipmentTypeInput = document.getElementById('equipmentType');
  const equipmentStatusSelect = document.getElementById('equipmentStatus');

  // Add new row
  addBtn.addEventListener('click', () => {
    const equipmentType = equipmentTypeInput.value.trim();
    const equipmentStatus = equipmentStatusSelect.value;

    if (!equipmentType) {
      alert('비품 종류를 입력해주세요.');
      return;
    }

    const newRow = createRow(equipmentType, equipmentStatus);
    tableBody.appendChild(newRow);
    sortTable(); // 자동 정렬
    equipmentTypeInput.value = '';
  });

  // Create a new row
  function createRow(type, status) {
    const newRow = document.createElement('tr');
    newRow.dataset.status = status;

    newRow.innerHTML = `
      <td>${type}</td>
      <td class="status-cell ${status}">
        <select class="status-dropdown">
          <option value="sufficient" ${status === 'sufficient' ? 'selected' : ''}>충분</option>
          <option value="insufficient" ${status === 'insufficient' ? 'selected' : ''}>부족</option>
        </select>
      </td>
      <td><button class="delete-btn">삭제</button></td>
    `;

    attachRowHandlers(newRow);
    return newRow;
  }

  // Attach handlers to row elements
  function attachRowHandlers(row) {
    const deleteBtn = row.querySelector('.delete-btn');
    const statusDropdown = row.querySelector('.status-dropdown');

    // Delete row
    deleteBtn.addEventListener('click', () => {
      row.remove();
    });

    // Update status and re-sort
    statusDropdown.addEventListener('change', (e) => {
      const newStatus = e.target.value;
      row.dataset.status = newStatus;

      // Update cell class and background
      const statusCell = row.querySelector('.status-cell');
      statusCell.className = `status-cell ${newStatus}`;

      sortTable(); // 자동 정렬
    });
  }

  // Sort table rows automatically
  function sortTable() {
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    rows.sort((a, b) => {
      return a.dataset.status === 'insufficient' && b.dataset.status === 'sufficient' ? -1 : 1;
    });
    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
  }

  // Initial setup: attach handlers to existing rows
  Array.from(tableBody.querySelectorAll('tr')).forEach(attachRowHandlers);
});