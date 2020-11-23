// // // console.log(document.domain);
// // // console.log(document.title);
// // // console.log(document.head);
// // // console.log(document.all[10]);

// // //getelementbyid

// // // console.log(document.getElementById('header-title'));
// // // var headerTitle = document.getElementById('header-title');
// // // console.log(headerTitle);
// // // headerTitle.textContent = 'Hello';


// // // //getelementsbyclassname

// // // var items = document.getElementsByClassName('list-group-item');

// // // var search = document.getElementById('filter');
// // // search.style.paddingLeft = '10rem';
// // // search.style.marginRight = '0';

// // // var itemList = document.querySelector('#items');
// // // itemList.parentNode.style.backgroundColor = "#f4f4f4";

// // //createElement

// // // cerate div

// // var newDiv = document.createElement('div')
// // console.log(newDiv);
// // newDiv.className = 'heklo';
// // newDiv.id = 'he;;o';
// // newDiv.setAttribute('title', 'hello vid');

// // //create text node
// // var newDivText = document.createTextNode('Hello world');
// //  // add text to div

// //  newDiv.appendChild(newDivText);


// var button = document.getElementById('button').addEventListener('click', runEvent);

// // function buttonClick(e) {
// //     // console.log('Button Clicked')
// //     // document.getElementById('header-title').textContent = 'changed';
// //     console.log(e.target);
// // }


// // mouse events

// function runEvent(e) {
//     console.log('event type: ' + e.type);
// }

var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
var listGroupItem = document.getElementsByClassName('list-group-item');
var checkIfClicked = false;
var input = document.getElementById("item");
var liSelected;
var index = -1;


//form submit event
form.addEventListener('submit', addItem);

//delete event 
itemList.addEventListener('click', removeItem);

//filter
filter.addEventListener('keyup', filterItems);



//add item
function addItem(e) {
    e.preventDefault();
    //get input value

    var newItem = document.getElementById('item').value; //adding a list item with value

    //creating neew li

    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem));

    // adding class and adding text node with input value

    //creating delete button element

    var deleteBtn = document.createElement('button');

    //add class to deleteBtn

    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('X'));

    li.appendChild(deleteBtn);

    itemList.appendChild(li);
}

//remove item

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('do you want to delete this task?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}

//filter items
function filterItems(e) {
    //convert to lowercase
    var text = e.target.value.toLowerCase();
    var items = itemList.getElementsByTagName('li');

    //converting items to array
    Array.from(items).forEach(function(item) {
        var itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

}

//adding using enter button
itemList.addEventListener('keyup', (event) => {
    if (event.which === 13) {
        addItem();
    }
});

for (let i = 0; i < listGroupItem.length; i++) {
    listGroupItem[i].addEventListener("click", selectedItem);

    function selectedItem(e) {
        var textItem = (listGroupItem[i].textContent).slice(0, -1);
        filter.value = textItem;
        console.log(textItem)
        for (let j = 0; j < listGroupItem.length; j++) {
            if (i != j) {
                listGroupItem[j].style.display = "none";
            }
        }
    }
}



document.addEventListener('keydown', function(event) {
    var len = itemList.getElementsByTagName('li').length - 1;
    if (event.which === 40) {
        index++;
        //down 
        if (liSelected) {
            removeClass(liSelected, 'selected');
            next = itemList.getElementsByTagName('li')[index];
            if (typeof next !== undefined && index <= len) {

                liSelected = next;
            } else {
                index = 0;
                liSelected = itemList.getElementsByTagName('li')[0];


            }
            addClass(liSelected, 'selected');
            console.log(index);
        } else {
            index = 0;

            liSelected = itemList.getElementsByTagName('li')[0];
            addClass(liSelected, 'selected');
        }
    } else if (event.which === 38) {

        //up
        if (liSelected) {
            removeClass(liSelected, 'selected');
            index--;
            console.log(index);
            next = itemList.getElementsByTagName('li')[index];


            if (typeof next !== undefined && index >= 0) {
                liSelected = next;
            } else {
                index = len;
                liSelected = itemList.getElementsByTagName('li')[len];
            }
            addClass(liSelected, 'selected');
        } else {
            index = 0;
            liSelected = itemList.getElementsByTagName('li')[len];
            addClass(liSelected, 'selected');
        }
    }
}, false);

function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
};

function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
};


//cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// function checkCookie() {
//     var user = getCookie("username");
//     if (user != "") {
//         alert("Welcome again " + user);
//     } else {
//         user = prompt("Please enter your name:", "");
//         if (user != "" && user != null) {
//             setCookie("username", user, 365);
//         }
//     }
// }