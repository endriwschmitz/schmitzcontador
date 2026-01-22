document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // 1. LÓGICA DO COOKIE BANNER (LGPD) - CORRIGIDA
    // ============================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    // Verifica se os elementos existem na página para evitar erros
    if (cookieBanner && acceptBtn) {
        // Se NÃO tiver o item 'cookiesAccepted' salvo, mostra o banner
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.style.display = 'block'; // Força aparecer
        }

        // Ao clicar no botão
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true'); // Salva a decisão
            cookieBanner.style.display = 'none'; // Esconde
        });
    }

    // ============================================
    // 2. LÓGICA DAS BOLINHAS (SCROLL SPY)
    // ============================================
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.side-nav .dot');

    if (sections.length > 0 && dots.length > 0) {
        window.addEventListener('scroll', () => {
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                // Ajuste de sensibilidade (1/3 da tela)
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    currentSection = section.getAttribute('id');
                }
            });

            dots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('href').includes(currentSection)) {
                    dot.classList.add('active');
                }
            });
        });
    }
});

// ============================================
    // 3. ANIMAÇÃO DE ROLAGEM (OS CARDS CAINDO)
    // ============================================
    
    // Cria um "observador" que vigia quando elementos entram na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento apareceu na tela...
            if (entry.isIntersecting) {
                // Adiciona a classe que faz ele aparecer/cair
                entry.target.classList.add('visible');
                
                // (Opcional) Para de observar depois que já animou uma vez
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Dispara quando 10% do elemento estiver visível
    });

    // Manda o observador vigiar todos os cards de serviço
    const cards = document.querySelectorAll('.servico-card');
    cards.forEach(card => {
        observer.observe(card);
    });