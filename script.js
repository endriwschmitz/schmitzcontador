document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // 1. LÓGICA DO COOKIE BANNER (LGPD)
    // ============================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    // Verifica se os elementos existem para evitar erros
    if (cookieBanner && acceptBtn) {
        // Se NÃO tiver o item 'cookiesAccepted' salvo, mostra o banner
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.style.display = 'block'; 
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
                
                // Ajuste de sensibilidade (ativa quando 1/3 da seção aparece)
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    currentSection = section.getAttribute('id');
                }
            });

            dots.forEach(dot => {
                dot.classList.remove('active');
                // Verifica se o link da bolinha corresponde à seção atual
                if (dot.getAttribute('href').includes(currentSection)) {
                    dot.classList.add('active');
                }
            });
        });
    }

    // ============================================
    // 3. ANIMAÇÃO DE ROLAGEM (ATUALIZADO)
    // ============================================
    
    // Cria um "observador" que vigia quando elementos entram na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento apareceu na tela...
            if (entry.isIntersecting) {
                // Adiciona a classe que faz ele aparecer (definida no CSS)
                entry.target.classList.add('visible');
                
                // (Opcional) Se quiser que anime apenas uma vez, descomente a linha abaixo:
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Dispara quando 10% do elemento estiver visível
    });

    // SELECIONA TUDO QUE DEVE ANIMAR:
    // 1. Cards de Serviço (.servico-card)
    // 2. Imagem da Empresa (.about-image)
    // 3. Texto da Empresa (.about-content)
    const elementsToAnimate = document.querySelectorAll('.servico-card, .about-image, .about-content');

    // Manda o observador vigiar cada um desses elementos
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

});
