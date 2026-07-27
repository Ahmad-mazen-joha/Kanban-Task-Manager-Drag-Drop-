the kanban app
it is 3 sections of tasks, to-do, in-progress and done
each section has a title and a list of tasks
each section will be a componant
each componant will recive a list of tasks as props
each task will has a different style depending on the father componant class, so if .section-to-do .task will have different styles than .section-in-progress
we will have one state holding an array of objects each object is a task, containing a title, id, state (to do, done, in prograss)
on clicking a task in the kanban it will open a layer on the page containing the task details and options to edit or delete the task or changing the state
each section inside the componant will recive a a part of the bigger array containing all tasks depanding on the state of the task
there should be a big button at the button which opens a form to enter a new task
-- additional : drag and drop


adding the add task button
the user enters the title and choose the column

then adding the checked button were it turns

the user click edit
it changes a state in the parent to edit and give it the id
it opens the same form of adding a task
when submitting the function, it should see this state, if it is an edit, then it should make an object and call the reducer, this object 
contains the new task title and the id of the task