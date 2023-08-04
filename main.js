// Libreria luxon para simplificar el uso de la fecha y el tiempo
// Declaracion de constantes de configuracion y uso de luxon
const DateTime = luxon.DateTime;
const dt = DateTime.local({
  zone: "America/Buenos_Aires",
  numberingSystem: "America",
});
console.log(dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS));

// Declaracion de array para creacion de objetos
let idStudent = 1;
let students = [];

// Creacion de clase
class Student {
  constructor(name, id, grades, avg, date) {
    this.name = name;
    this.id = id;
    this.grades = grades;
    this.avg = avg;
    this.date = date;
  }
  mostrarTexto() {
    return this.name;
  }
}
// Funcion para recibir los datos del DOM para el registro de nuevos estudiantes
const addStudent = (e) => {
  e.preventDefault();
  let inputNS = document.getElementById("inputNS");
  let g1 = document.getElementById("g1");
  let g2 = document.getElementById("g2");
  let g3 = document.getElementById("g3");
  let grades = [parseInt(g1.value), parseInt(g2.value), parseInt(g3.value)];
  let avg = grades.reduce((acc, curr) => acc + curr) / grades.length;
  let date = dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

  congrat(avg);

  if (inputNS.value != "" && avg != isNaN) {
    let student = new Student(inputNS.value, idStudent, grades, avg, date);
    students.push(student);
    inputNS.value = "";
    grades = [];
    avg = 0;
    date = "";
    idStudent++;
    showStudent();
    showHist();
    console.log(students);
  }
};
// Interaccion con el DOM por un evento e invocacion de funcion
let form = document.getElementById("form");
form.addEventListener("submit", addStudent);
let content = document.getElementById("content");

// Declaracion de funciones que interactuaran y modificaran el HTML
const showStudent = () => {
  content.innerHTML = "";
  let list = document.createElement("ol");
  students.forEach((student) => {
    let item = document.createElement("li");
    item.innerText = `
         Nombre: ${student.name}
         Prom: ${student.avg}
         Notas: ${student.grades}.`;
    item.addEventListener("click", () => eraseStudent(student));
    item.addEventListener("mouseover", () => {
      item.className = "overStudent";
    });
    item.addEventListener("mouseout", () => {
      item.className = "";
    });
    list.appendChild(item);
  });
  content.appendChild(list);
};

let hist = document.getElementById("hist");

const showHist = () => {
  hist.innerHTML = "";
  let list = document.createElement("ul");
  students.forEach((student) => {
    let item = document.createElement("li");
    item.innerText = `${student.date} ${student.name} `;
    list.appendChild(item);
  });
  hist.appendChild(list);
};

const eraseStudent = (student) => {
  let index = students.indexOf(student);
  students.splice(index, 1);
  showStudent();
};

// Funcion para guardar archivo JSON en el localstorage
const saveStorage = document.getElementById("saveStorage");
saveStorage.addEventListener("click", () => {
  localStorage.setItem("students", JSON.stringify(students));
});

//Funcion para recuperar el archivo JSON del storage y utilizar su contenido
const getfromStorage = () => {
  if (localStorage.getItem("students") != null) {
    students = JSON.parse(localStorage.getItem("students"));
    idStudent = students.length;
    showStudent();
    showHist();
  }
};

// Funcion para limpiar el local storage
const clearStorage = document.getElementById("clearStorage");
clearStorage.addEventListener("click", () => {
  localStorage.removeItem("students");
  students = [];
  showStudent();
});

//Sweet Alert para felicitar al estudiante mediante el uso de una libreria
const congrat = (avg) => {
  if (avg >= 5) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Felicidades! Aprobaste.",
      showConfirmButton: true,
      timer: 4000,
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Lamentablemente no aprobo el curso",
      showConfirmButton: true,
      timer: 4000,
    });
  }
};

// Utilizacion de fetch y consumo de api externa para generacion de lista de estudiantes egresados
const profiles = document.querySelector("#users");

fetch("https://jsonplaceholder.typicode.com/users/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((user) => {
      const li = document.createElement("li"); //crea un elemento li
      li.innerHTML = `
                <p><b>${user.name}</b> - ${user.website}</p>
            `;
      const img = document.createElement("img");
      img.innerHTML = img;
      profiles.appendChild(li);
    });
    const tryApi = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(data);
        }, 2000);
      });
    };
    // Implementacion de promesas para supervisar que el funcionamiento y conexion con la API se ejecute correctamente.
    tryApi()
      .then((users) => {
        console.log(users);
      })
      .catch((error) => {
        console.log("Error, no se pudo conectar con la API", error);
      })
      .finally(() => {
        console.log("Proceso Terminado");
      });
  });

// Invocacion de funcion
getfromStorage();
