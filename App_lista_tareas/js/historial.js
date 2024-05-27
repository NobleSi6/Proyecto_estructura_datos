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

(function() {
    var historialLista = document.getElementById("historialLista"),
        btnVolver = document.getElementById("btn-volver");

    var historialData = JSON.parse(localStorage.getItem('historial')) || [];

    var renderizarHistorial = function() {
        historialLista.innerHTML = '';
        historialData.forEach(function(item) {
            var nuevaTarea = document.createElement("li"),
                contenido = document.createTextNode(item.data);

            nuevaTarea.appendChild(contenido);
            historialLista.appendChild(nuevaTarea);
        });
    };

    var volver = function() {
        localStorage.setItem('historial', JSON.stringify(historialData));
        window.location.href = 'index.html';
    };
    
    
    btnVolver.addEventListener("click", volver);
    renderizarHistorial();
    
})();
