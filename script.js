document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    function showSection(targetId) {
        // Sembunyikan semua bagian
        sections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });

        // Tampilkan bagian yang sesuai
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.classList.remove('hidden');
        }
    }

    function setActiveNavItem(targetId) {
        // Hapus kelas 'active' dari semua item navigasi
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Tambahkan kelas 'active' ke item navigasi yang sesuai
        const activeItem = document.querySelector(`.nav-item[data-section="${targetId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    // Listener untuk setiap item navigasi
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); 

            const targetId = item.getAttribute('data-section');
            
            showSection(targetId);
            setActiveNavItem(targetId);
            // Mengubah URL hash agar tombol back/forward browser berfungsi
            window.history.pushState(null, null, `#${targetId}`);
        });
    });

    // Handle initial load based on URL hash
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
        setActiveNavItem(initialHash);
    } else {
        // Tampilkan bagian 'home' secara default
        showSection('home');
        setActiveNavItem('home');
    }
});