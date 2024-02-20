const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'tasks.txt');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addTask(task) {
    fs.appendFile(filePath, task + '\n', (err) => {
        if (err) throw err;
        console.log('Task added successfully!');
        rl.close();
    });
}


rl.question('Enter task: ', (task) => {
    addTask(task);
});

// task checking here..

function viewTasks() {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log('Tasks:');
        console.log(data);
 
    });
}

viewTasks();

//
function markTaskComplete(taskIndex) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = data.split('\n');
        if (taskIndex >= 0 && taskIndex < tasks.length) {
            tasks[taskIndex] = '[X] ' + tasks[taskIndex];
            fs.writeFile(filePath, tasks.join('\n'), (err) => {
                if (err) throw err;
                console.log('Task marked as complete!');
            });
        } else {
            console.log('Invalid task index.');
        }
    });
}

rl.question('Enter index of task to mark as complete: ', (index) => {
    markTaskComplete(parseInt(index));
});



///
function removeTask(taskIndex) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        let tasks = data.split('\n');
        if (taskIndex >= 0 && taskIndex < tasks.length) {
            tasks.splice(taskIndex, 1);
            fs.writeFile(filePath, tasks.join('\n'), (err) => {
                if (err) throw err;
                console.log('Task removed successfully!');
            });
        } else {
            console.log('Invalid task index.');
        }
    });
}

rl.question('Enter index of task to remove: ', (index) => {
    removeTask(parseInt(index));
});


