(function () {
	// Definición del nodo del árbol
	class Node {
		constructor(value) {
			this.value = value;
			this.left = null;
			this.right = null;
		}
	}

	// Definición del árbol binario de búsqueda
	class BinarySearchTree {
		constructor() {
			this.root = null;
		}

		insert(value) {
			const newNode = new Node(value);
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
	}

	// Variables
	var lista = document.getElementById("lista"),
		tareaInput = document.getElementById("tareaInput"),
		btnNuevaTarea = document.getElementById("btn-agregar"),
		searchBar = document.getElementById("searchBar"),
		btnBuscar = document.getElementById("btn-buscar"),
		resultsList = document.getElementById("resultsList");

	// Crear una instancia del ABB
	var bst = new BinarySearchTree();

	// Funciones
	var agregarTarea = function () {
		var tarea = tareaInput.value;

		if (tarea === "") {
			tareaInput.setAttribute("placeholder", "Agrega una tarea valida");
			tareaInput.className = "error";
			return false;
		}

		// Insertar tarea en el ABB
		bst.insert(tarea);

		// Crear el elemento de la lista
		var nuevaTarea = document.createElement("li"),
			enlace = document.createElement("a"),
			contenido = document.createTextNode(tarea);

		enlace.appendChild(contenido);
		enlace.setAttribute("href", "#");
		nuevaTarea.appendChild(enlace);
		lista.appendChild(nuevaTarea);

		tareaInput.value = "";
		//este bucle es para borrar los elementos de la lista
		for (var i = 0; i <= lista.children.length - 1; i++) {
			lista.children[i].addEventListener("click", function () {

				var tareaTexto = this.textContent;
				alert("Se elimino " + i)
				bst.remove(tareaTexto);
				this.parentNode.removeChild(this);
			});
		}
	};

	var comprobarInput = function () {
		tareaInput.className = "";
		tareaInput.setAttribute("placeholder", "Agrega tu tarea");
	};

	var eliminarTarea = function () {
		var tareaTexto = this.textContent;
		bst.remove(tareaTexto);
		this.parentNode.removeChild(this);
	};

	// Eventos
	btnNuevaTarea.addEventListener("click", agregarTarea);
	tareaInput.addEventListener("click", comprobarInput);

	for (var i = 0; i <= lista.children.length - 1; i++) {
		lista.children[i].addEventListener("click", eliminarTarea);
	}

	//---------------BARRA DE BUSQUEDA

	const buscarTarea = () => {
		const searchString = searchBar.value.toLowerCase();
		const listaItems = Array.from(lista.children).map(li => li.textContent);
		const filteredItems = listaItems.filter(item => item.toLowerCase().includes(searchString));
		displayResults(filteredItems);
	};

	const displayResults = (results) => {
		resultsList.innerHTML = '';
		results.forEach(item => {
			const li = document.createElement('li');
			li.textContent = item;
			resultsList.appendChild(li);
		});
	};

	btnBuscar.addEventListener('click', buscarTarea);
})();
