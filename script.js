const undoStack = JSON.parse(localStorage.getItem('undoStack')) || []
let redoStack = JSON.parse(localStorage.getItem('redoStack')) || []
const saveBtn = document.getElementById("save")
const undoBtn = document.getElementById("undo")
const redoBtn = document.getElementById("redo")
const textarea = document.querySelector('textarea')
textarea.value =  undoStack.length === 0 ? '' : undoStack[undoStack.length - 1]


saveBtn.addEventListener("click", () => {
    undoStack.push(textarea.value)
    redoStack = []
    localStorage.setItem("undoStack", JSON.stringify(undoStack));
    localStorage.setItem("redoStack", JSON.stringify(redoStack));
})


undoBtn.addEventListener('click', () => {
    console.log(undoStack);
    if (undoStack.length === 0) {
        alert('There are no items to undo.');
        return;
    }
    const undoValue = undoStack.pop()
    console.log(undoValue);
    redoStack.push(undoValue)
    localStorage.setItem("undoStack", JSON.stringify(undoStack));
    localStorage.setItem("redoStack", JSON.stringify(redoStack));
    textarea.value = undoStack.length === 0 ? '' : undoStack[undoStack.length - 1]
})

redoBtn.addEventListener('click', () => {
    if (redoStack.length === 0) {
        alert('There are no items to redo.');
        return;
    }
    const redoValue = redoStack.pop();
    undoStack.push(redoValue);
    localStorage.setItem("undoStack", JSON.stringify(undoStack));
    localStorage.setItem("redoStack", JSON.stringify(redoStack));
    textarea.value = redoValue;
})