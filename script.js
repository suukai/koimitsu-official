document.addEventListener('DOMContentLoaded', () => {
    // ----------------------
    // Navbar Scroll Effect
    // ----------------------
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ----------------------
    // Mobile Menu Toggle
    // ----------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle hamburger animation (optional, can add active class to hamburger too)
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ----------------------
    // Fade-in Animation Observer
    // ----------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);


    // ----------------------
    // Profile Data & Modal Logic
    // ----------------------
    const membersData = [
        {
            id: "wataame",
            name: "わたあめふわり",
            romaji: "WATAAME FUWARI",
            color: "白",
            birthday: "4月7日",
            hobby: "お金を稼ぐこと、海外旅行",
            skill: "散財、オタク研究",
            comment: "“いつか売れてほしい”じゃなくて、“売れるまで隣で支える”って覚悟ある人求めてます。一緒にてっぺん見に行こうね。",
            image: "素材/wataame.jpg",
            sns: {
                x: "https://x.com/wataame_koimitu",
                instagram: "https://instagram.com/watasi_cha",
                tiktok: "https://tiktok.com/@watasi__chan"
            }
        },
        {
            id: "aya",
            name: "紫吹あや",
            romaji: "SHIBUKI AYA",
            color: "紫",
            birthday: "1月12日",
            hobby: "自炊",
            skill: "カーリング",
            comment: "最後まで一緒！！",
            image: "素材/aya.jpeg",
            sns: {
                x: "https://x.com/aya_koimitu",
                instagram: "https://instagram.com/ayasan112_",
                tiktok: "https://tiktok.com/@ayasan112"
            }
        },
        {
            id: "azarashi",
            name: "あざらし",
            romaji: "AZARASHI",
            color: "緑",
            birthday: "2009年5月11日",
            hobby: "歌うこと、踊ること、食べること",
            skill: "ショートケーキ二口で食べれます🍓",
            comment: "沢山大きなステージに立ってみたいです！一緒にいい景色みましょう🦭",
            image: "素材/azarashi.jpg",
            sns: {
                x: "https://x.com/azarashi_koimitu",
                instagram: "https://instagram.com/azarashi_koimitu",
                tiktok: "https://tiktok.com/@azarashi_koimitu"
            }
        },
        {
            id: "nemu",
            name: "はちみつねむ",
            romaji: "HACHIMITSU NEMU",
            color: "黄",
            birthday: "10月31日",
            hobby: "辛い物を食べること",
            skill: "テニス、ウィンク^_−☆",
            comment: "推しにするなら今がいちばん古参です！！",
            image: "素材/nemu.jpg",
            sns: {
                x: "https://x.com/nemu_koimitu",
                instagram: "https://instagram.com/8_q0ss",
                tiktok: "https://tiktok.com/@8_q0ss"
            }
        },
        {
            id: "natan",
            name: "猫音なたん",
            romaji: "NYAON NATAN",
            color: "ピンク",
            birthday: "7月7日",
            hobby: "競艇、競馬、YouTube、猫と遊ぶ🐱💖",
            skill: "作詞作編曲🎶",
            comment: "応援してくれるみんなを誰よりも幸せにして、この大好きなグループをさらに大きくすることが夢です！\nこれからもっともっと成長して、絶対にみんなを大きなステージへ連れて行きます。\n一緒に最高の景色を見ようね💖",
            image: "素材/natan.jpg",
            sns: {
                x: "https://x.com/natan_koimitu",
                instagram: "https://instagram.com/nyaon_natan",
                tiktok: "https://tiktok.com/@nyaon_natan"
            }
        },
        {
            id: "rika",
            name: "叶成りか",
            romaji: "KANARI RIKA",
            color: "水色",
            birthday: "10月28日",
            hobby: "たべること",
            skill: "バイオリン",
            comment: "みんなから愛されるかわいいアイドルになれるように頑張ります。",
            image: "素材/rika.jpg",
            sns: {
                x: "https://x.com/rkks_koimitu",
                instagram: "https://instagram.com/rikachan_www",
                tiktok: "https://tiktok.com/@rkk_kwii"
            }
        }

    ];

    const profileGrid = document.getElementById('profile-grid');
    const modal = document.getElementById('profile-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseBg = document.getElementById('modal-close-bg');

    // Render Profile Cards
    membersData.forEach((member, index) => {
        const delayClass = `delay-${index % 3}`; // staggered delay 0,1,2

        const cardHTML = `
            <div class="profile-card fade-in-up ${delayClass}" data-id="${member.id}">
                <div class="profile-img-wrap">
                    <img src="${member.image}" alt="${member.name}">
                </div>
                <div class="profile-info">
                    <h3 class="profile-name">${member.name}</h3>
                    <div class="profile-romaji">${member.romaji}</div>
                </div>
            </div>
        `;
        profileGrid.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Handle Profile Card Click
    document.querySelectorAll('.profile-card').forEach(card => {
        card.addEventListener('click', () => {
            const memberId = card.getAttribute('data-id');
            const member = membersData.find(m => m.id === memberId);

            if (member) {
                openModal(member);
            }
        });
    });

    function openModal(member) {
        // Build modal content
        const contentHTML = `
            <div class="modal-img">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="modal-details">
                <h2 class="modal-name">${member.name}</h2>
                <div class="modal-romaji">${member.romaji}</div>
                
                <div class="detail-list">
                    <div class="detail-item">
                        <div class="detail-label">誕生日</div>
                        <div class="detail-value">${member.birthday}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">趣味</div>
                        <div class="detail-value">${member.hobby}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">特技</div>
                        <div class="detail-value">${member.skill}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">一言</div>
                        <div class="detail-value">${member.comment}</div>
                    </div>
                </div>
                
                <div class="modal-sns">
                    ${member.sns.x ? `<a href="${member.sns.x}" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>` : ''}
                    ${member.sns.instagram ? `<a href="${member.sns.instagram}" target="_blank"><i class="fa-brands fa-instagram"></i></a>` : ''}
                    ${member.sns.tiktok ? `<a href="${member.sns.tiktok}" target="_blank"><i class="fa-brands fa-tiktok"></i></a>` : ''}
                </div>
            </div>
        `;

        modalBody.innerHTML = contentHTML;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Show modal
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll

        // Clear content after animation
        setTimeout(() => {
            modalBody.innerHTML = '';
        }, 400);
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalCloseBg.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ----------------------
    // Form Submission (Formspree)
    // ----------------------
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('お問い合わせありがとうございます。送信が完了しました。');
                    contactForm.reset();
                } else {
                    alert('送信に失敗しました。もう一度お試しください。');
                }
            } catch (error) {
                alert('エラーが発生しました。もう一度お試しください。');
            }
        });
    }

    // Observe all fade-in elements (including dynamically added ones)
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    // ----------------------
    // Guide Modal Logic
    // ----------------------
    const guideModal = document.getElementById('guide-modal');
    const guideModalBody = document.getElementById('guide-modal-body');
    const guideModalCloseBtn = document.getElementById('guide-modal-close-btn');
    const guideModalCloseBg = document.getElementById('guide-modal-close-bg');

    if (guideModal && guideModalBody) {
        document.querySelectorAll('.guide-card-trigger').forEach(card => {
            card.addEventListener('click', () => {
                const targetId = card.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);

                if (targetContent) {
                    guideModalBody.innerHTML = targetContent.innerHTML;
                    document.body.style.overflow = 'hidden';
                    guideModal.classList.add('active');
                }
            });
        });

        function closeGuideModal() {
            guideModal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                guideModalBody.innerHTML = '';
            }, 400);
        }

        if (guideModalCloseBtn) guideModalCloseBtn.addEventListener('click', closeGuideModal);
        if (guideModalCloseBg) guideModalCloseBg.addEventListener('click', closeGuideModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && guideModal.classList.contains('active')) {
                closeGuideModal();
            }
        });
    }
});
