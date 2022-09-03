//query selector



class bookList
{ 

 constructor(title, author, isbn, id)
 {   
    this.id = id;
     this.title = title;
     this.author = author;
     this.isbn = isbn;
    
 }
 
 setLocalStorage(storageName)
 {
    
    const book = { 
                  id: 0,
                  title : this.title,
                  author: this.author,
                  isbn: this.isbn 
                 }
    if(localStorage.getItem(storageName) ==null)
    {
        //create new array
        const url = [];
       
       //append book to url
       book.id = url.length
       url.push(book );
       

       //set to local storage
       localStorage.setItem(storageName, JSON.stringify(url ));

    }
    else{

       const url = JSON.parse(localStorage.getItem(storageName));
       book.id = url.length;
       url.push(book);

        //set to local storage
        localStorage.setItem(storageName,JSON.stringify(url));
    }


 }

 

}

//form control

const title = document.querySelector('input#title');
const author = document.querySelector('input#author');
const isbn = document.querySelector('input#isbn');
const form = document.querySelector('form#form');
const neibor = document.querySelector('div#neighbor');
const tablebody = document.querySelector('#body')
const table = document.querySelector("table.table");




const SubmitBook = (e)=>
{
    e.preventDefault();
    

    if( title.value=='' || author.value=='' || isbn.value == '' )
    {
        Notify("Please enter all fields", "text-center text-light bg-danger p-2", neibor);
    }

    else
    {

     const newBook = new bookList(title.value, author.value, isbn.value)
     newBook.setLocalStorage("BookMark");

     Notify("Book successfully added", "text-center text-light bg-success p-2", neibor);


     tablebody.innerHTML = "";
     inputDataInTable();

     //clear input
     title.value = ''
     author.value = ''
     isbn.value = ''

    }
 
    checkArray("BookMark");

}


//submit form
form.addEventListener('submit', SubmitBook);


//Message
function Notify(text, classStyle, parentElement )
{
    const div = document.createElement('div');
    div.classList = classStyle
    div.textContent = text

   parentElement.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 2000);
}



function inputDataInTable()
{
 const list = JSON.parse(localStorage.getItem("BookMark"));
 if(list)
 {

    list.forEach(item=>{
    
      tablebody.innerHTML +=`<tr>
                            <th class="d-none">${item.id}</th> 
                            <td>${item.title}</td>
                            <td>${item.author}</td>
                            <td>${item.isbn}</td>
                            <td> <button id="Deletebtn" class="btn btn-danger btn-sm w-100">X</button>  </td>
                            </tr>`

    })

 }


}
window.addEventListener('load', ()=>{ 
    
    checkArray("BookMark");
    inputDataInTable()
});




const RemoveBook = (e)=>
{   
    
   let btn = e.target

   if(btn.id === "Deletebtn")
   { 
    //remove parent element
     btn.parentElement.parentElement.remove();
    
    let id =  btn.parentElement.parentElement.querySelector('th').textContent;
      

    deleteLocalStorage("BookMark", id);
    
   } 
   checkArray("BookMark");
}

//Remove book
tablebody.addEventListener('click', RemoveBook);

//delete book
const  deleteLocalStorage = (storageName, id)=>
 {
       
    
    let arr = JSON.parse(localStorage.getItem(storageName));
      
    //loop array


    arr  = arr.filter(item=>{
         
        return item.id != id

    }) 
    console.log(arr);

    //set it again
    localStorage.setItem(storageName, JSON.stringify(arr));


 }

 const checkArray = (storageName)=>
{
    let arr = JSON.parse(localStorage.getItem(storageName))
    if(arr.length >0)
        table.style.display = ''

    else
        table.style.display = 'none'
    
}






