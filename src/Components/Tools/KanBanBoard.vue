<template>
  <div class="drag-container">
    <div class="drag-list">
      <div
          v-for="(list, index) in lists"
          :key="list.name"
          :class="`drag-column ${list.class}`"
          @dragenter="dragEnter(index)"
          @drop="drop"
          @dragover="allowDrop"
      >
        <div class="header">
          <h1>{{ list.name }}</h1>
        </div>
        <ul class="drag-item-list custom-scroll" :id="list.id">
          <li
              v-for="(item, itemIndex) in list.items"
              :key="itemIndex"
              class="drag-item"
              draggable="true"
              @dragstart="dragStart($event, index, itemIndex)"
              contenteditable="true"
              @focusout="updateItem(index, itemIndex, $event)"
          >
            {{ item }}
          </li>
        </ul>
        <div class="add-btn-group">
          <button class="add-btn" @click="showInputBox(index)">
            <span class="plus-sign">+</span>Add Item
          </button>
        </div>
        <div class="add-container" :ref="el => addContainers[index] = el">
          <textarea v-model="newItem" class="add-item"></textarea>
          <button class="solid" @click="hideInputBox(index)">Save Item</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

/**
 * KanBanBoard Vue component for managing a Kanban board with drag and drop functionality.
 * @name KanBanBoard
 * @component
 */
