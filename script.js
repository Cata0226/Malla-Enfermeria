const ramos = [
  { nombre: "Química", nivel: 100 },
  { nombre: "Morfo función I", nivel: 100 },
  { nombre: "Biología", nivel: 100 },
  { nombre: "Socio antropología en Salud", nivel: 100 },
  { nombre: "Educación para la Salud y Primeros Auxilios", nivel: 100 },
  { nombre: "CFG (100)", nivel: 100 },

  { nombre: "Bioquímica", nivel: 200, prereq: ["Química"] },
  { nombre: "Morfo función II", nivel: 200, prereq: ["Morfo función I"] },
  { nombre: "Bioestadística", nivel: 200 },
  { nombre: "Psicología general", nivel: 200 },
  { nombre: "Introducción a la ciencia de la Enfermería", nivel: 200 },
  { nombre: "CFG (200)", nivel: 200 },

  { nombre: "Ciclo vital I", nivel: 300 },
  { nombre: "Fisiología", nivel: 300, prereq: ["Biología"] },
  { nombre: "Microbiología", nivel: 300 },
  { nombre: "Psicología Evolutiva", nivel: 300, prereq: ["Psicología general"] },
  { nombre: "Seguridad del cuidado", nivel: 300, prereq: ["Introducción a la ciencia de la Enfermería"] },
  { nombre: "CFG (300)", nivel: 300 },

  { nombre: "Salud Pública y Epidemiología", nivel: 400 },
  { nombre: "Ciclo Vital II", nivel: 400, prereq: ["Ciclo vital I"] },
  { nombre: "Farmacología", nivel: 400, prereq: ["Bioquímica"] },
  { nombre: "Fisiopatología", nivel: 400, prereq: ["Fisiología"] },
  { nombre: "Cuidados de Enfermería en Personas Mayores I", nivel: 400 },
  { nombre: "CFG (400)", nivel: 400 },

  { nombre: "Bioética y Derecho Sanitario", nivel: 500 },
  { nombre: "Cuidados de Enfermería en Salud Mental", nivel: 500, prereq: ["Ciclo Vital II"] },
  { nombre: "Cuidados de Enfermería en Niños/as y Adolescentes I", nivel: 500, prereq: ["Ciclo Vital II"] },
  { nombre: "Enfermería en Comunidad I", nivel: 500 },
  { nombre: "Cuidado de Enfermería en Personas Mayores II", nivel: 500, prereq: ["Cuidados de Enfermería en Personas Mayores I"] },
  { nombre: "CFG (500)", nivel: 500 },

  { nombre: "Enfoque de Género en Salud", nivel: 600 },
  { nombre: "Gestión del cuidado", nivel: 600 },
  { nombre: "Cuidados de Enfermería en Niños/as y Adolescentes II", nivel: 600, prereq: ["Cuidados de Enfermería en Niños/as y Adolescentes I"] },
  { nombre: "Enfermería en Comunidad II", nivel: 600, prereq: ["Enfermería en Comunidad I"] },
  { nombre: "Cuidados de Enfermería en Adulto I", nivel: 600, prereq: ["Fisiopatología"] },
  { nombre: "CFG (600)", nivel: 600 },

  { nombre: "Diseño Metodológico y Pensamiento Crítico", nivel: 700 },
  { nombre: "Mejora continua del Cuidado", nivel: 700 },
  { nombre: "Cuidados de Enfermería en Niños/as con Necesidades Especiales", nivel: 700, prereq: ["Cuidados de Enfermería en Niños/as con Necesidades Especiales"] },
  { nombre: "Cuidados de Enfermería en Situaciones de Urgencia I", nivel: 700, prereq: ["Cuidados de Enfermería en Adulto I"] },
  { nombre: "Cuidados de Enfermería en Adulto II", nivel: 700, prereq: ["Cuidados de Enfermería en Adulto I"] },
  { nombre: "Optativo (700)", nivel: 700 },

  { nombre: "Seminario de Enfermería", nivel: 800, prereq: ["Diseño Metodológico y Pensamiento Crítico"] },
  { nombre: "Cuidados de Enfermería en Procesos de Fin de Vida", nivel: 800 },
  { nombre: "Cuidados de Enfermería en Personas con Cáncer", nivel: 800 },
  { nombre: "Cuidados de Enfermería en Situaciones de Urgencia II", nivel: 800, prereq: ["Cuidados de Enfermería en Situaciones de Urgencia I"] },
  { nombre: "Cuidados Familiar y Enfermería Domiciliaria", nivel: 800, prereq: ["Enfermería en Comunidad II"] },
  { nombre: "Optativo (800)", nivel: 800 },

  { nombre: "Internado I", nivel: 900 },
  { nombre: "Internado II", nivel: 1000 },
  { nombre: "Examen de título", nivel: 1000 }
];

const estado = {};

function renderMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  const niveles = [...new Set(ramos.map(r => r.nivel))].sort((a, b) => a - b);

  niveles.forEach(nivel => {
    const card = document.createElement("div");
    card.className = "semestre-card";

    const titulo = document.createElement("h2");
    titulo.textContent = `Nivel ${nivel}`;
    card.appendChild(titulo);

    ramos
      .filter(r => r.nivel === nivel)
      .forEach(ramo => {
        const div = document.createElement("div");
        div.className = "ramo";
        div.textContent = ramo.nombre;

        const aprobado = estado[ramo.nombre];
        const requisitosCumplidos = !ramo.prereq || ramo.prereq.every(p => estado[p]);

        if (aprobado) {
          div.classList.add("aprobado");
        } else if (!requisitosCumplidos) {
          div.classList.add("bloqueado");
        } else {
          div.classList.add("pendiente");
        }

        if (requisitosCumplidos) {
          div.addEventListener("click", () => {
            estado[ramo.nombre] = !estado[ramo.nombre];
            renderMalla();
          });
        }

        card.appendChild(div);
      });

    container.appendChild(card);
  });
}

renderMalla();
