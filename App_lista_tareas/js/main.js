class Node {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(id, data) {
        let newNode = new Node(id, data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    remove(id) {
        if (this.head === null) return;
        if (this.head.id === id) {
            this.head = this.head.next;
            if (this.head === null) this.tail = null;
            return;
        }
        let current = this.head;
        while (current.next !== null) {
            if (current.next.id === id) {
                current.next = current.next.next;
                if (current.next === null) this.tail = current;
                return;
            }
            current = current.next;
        }
    }

    getAll() {
        let nodes = [];
        let current = this.head;
        while (current !== null) {
            nodes.push(current);
            current = current.next;
        }
        return nodes;
    }
}

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    remove(value) {
        this.root = this.removeNode(this.root, value);
    }

    removeNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            const aux = this.findMinNode(node.right);
            node.value = aux.value;
            node.right = this.removeNode(node.right, aux.value);
            return node;
        }
    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    search(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            return this.search(node.left, value);
        } else if (value > node.value) {
            return this.search(node.right, value);
        } else {
            return node;
        }
    }
}

(function(){
    var lista = document.getElementById("lista"),
        tareaInput = document.getElementById("tareaInput"),
        btnNuevaTarea = document.getElementById("btn-agregar"),
        searchBar = document.getElementById("searchBar"),
        btnBuscar = document.getElementById("btn-buscar"),
        resultsList = document.getElementById("resultsList"),
        btnHistorial = document.getElementById("btn-historial");

    var tareasList = new LinkedList();
    var tareasHash = {};
    var bst = new BinarySearchTree();
    var historialList = new LinkedList();

    var renderizarTareas = function() {
        lista.innerHTML = '';
        var tareas = tareasList.getAll();
        tareas.forEach(function(tareaNode) {
            var nuevaTarea = document.createElement("li"),
                enlace = document.createElement("a"),
                contenido = document.createTextNode(tareaNode.data);

            enlace.appendChild(contenido);
            enlace.setAttribute("href", "#");
            enlace.setAttribute("data-id", tareaNode.id);
            nuevaTarea.appendChild(enlace);
            lista.appendChild(nuevaTarea);
        });
        var elementos = lista.getElementsByTagName("a");
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].addEventListener("click", eliminarTarea);
        }
		for (var i = 0; i < elementos.length; i++) {
			elementos[i].addEventListener("click", eliminarTarea);
		
			// Agregar evento de mouseover
			elementos[i].addEventListener("mouseover", function(event) {
				event.target.style.backgroundColor = "rgba(100, 255, 80, 0.5)";
				var completado = document.createElement("span");
				completado.textContent = "Completar";
				completado.style.color = "white";
				completado.style.position = " absolute";
				completado.style.fontSize = "large";
				event.target.appendChild(completado);
			});
		
			// Agregar evento de mouseout
			elementos[i].addEventListener("mouseout", function(event) {
				event.target.style.backgroundColor = "";
				event.target.removeChild(event.target.lastChild);
			});
		}
    };

    var agregarTarea = function() {
        var tarea = tareaInput.value;
        if (tarea === "") {
            tareaInput.setAttribute("placeholder", "Agrega una tarea valida");
            tareaInput.className = "error";
            return false;
        }
        var id = Date.now().toString();
        tareasList.add(id, tarea);
        tareasHash[id] = tarea;
        bst.insert(tarea);
        historialList.add(id, `Agregada: ${tarea}`);
        renderizarTareas();
        tareaInput.value = "";
    };

    var comprobarInput = function() {
        tareaInput.className = "";
        tareaInput.setAttribute("placeholder", "Agrega tu tarea");
    };

    var eliminarTarea = function() {
        var id = this.getAttribute("data-id");
        var tareaTexto = tareasHash[id];
        tareasList.remove(id);
        delete tareasHash[id];
        bst.remove(tareaTexto);
        historialList.add(id, `Eliminada: ${tareaTexto}`);
        renderizarTareas();
    };

    var buscarTarea = function() {
        var searchString = searchBar.value.toLowerCase();
        var listaItems = Object.values(tareasHash);
        var filteredItems = listaItems.filter(item => item.toLowerCase().includes(searchString));
        displayResults(filteredItems);
    };

    var displayResults = function(results) {
        resultsList.innerHTML = '';
        results.forEach(item => {
            var li = document.createElement('li');
            li.textContent = item;
            resultsList.appendChild(li);
        });
    };

	var verHistorial = function() {
		localStorage.setItem('tareas', JSON.stringify(tareasList.getAll()));
		localStorage.setItem('historial', JSON.stringify(historialList.getAll()));
		window.location.href = 'historial.html';
	};
	
	// Agregar esta línea para cargar el historial previamente almacenado al cargar la página
	var cargarHistorial = function() {
		var historialData = JSON.parse(localStorage.getItem('historial')) || [];
		historialData.forEach(item => {
			historialList.add(item.id, item.data);
		});
		var tareasData = JSON.parse(localStorage.getItem('tareas')) || [];
		tareasData.forEach(item => {
			tareasList.add(item.id, item.data);
		});
	};
	
	// Llamar a cargarHistorial al inicializar
	cargarHistorial();
	
	btnNuevaTarea.addEventListener("click", agregarTarea);
	tareaInput.addEventListener("click", comprobarInput);
	btnBuscar.addEventListener("click", buscarTarea);
	btnHistorial.addEventListener("click", verHistorial);

	
	renderizarTareas();
	
})();