export default defineComponent({
  name: 'KanBanBoard',
  setup() {
    // Define reactive references
    const lists = ref([
      {
        name: "Backlog",
        id: "backlog-list",
        class: "backlog-column",
        items: [],
      },
      {
        name: "In Progress",
        id: "progress-list",
        class: "progress-column",
        items: [],
      },
      {
        name: "Complete",
        id: "complete-list",
        class: "complete-column",
        items: [],
      },
      {
        name: "On Hold",
        id: "on-hold-list",
        class: "on-hold-column",
        items: [],
      },
    ]);

    // Reactive variables for dragging and dropping functionality
    let draggedItem = ref(null);
    let currentColumn = ref(null);
    const addContainers = ref([]); // Store references to addContainers
    const newItem = ref(''); // Bind to the input value

    // Lifecycle hook to load saved columns from localStorage
    onMounted(() => {
      getSavedColumns();
    });

    /**
     * Retrieves saved columns from localStorage and populates the lists.
     */
    const getSavedColumns = () => {
      const savedLists = ["backlogItems", "progressItems", "completeItems", "onHoldItems"];
      savedLists.forEach((list, index) => {
        if (localStorage.getItem(list)) {
          lists.value[index].items = JSON.parse(localStorage.getItem(list));
        } else {
          // Default values
          lists.value[index].items = [
            index === 0 ? "Work on CV" : "",
            index === 1 ? "Work on projects" : "",
            index === 2 ? "Try this out" : "",
            index === 3 ? "Drag and drop" : "",
          ];
        }
      });
    };

    /**
     * Updates localStorage with the current state of columns.
     */
    const updateSavedColumns = () => {
      const savedLists = ["backlogItems", "progressItems", "completeItems", "onHoldItems"];
      savedLists.forEach((list, index) => {
        localStorage.setItem(list, JSON.stringify(lists.value[index].items));
      });
    };

    /**
     * Initiates dragging of an item.
     * @param {DragEvent} event - The drag event.
     * @param {number} columnIndex - Index of the column.
     * @param {number} itemIndex - Index of the item.
     */
    const dragStart = (event, columnIndex, itemIndex) => {
      draggedItem.value = {
        item: lists.value[columnIndex].items[itemIndex],
        columnIndex: columnIndex,
        itemIndex: itemIndex,
      };
      event.dataTransfer.effectAllowed = "move";
    };

    /**
     * Handles drag enter event.
     * @param {number} columnIndex - Index of the column.
     */
    const dragEnter = (columnIndex) => {
      currentColumn.value = columnIndex;
    };

    /**
     * Allows dropping of dragged item.
     * @param {DragEvent} event - The drop event.
     */
    const allowDrop = (event) => {
      event.preventDefault();
    };

    /**
     * Handles dropping of dragged item into a new column.
     * @param {DragEvent} event - The drop event.
     */
    const drop = (event) => {
      event.preventDefault();
      if (draggedItem.value !== null && currentColumn.value !== null) {
        // Get the current and previous columns
        const prevColumn = draggedItem.value.columnIndex;
        const prevItemIndex = draggedItem.value.itemIndex;

        // Remove the item from the previous column
        lists.value[prevColumn].items.splice(prevItemIndex, 1);

        // Add the item to the new column
        lists.value[currentColumn.value].items.push(draggedItem.value.item);

        // Clear the dragged item reference
        draggedItem.value = null;

        // Update localStorage
        updateSavedColumns();
      }
    };

    /**
     * Updates an item in the list.
     * @param {number} columnIndex - Index of the column.
     * @param {number} itemIndex - Index of the item.
     * @param {FocusEvent} event - The focus event.
     */
    const updateItem = (columnIndex, itemIndex, event) => {
      const newValue = event.target.innerText;
      if (newValue.trim() === "") {
        lists.value[columnIndex].items.splice(itemIndex, 1);
      } else {
        lists.value[columnIndex].items[itemIndex] = newValue;
      }
      updateSavedColumns();
    };

    /**
     * Shows the input box to add a new item.
     * @param {number} index - Index of the list.
     */
    const showInputBox = (index) => {
      if (addContainers.value[index]) {
        addContainers.value[index].style.display = "flex";
      }
    };

    /**
     * Hides the input box after saving the new item.
     * @param {number} index - Index of the list.
     */
    const hideInputBox = (index) => {
      if (addContainers.value[index]) {
        const newItemValue = newItem.value.trim();
        if (newItemValue !== "") {
          lists.value[index].items.push(newItemValue);
          newItem.value = ""; // Clear the input box
          updateSavedColumns();
        }
        addContainers.value[index].style.display = "none";
      }
    };

    return {
      lists,
      draggedItem,
      currentColumn,
      addContainers,
      newItem,
      dragStart,
      dragEnter,
      allowDrop,
      drop,
      updateItem,
      showInputBox,
      hideInputBox,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Quicksand&display=swap");

html {
  box-sizing: border-box;
}

h1 {
  letter-spacing: 2px;
  text-shadow: 2px 2px 5px black;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-container {
  margin: 20px;
}

.drag-list {
  display: flex;
  align-items: flex-start;
}

.drag-container .drag-column {
  background-color: #8f8c8c; /* Light gray background color */
}

.drag-column {
  flex: 1;
  margin: 0 10px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  overflow-x: hidden;
}

.backlog-column .header,
.backlog-column .solid,
.backlog-column .solid:hover,
.backlog-column .over {
  background-color: #a2622d;
}

.progress-column .header,
.progress-column .solid,
.progress-column .solid:hover,
.progress-column .over {
  background-color: #1b6161;
}

.complete-column .header,
.complete-column .solid,
.complete-column .solid:hover,
.complete-column .over {
  background-color: #248224;
}

.on-hold-column .header,
.on-hold-column .solid,
.on-hold-column .solid:hover {
  background-color: #a22d22;
}

/* Custom Scrollbar */
.custom-scroll {
  overflow-y: auto;
  max-height: 55vh;
}

.custom-scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-right: 5px;
}

.custom-scroll::-webkit-scrollbar {
  width: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.8);
}

.header {
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin: 10px;
}

.header h1 {
  font-size: 1.25rem;
}

/* Drag and Drop */
.over {
  padding: 50px 10px;
}

.drag-item-list {
  min-height: 50px;
}

.drag-item {
  margin: 10px;
  padding: 10px;
  height: fit-content;
  background-color: rgb(92, 90, 90);
  border-radius: 10px;
  line-height: 1.5rem;
  letter-spacing: 1px;
  cursor: pointer;
}

.drag-item:focus {
  outline: none;
  background-color: white;
  color: black;
}

/* Add Button Group */
.add-btn-group {
  display: flex;
  justify-content: center;
}

.add-btn {
  margin: 10px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  border-radius: 5px;
  transition: all 0.3s ease-in;
  user-select: none;
  background-color: gray;
}

.add-btn:hover {
  background-color: rgb(40, 177, 40);
}

.add-btn:active {
  transform: scale(0.97);
}

.solid {
  margin: 5px 0;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  border-radius: 5px;
  transition: all 0.3s ease-in;
  user-select: none;
  background-color: rgb(92, 90, 90);
  color: black;
}

.solid:hover {
  transition: unset;
  filter: brightness(95%);
  background-color: #28b128;
}

.plus-sign {
  font-size: 1.5rem;
  margin-right: 5px;
  position: relative;
  top: -3px;
}

.add-container {
  margin: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: #caef96;
  min-height: 100px;
  display: none;
  flex-direction: column;
}

.add-item {
  min-height: 50px;
  height: auto;
  background-color: transparent;
  border-radius: 10px;
  margin: 5px 0;
  resize: none;
  color: black;
  padding: 10px;
}

.add-item:focus {
  outline: none;
}

/* Media Query: Laptop */
@media screen and (max-width: 1800px) {
  .main-title {
    font-size: 2rem;
  }
}

/* Media Query: Large Smartphone (Vertical) */
@media screen and (max-width: 600px) {
  body {
    overflow-y: auto;
  }

  .drag-container {
    margin: 0;
  }

  .drag-list {
    display: block;
  }

  .drag-column {
    margin: 10px;
  }
}
</style>