const cl=console.log;

const fruitForm = document.getElementById("fruitForm")
const fruitInput = document.getElementById("fruitInput")
const fruitList = document.getElementById("fruitList")
const fruitaddbtn = document.getElementById("fruitaddbtn")
const fruitupdatebtn = document.getElementById("fruitupdatebtn")

let fruits = [
    {
        fruitName:"Mango",
        furitId:"1111"
    },
    {
        fruitName:"Apple",
        fruitId:"1112"
    },
    {
        fruitName:"Grapes",
        fruitId:"1113"
    },
    {
        fruitName:"Banana",
        fruitId:"1114"
    },
    {
        fruitName:"Orange",
        fruitId:"1115"
    }
];

//read

function oncreatefruitList(arr){
    let result = "";
    arr.forEach((eve)=>{
        result +=`<li class="list-group-item d-flex justify-content-between align-items-center bg-success" id=${eve.fruitId}>
                        <strong>${eve.fruitName}</strong>
                        <div>
                            <i onClick="editfruit(this)" class="fa-solid fa-pen-to-square fa-2x text-dark"></i>
                            <i onClick="deletefruit(this)" class="fa-solid fa-trash fa-2x text-danger"></i>
                        </div>
                    </li>`
    })
    fruitList.innerHTML =  result;
}
oncreatefruitList(fruits)

//create 

function ontodoadd(eve){
    eve.preventDefault()
    let fruitObj={
        fruitName:fruitInput.value,
        fruitId:Date.now().toString()
    }
    fruits.push(fruitObj)
    fruitForm.reset()
    cl(fruitObj.fruitName)
    let li = document.createElement('li')
    li.className = 'list-group-item d-flex justify-content-between align-items-center bg-success'
    li.setAttribute('id', fruitObj.fruitId)
    li.innerHTML = `<strong>${fruitObj.fruitName}</strong>
                        <div>
                            <i onClick="editfruit(this)" class="fa-solid fa-pen-to-square fa-2x text-dark"></i>
                            <i onClick="deletefruit(this)" class="fa-solid fa-trash fa-2x text-danger"></i>
                        </div>`
    fruitList.append(li)
}

//delete 

function deletefruit(ele){
    let removeId = ele.closest('li').id;
    let getconfirmation = confirm(`Are you sure, you want to remove id ${removeId}`)
    if(getconfirmation){
        let getIndex = fruits.findIndex(t=>t.fruitId === removeId)
        fruits.splice(getIndex, 1)
        ele.closest('li').remove()
    }
}

//edit

function editfruit(ele){
    let editId = ele.closest('li').id;
    let editObj = fruits.find(t=>t.fruitId === editId)
    cl(editObj)
    fruitInput.value = editObj.fruitName
    fruitupdatebtn.setAttribute('editId', editId)
    fruitaddbtn.classList.add('d-none')
    fruitupdatebtn.classList.remove('d-none')
}

//update

function updatefruit(){
    let updateId = this.getAttribute('editId')
    this.removeAttribute('editId')
    let updateObj={
        fruitName:fruitInput.value,
        fruitId:updateId
    }
    let getInd = fruits.findIndex(s=>s.fruitId === updateId)
    fruits[getInd] = updateObj
    document.getElementById(updateId).querySelector('strong').innerHTML = updateObj.fruitName
    fruitForm.reset()
    fruitaddbtn.classList.remove('d-none')
    fruitupdatebtn.classList.add('d-none')
}

fruitForm.addEventListener("submit", ontodoadd)
fruitupdatebtn.addEventListener("click", updatefruit)