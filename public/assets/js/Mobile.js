// Copied from JS/Mobile.js and adjusted for public folder
document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav toggle
    var toggle = document.querySelector('.nav-toggle');
    var primary = document.querySelector('nav .primary');
    if(toggle && primary){
        toggle.addEventListener('click', function(){
            var expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            primary.style.display = expanded ? '' : 'flex';
            primary.style.flexDirection = 'column';
            primary.style.background = 'transparent';
        });
        // ensure proper behavior on resize
        window.addEventListener('resize', function(){
            if(window.innerWidth > 640) primary.style.display = '';
        });
    }

    // Contact form: handled by Formspree (no local POST)

    // Simple gallery lightbox for images inside .gallery-grid
    var galleryImages = document.querySelectorAll('.gallery-grid img');
    if(galleryImages.length){
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;';
        overlay.style.display = 'none';
        overlay.addEventListener('click', function(){ overlay.style.display='none'; overlay.innerHTML=''; document.body.style.overflow=''; });
        document.body.appendChild(overlay);
        galleryImages.forEach(function(img){
            img.style.cursor = 'zoom-in';
            img.setAttribute('role','img');
            img.addEventListener('click', function(e){
                var big = document.createElement('img');
                big.src = img.src;
                big.alt = img.alt || 'Gallery image';
                big.style.maxWidth = '90%'; big.style.maxHeight = '90%'; big.style.borderRadius='8px';
                overlay.innerHTML = '';
                overlay.appendChild(big);
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                overlay.setAttribute('tabindex','-1'); overlay.focus();
            });
        });
    }
});
