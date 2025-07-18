const cursos = [
  {
    nivel: "Nivel 100",
    ramos: [
      { nombre: "Química", abre: ["Bioquímica"] },
      { nombre: "Morfo función I", abre: ["Morfo función II"] },
      { nombre: "Biología", abre: ["Fisiología"] },
      { nombre: "Socio antropología en Salud" },
      { nombre: "Educación para la Salud y Primeros Auxilios" },
      { nombre: "CFG" },
    ],
  },
  {
    nivel: "Nivel 200",
    ramos: [
      { nombre: "Bioquímica", abre: ["Farmacología"] },
      { nombre: "Morfo función II" },
      { nombre: "Bioestadística" },
      { nombre: "Psicología general", abre: ["Psicología Evolutiva"] },
      { nombre: "Introducción a la ciencia de la Enfermería", abre: ["Seguridad del cuidado"] },
      { nombre: "CFG" },
    ],
  },
  {
    nivel: "Nivel 300",
    ramos: [
      { nombre: "Ciclo vital I", abre: ["Ciclo vital II"] },
      { nombre: "Fisiología", abre: ["Fisiopatología"] },
      { nombre: "Microbiología" },
      { nombre: "Psicología Evolutiva" },
      { nombre: "Seguridad del cuidado" },
      { nombre: "CFG" },
    ],
  },
  {
    nivel: "Nivel 400",
    ramos: [
      { nombre: "Salud Pública y Epidemiología" },
      { nombre: "Ciclo vital II", abre: ["Cuidados de enfermería en Salud Mental", "Cuidados de enfermería en Niños/as y Adolescentes"] },
      { nombre: "Farmacología" },
      { nombre: "Fisiopatología", abre: ["Cuidados de Enfermería en Adulto I"] },
      { nombre: "Cuidados de Enfermería en Personas Mayores I", abre: ["Cuidados de Enfermería en Personas Mayores II"] },
      { nombre: "CFG" },
    ],
  },
  {
    nivel: "Nivel 500",
    ramos: [
      { nombre: "Bioética y Derecho Sanitario" },
      { nombre: "Cuidados de Enfermería en Salud Mental" },
      { nombre: "Cuidados de Enfermería en Niños/as y Adolescentes I", abre: ["Cuidados de Enfermería en Niños/as y Adolescentes II"] },
      { nombre: "Enfermería en Comunidad I", abre: ["Enfermería en Comunidad II"] },
      { nombre: "Cuidado de Enfermería en Personas Mayores II" },
      { nombre: "CFG" },
    ],
  },
  {
    nivel: "Nivel 600",
    ramos: [
      { nombre: "Enfoque de Género en Salud" },
      { nombre: "Gestión del cuidado" },
      { nombre: "Cuidados de Enfermería en Niños/as y Adolescentes II", abre: ["Cuidados de Enfermería en Niños/as con Necesidades Especiales"] },
      { nombre: "Enfermería en Comunidad II" },
      { nombre: "Cuidados de Enfermería en Adulto I", abre: ["Cuidados de Enfermería en Situaciones de Urgencia I", "Cuidados de Enfermería en Adulto II"] },
      { nombre: "CFG" },
    ],
  },
  {
    nivel: "Nivel 700",
    ramos: [
      { nombre: "Diseño Metodológico y Pensamiento Crítico" },
      { nombre: "Mejora continua del Cuidado" },
      { nombre: "Cuidados de Enfermería en Niños/as con Necesidades Especiales" },
      { nombre: "Cuidados de Enfermería en Situaciones de Urgencia I", abre: ["Cuidados de Enfermería en Situaciones de Urgencia II"] },
      { nombre: "Cuidados de Enfermería en Adulto II" },
      { nombre: "Optativo" },
    ],
  },
  {
    nivel: "Nivel 800",
    ramos: [
      { nombre: "Seminario de Enfermería" },
      { nombre: "Cuidados de Enfermería en Procesos de Fin de Vida" },
      { nombre: "Cuidados de Enfermería en Personas con Cáncer" },
      { nombre: "Cuidados de Enfermería en Situaciones de Urgencia II" },
      { nombre: "Cuidados Familiar y Enfermería Domiciliaria" },
      { nombre: "Optativo" },
    ],
  },
  {
    nivel: "Nivel 900",
    ramos: [
      { nombre: "Internado I" },
    ],
  },
  {
    nivel: "Nivel 1000",
    ramos: [
      { nombre: "Internado II" },
      { nombre: "Examen de título" },
    ],
  },
];

const aprobados = new Set();
const ramosMap = new Map();

function renderMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = "";

  cursos.forEach(({ nivel, ramos }) => {
    const card = document.createElement("div");
    card.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = nivel;
    card.appendChild(titulo);

    ramos.forEach((ramo) => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo.nombre;

      ramosMap.set(ramo.nombre, { ...ramo, element: div });

      div.onclick = () => {
        if (div.classList.contains("locked")) return;
        const aprobado = div.classList.toggle("approved");
        aprobado ? aprobados.add(ramo.nombre) : aprobados.delete(ramo.nombre);
        renderMalla(); // Recalcular bloqueos
      };

      card.appendChild(div);
    });

    container.appendChild(card);
  });

  cursos.forEach(({ ramos }) => {
    ramos.forEach((ramo) => {
      if (ramo.abre) {
        ramo.abre.forEach((nombreDep) => {
          const dep = ramosMap.get(nombreDep);
          if (dep && !aprobados.has(ramo.nombre)) {
            dep.element.classList.add("locked");
          }
        });
      }
    });
  });
}

renderMalla();
