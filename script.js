const $=document
const inputBox=$.getElementById('inputBox')
const addBtn=$.getElementById('addBtn')
const removeBtn=$.getElementById('removeBtn')
const listContainer=$.getElementById('listContainer')
let inputValue
let todoArray=[]
let containerElem
let titleElem
let btnContainer
let btnElem1
let btnElem2

function setLocalStorage(todoList){
    localStorage.setItem('todos' , JSON.stringify(todoList))
}
document.addEventListener('keydown' , (event)=>{
    if(event.keyCode===13){
        event.preventDefault()
        inputValue=inputBox.value
        
        let newToDoObj={
            id : todoArray.length+1 ,
            title : inputValue ,
            status : false
        }
        
        todoArray.push(newToDoObj)
        // console.log(todoArray)
        setLocalStorage(todoArray)
        todoGenerator(todoArray)
        inputBox.value=''

        inputBox.focus()
    }
})

addBtn.addEventListener('click' , (event)=>{
    event.preventDefault()
    inputValue=inputBox.value

    let newTodoObj={
        id : todoArray.length+1 ,
        title : inputValue , 
        status : false
    }

    todoArray.push(newTodoObj)
    setLocalStorage(todoArray)
    todoGenerator(todoArray)
    inputBox.value=''

    inputBox.focus()
})

function todoGenerator(todoList){
    listContainer.innerHTML=''
    todoList.forEach(
        function (item){
            containerElem=$.createElement('div')
            containerElem.classList.add('todoContainer')
            listContainer.append(containerElem)

            titleElem=$.createElement('p')
            containerElem.append(titleElem)

            btnContainer=$.createElement('div')
            btnContainer.classList.add('btnContainer')
            containerElem.append(btnContainer)

            btnElem1=$.createElement('button')
            btnElem1.classList.add('complete')
            btnElem1.innerHTML='complete'
            btnContainer.append(btnElem1)
            btnElem1.setAttribute('onclick' , 'changeStatus(' + item.id + ')' )
            if(item.status){
                titleElem.classList.add('pelem')
                btnElem1.innerHTML='uncomplete'
            }
            
            btnElem2=$.createElement('button')
            btnElem2.classList.add('delete')
            btnElem2.innerHTML='remove'
            btnContainer.append(btnElem2)
            btnElem2.setAttribute('onclick' , 'removeTodo(' + item.id + ')' )

            titleElem.innerHTML=item.title
        }
    )
}

function removeTodo(todo){
    let localStorageTodos=JSON.parse(localStorage.getItem('todos'))

    todoArray=localStorageTodos

    let mainTodoIndex=todoArray.findIndex(
        function (item){
            return item.id===todo
        }
    )

    todoArray.splice(mainTodoIndex , 1)

    setLocalStorage(todoArray)
    todoGenerator(todoArray)
}

function changeStatus(todo){
    let localStorageTodos=JSON.parse(localStorage.getItem('todos'))

    todoArray=localStorageTodos

    todoArray.forEach(
        function(item){
            if(item.id===todo){
                item.status = !item.status
            }
        }
    )

    setLocalStorage(todoArray)
    todoGenerator(todoArray)
}

window.addEventListener('load' , ()=>{
    let getLocalStorage=JSON.parse(localStorage.getItem('todos'))

    if(getLocalStorage){
        todoArray=getLocalStorage
    }
    else{
        todoArray=[]
    }
    todoGenerator(todoArray)
})

removeBtn.addEventListener('click' , ()=>{
    localStorage.removeItem('todos')
})