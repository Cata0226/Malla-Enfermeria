document.querySelectorAll('.ramo').forEach(ramo => {
    ramo.addEventListener('click', () => {
        ramo.classList.toggle('aprobado');
        const id = ramo.dataset.id;

        // Liberar prerrequisitos relacionados
        document.querySelectorAll(`.ramo[data-prerreq="${id}"]`).forEach(rel => {
            if (ramo.classList.contains('aprobado')) {
                rel.classList.remove('bloqueado');
                rel.style.pointerEvents = 'auto';
            } else {
                rel.classList.add('bloqueado');
            }
        });
    });
});

