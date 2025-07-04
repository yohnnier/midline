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

            button.classList.toggle('active');

            if (accordionIcon) {
                accordionIcon.classList.toggle('active');
            }

            if (button.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                accordionContent.style.paddingTop = '15px';
                accordionContent.style.paddingBottom = '15px';
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
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // ---------------------------------------------------
    // 4. Modal para imágenes y videos (Lightbox)
    // ---------------------------------------------------
    const mediaModal = document.getElementById('mediaModal');
    const modalImage = document.querySelector('.modal-image');
    const modalVideo = document.querySelector('.modal-video');
    const closeModalBtn = document.querySelector('.close-button');

    // Función para abrir el modal
    function openModal(src, type) {
        // Limpiar y ocultar elementos previos del modal
        modalImage.style.display = 'none';
        modalVideo.style.display = 'none';
        modalVideo.pause(); // Pausar cualquier video anterior
        modalVideo.removeAttribute('src'); // Limpiar src para evitar precarga
        modalVideo.load(); // Cargar de nuevo para limpiar

        if (type === 'image') {
            modalImage.src = src;
            modalImage.style.display = 'block';
        } else if (type === 'video') {
            modalVideo.src = src;
            modalVideo.style.display = 'block';
            modalVideo.play(); // Reproducir automáticamente
        }
        mediaModal.classList.add('active');
    }

    // Función para cerrar el modal
    function closeModal() {
        mediaModal.classList.remove('active');
        modalVideo.pause(); // Asegúrate de pausar el video al cerrar
        modalVideo.currentTime = 0; // Reinicia el video al principio
        modalImage.src = ''; // Limpia la URL de la imagen
        modalVideo.removeAttribute('src'); // Limpia la URL del video
    }

    // Event listener para abrir el modal al hacer clic en imágenes/videos con clase 'zoomable'
    document.querySelectorAll('.zoomable').forEach(mediaElement => {
        mediaElement.addEventListener('click', () => {
            const src = mediaElement.src || (mediaElement.tagName.toLowerCase() === 'video' ? mediaElement.querySelector('source').src : null);
            const type = mediaElement.tagName.toLowerCase() === 'img' ? 'image' : 'video';
            if (src) { // Asegurarse de que tenemos una fuente válida
                openModal(src, type);
            }
        });
    });

    // Event listener para cerrar el modal con el botón X
    closeModalBtn.addEventListener('click', closeModal);

    // Event listener para cerrar el modal al hacer clic fuera del contenido
    mediaModal.addEventListener('click', (e) => {
        // Si el clic no fue en la imagen/video o el wrapper (sino en el overlay)
        if (e.target === mediaModal) {
            closeModal();
        }
    });

    // Event listener para cerrar el modal con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mediaModal.classList.contains('active')) {
            closeModal();
        }
    });
});
