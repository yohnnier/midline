document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------
    // 1. Smooth scrolling para el menú lateral y activo
    // ---------------------------------------------------
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('section[id]');

    sidebarLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Opcional: Cerrar menú en móvil si se usa un toggle para el sidebar
            // Si el sidebar es un menú responsivo que se oculta/muestra
            // Puedes añadir aquí la lógica para ocultarlo después de hacer clic.
        });
    });

    // Intersection Observer para actualizar la clase 'active' al hacer scroll
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.4 // Cuando el 40% de la sección es visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ---------------------------------------------------
    // 2. Acordeones (Collapsible Sections)
    // ---------------------------------------------------
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const accordionContent = button.nextElementSibling;
            const accordionIcon = button.querySelector('.accordion-icon');

            // Toggle la clase 'active' en el encabezado
            button.classList.toggle('active');

            // Toggle la clase 'active' en el icono para rotación
            if (accordionIcon) {
                accordionIcon.classList.toggle('active');
            }

            // Ajusta la altura del contenido del acordeón para mostrar/ocultar
            if (button.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                accordionContent.style.paddingTop = '15px'; // Asegura padding cuando se abre
                accordionContent.style.paddingBottom = '15px'; // Asegura padding cuando se abre
            } else {
                accordionContent.style.maxHeight = 0;
                accordionContent.style.paddingTop = '0';
                accordionContent.style.paddingBottom = '0';
            }
        });
    });

    // ---------------------------------------------------
    // 3. Animación de aparecer al desplazarse (Scroll Reveal)
    // ---------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal, .image-fade-in');

    const revealObserverOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // El elemento se activa cuando el 20% es visible
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Dejar de observar una vez que se activa
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
