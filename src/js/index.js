let array = [];

window.onload = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        array = JSON.parse(storedTasks);
        display();
    }
};

document.getElementById('enter').addEventListener("click", () => {
    let writtentext = document.getElementById('text').value.trim();
    if (!writtentext) return;

    const taskObj = { text: writtentext, completed: false };
    array.unshift(taskObj);
    localStorage.setItem('tasks', JSON.stringify(array));
    document.getElementById('text').value = "";
    display(); // Re-render the list
});

const display = () => {
    const main = document.querySelector("main");
    main.innerHTML = ""; // Clear previous list

    // Sort the tasks: uncompleted first, then completed
    array.sort((a, b) => {
        return a.completed - b.completed; // false (0) comes before true (1)
    });

    array.forEach((element, index) => {
        // Create task elements
        const container = document.createElement('div');
        container.setAttribute("class", "container1");

        const check = document.createElement('input');
        check.type = "checkbox";
        check.name = "checkbox";
        check.id = "checkbox";
        check.setAttribute("class", "Class" + index);
        check.checked = element.completed; 

        const heading = document.createElement("h1");
        heading.textContent = element.text;
        heading.setAttribute("class", "Class" + index);

        const button = document.createElement("button");
        const trash = document.createElement('i');
        trash.classList.add("bi", "bi-trash-fill", "Class" + index, "trash");

        // Delete task logic
        trash.addEventListener("click", () => {
            let className = null;
            for (let cls of trash.classList) {
                if (cls.startsWith("Class")) {
                    className = cls; // the class to be deleted
                    break;
                }
            }

            if (className) {
                const headingElement = getheading(className);
                if (headingElement) {
                    const headingText = headingElement.textContent;
                    const indexToDelete = array.findIndex(item => item.text === headingText); // find the element with a text that needs to be deleted
                    if (indexToDelete !== -1) { // if the item to be deleted is found
                        array.splice(indexToDelete, 1);
                        localStorage.setItem('tasks', JSON.stringify(array)); // update the storage
                        display(); // Refresh the view
                    }
                }
            }
        });

        // Append the elements to the container and the container to the main
        main.append(container);
        container.append(check, heading, button);
        button.appendChild(trash);

        // Event listener to mark as completed or not
        check.addEventListener("change", () => {
            if (check.checked) { // set completed to true and change the color of the text
                let className = null;
                for (let cls of check.classList) {
                    if (cls.startsWith("Class")) {
                        className = cls;
                        break;
                    }
                }

                if (className) {
                    const headingElement = getheading(className);
                    if (headingElement) {
                        const headingText = headingElement.textContent;
                        const indexToComplete = array.findIndex(item => item.text === headingText);
                        if (indexToComplete !== -1) {
                            array[indexToComplete].completed = true;
                            localStorage.setItem('tasks', JSON.stringify(array)); // Update storage
                            display()
                        }
                    }
                }
            } else { // set completed to false and change the color of the text
                let className = null;
                for (let cls of check.classList) {
                    if (cls.startsWith("Class")) {
                        className = cls;
                        break;
                    }
                }

                if (className) {
                    const headingElement = getheading(className);
                    if (headingElement) {
                        const headingText = headingElement.textContent;
                        const indexToComplete = array.findIndex(item => item.text === headingText);
                        if (indexToComplete !== -1) {
                            array[indexToComplete].completed = false;
                            localStorage.setItem('tasks', JSON.stringify(array)); // Update storage
                            display()
                        }
                    }
                }
            }
        });
    });
};


// returns the element with a particular class
const getheading = (class1) => {
    return document.querySelector(`h1.${class1}`);
};
