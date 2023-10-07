const storage = localStorage;
const modal = document.querySelector(".modal");
const img = document.querySelector("nav img");
const overlay = document.querySelector(".overlay");
const span = document.querySelector("nav span");
const form = document.querySelector("form");
const users = JSON.parse(storage.getItem("users"));
const divs = Array.prototype.slice.call(
  document.querySelectorAll("#container div")
);
const colors = {
  A: "79a4f0",
  B: "f2b23a",
  C: "f23a3a",
  D: "660066",
  E: "a70939",
  F: "661400",
  G: "003049",
};
let grupos = [];

grupos = [
  { grupo: "A", votos: users?.filter((u) => u.grupo == "A").length || 0 },
  { grupo: "B", votos: users?.filter((u) => u.grupo == "B").length || 0 },
  { grupo: "C", votos: users?.filter((u) => u.grupo == "C").length || 0 },
  { grupo: "D", votos: users?.filter((u) => u.grupo == "D").length || 0 },
  { grupo: "E", votos: users?.filter((u) => u.grupo == "E").length || 0 },
  { grupo: "F", votos: users?.filter((u) => u.grupo == "F").length || 0 },
  { grupo: "G", votos: users?.filter((u) => u.grupo == "G").length || 0 },
]
  .sort((a, b) => {
    return a.votos < b.votos ? 1 : a.votos > b.votos ? -1 : 0;
  })
  .map((g) => {
    return `Grupo <span style="color: #${colors[g.grupo]}">${g.grupo}</span>: ${
      g.votos
    } voto${g.votos == 1 ? "" : "s"}`;
  });

function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

span.addEventListener("click", () => {
  localStorage.clear();
});
img.addEventListener("click", () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
overlay.addEventListener("click", () => {
  close();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    close();
  }
});
divs.forEach(function (div) {
  div.addEventListener("click", function () {
    divs.forEach((el) => {
      if (el != div) el.classList.remove("selected");
    });
    div.classList.add("selected");
  });
});
form.addEventListener("submit", (e) => {
  const json = {
    nome: document.querySelector("input").value,
    grupo: document.querySelector(".selected"),
  };
  if (!json.nome || !json.grupo) {
    alert("Selecione o grupo e seu nome!");
  } else {
    json.grupo = json.grupo.getAttribute("name");

    let users = JSON.parse(storage.getItem("users"));
    if (!users) users = [];
    users.push(json);

    storage.setItem("users", JSON.stringify(users));
  }
});

document.querySelector(".modal").innerHTML = `
    <div id="votos">
        <p>${grupos[0]}</p>
        <p>${grupos[1]}</p>
        <p>${grupos[2]}</p>
        <p>${grupos[3]}</p>
        <p>${grupos[4]}</p>
        <p>${grupos[5]}</p>
        <p>${grupos[6]}</p>
    </div>
`;

function showUsers() {
  const nomesRepetidos = {};
  const indicesRepetidos = [];
  nomes = [];

  for (let i = 0; i < users.length; i++) {
    const nome = users[i].nome;
    if (nomesRepetidos[nome]) {
      indicesRepetidos.push(i);
      nomes.push(`${users[i].nome}: ${users[i].grupo}`);
    } else {
      nomesRepetidos[nome] = true;
    }
  }

  console.log("Nomes repetidos:", nomes);
  console.log(users);
}
