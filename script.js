const cursos = [
  {
    nivel: "100",
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
    nivel: "200",
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
    nivel: "300",
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
    nivel: "400",
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
    nivel: "500",
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
    nivel: "600",
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
    nivel: "700",
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
    nivel: "800",
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
    nivel: "900",
    ramos: [{ nombre: "Internado I" }],
  },
  {
    nivel: "1000",
    ramos: [
      { nombre: "Internado II" },
      { nombre: "Examen de título" },
    ],
  },
];

const aprobados = new Set();
const ramosMap = new Map();

function renderMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  cursos.forEach(({ nivel, ramos }) => {
    const nivelDiv = document.createElement("div");
    nivelDiv.classList.add("level");

    const title = document.createElement("h2");
    title.textContent = `Nivel ${nivel}`;
    nivelDiv.appendChild(title);

    ramos.forEach((ramo) => {
      const div = document.createElement("div");
      div.classList.add("course");
      div.textContent = ramo.nombre;

      // Guardar referencia para control de dependencias
      ramosMap.set(ramo.nombre, { ...ramo, element: div });

      // Bloqueado si depende de algún curso no aprobado
      if (ramo.requiere && !aprobados.has(ramo.requiere)) {
        div.classList.add("locked");
      }

      div.onclick = () => {
        if (div.classList.contains("locked")) return;

        const aprobado = div.classList.toggle("approved");
        aprobado ? aprobados.add(ramo.nombre) : aprobados.delete(ramo.nombre);
        renderMalla(); // Volver a renderizar dependencias
      };

      nivelDiv.appendChild(div);
    });

    container.appendChild(nivelDiv);
  });

  // Aplicar bloqueo según prerrequisitos
  cursos.forEach(({ ramos }) => {
    ramos.forEach((ramo) => {
      if (ramo.abre) {
        ramo.abre.forEach((nombreDependiente) => {
          const dependiente = ramosMap.get(nombreDependiente);
          if (dependiente && !aprobados.has(ramo.nombre)) {
            dependiente.element.classList.add("locked");
          }
        });
      }
    });
  });
}

renderMalla();
