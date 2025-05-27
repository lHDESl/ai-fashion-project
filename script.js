document.addEventListener('DOMContentLoaded', () => {
    // 스크롤 애니메이션
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // 타임라인 진행률 애니메이션
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observeTimeline = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 타임라인 진행 바 애니메이션
                timeline.style.setProperty('--timeline-progress', '100%');
                
                // 각 타임라인 아이템 순차적으로 활성화
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                        
                        // 진행률 바 애니메이션
                        const progress = item.querySelector('.progress-bar');
                        if (progress) {
                            const progressFill = progress.querySelector('.progress-fill');
                            const percentage = Math.min(100, ((index + 1) * 20));
                            progressFill.style.setProperty('--progress-width', `${percentage}%`);
                        }
                    }, index * 300); // 300ms 간격으로 순차 실행
                });
                
                observeTimeline.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (timeline) {
        observeTimeline.observe(timeline);
    }

    // 시스템 아키텍처 다이어그램 애니메이션
    const archImage = document.querySelector('.arch-image');
    if (archImage && archImage.tagName === 'svg') {
        // SVG 요소들에 대한 애니메이션 처리
        const paths = archImage.querySelectorAll('path');
        const shapes = archImage.querySelectorAll('rect, circle');
        
        archImage.addEventListener('mouseenter', () => {
            paths.forEach(path => {
                if (path.getAttribute('stroke')) {
                    path.style.strokeDasharray = '10';
                    path.style.animation = 'pathDash 2s linear infinite';
                }
            });
            
            shapes.forEach(shape => {
                shape.style.animation = 'elementPulse 2s ease-in-out infinite';
            });
        });
        
        archImage.addEventListener('mouseleave', () => {
            paths.forEach(path => {
                path.style.animation = 'none';
                path.style.strokeDasharray = 'none';
            });
            
            shapes.forEach(shape => {
                shape.style.animation = 'none';
            });
        });
    }

    // 모듈 호버 효과
    const moduleWrappers = document.querySelectorAll('.arch-module-wrapper');
    moduleWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', () => {
            const relatedArrows = wrapper.dataset.relatedArrows?.split(',') || [];
            relatedArrows.forEach(arrowId => {
                const arrow = document.querySelector(`#${arrowId}`);
                if (arrow) {
                    arrow.style.strokeWidth = '3';
                    arrow.style.filter = 'brightness(1.5)';
                }
            });
        });

        wrapper.addEventListener('mouseleave', () => {
            const relatedArrows = wrapper.dataset.relatedArrows?.split(',') || [];
            relatedArrows.forEach(arrowId => {
                const arrow = document.querySelector(`#${arrowId}`);
                if (arrow) {
                    arrow.style.strokeWidth = '2';
                    arrow.style.filter = 'none';
                }
            });
        });
    });

    // 스크롤 시 네비게이션 바 효과
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 스크롤 투 탑 버튼
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 