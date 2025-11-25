// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch header image from Supabase
        await fetchHeaderImage();
        
        // Fetch main content background image from Supabase
        await fetchMainContentBackground();
        
        // Fetch fourth header image from Supabase
        await fetchFourthHeaderImage();
        
        // Fetch fifth header background from Supabase
        await fetchFifthHeaderBackground();
        
        // await fetchSeventhHeaderImage(); // Disabled to prevent right-side image
        
        // Fetch distance icon from Supabase
        await fetchDistanceIcon();
        
        // Fetch location icon from Supabase
        await fetchLocationIcon();
        
        // Fetch date icon from Supabase
        await fetchDateIcon();
        
        // Fetch Eshva icon from Supabase
        await fetchEshvaIcon();
        
        // Fetch Mahesh Babu icon from Supabase
        await fetchMaheshBabuIcon();
        
        // Fetch footer Mahesh Babu logo
        await fetchFooterMaheshBabuLogo();
        
        // Fetch advantage card icons
        await fetchCertificateMedalIcon();
        await fetchWaterBottleIcon();
        await fetchTshirtIcon();
        await fetchGoodiesBagIcon();
        
        // Fetch feature card icon
        await fetchFeatureCardIcon();
        
        // Initialize amenities interactive content
        initAmenitiesInteractive();
        
        // Initialize navigation capsule functionality
        initNavigationCapsule();
        
        // Adjust sub-header letter spacing so the text fills the container edges
        adjustSubHeaderSpacing();
        // Adjust sixth-header letter spacing
        adjustSixthHeaderSpacing();
        // Adjust ninth-header letter spacing
        adjustNinthHeaderSpacing();
        // Adjust eleventh-header letter spacing
        adjustEleventhHeaderSpacing();
        // Recalculate on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                adjustSubHeaderSpacing();
                adjustSixthHeaderSpacing();
                adjustNinthHeaderSpacing();
                adjustEleventhHeaderSpacing();
            }, 150);
        });
    } catch (error) {
        console.error('Error loading images:', error);
        showError('Failed to load images from Supabase. Please check your configuration.');
    }
});

/**
 * Adjust the `.sub-header-title` letter-spacing (in px) so the text width matches the container width.
 * This makes the first and last letters touch the container edges.
 */
function adjustSubHeaderSpacing(depth = 0) {
    try {
        const container = document.querySelector('.sub-header-content');
        const title = document.querySelector('.sub-header-title');
        if (!container || !title) return;

        // Clear transforms and inline sizes to measure reliably
        title.style.transform = '';
        title.style.fontSize = '';
        title.style.letterSpacing = '';

        const targetWidth = container.clientWidth;
        const targetHeight = container.clientHeight;

        // First: fit width by searching letter-spacing (px)
        let lo = -200;
        let hi = 200;
        let best = 0;

        for (let i = 0; i < 40; i++) {
            const mid = (lo + hi) / 2;
            title.style.letterSpacing = mid + 'px';
            const w = title.scrollWidth;

            if (Math.abs(w - targetWidth) <= 1) {
                best = mid;
                break;
            }

            if (w > targetWidth) {
                hi = mid;
            } else {
                lo = mid;
            }

            best = mid;
        }

        title.style.letterSpacing = Math.round(best * 100) / 100 + 'px';

        // Second: ensure the title height matches the container height (so top & bottom touch)
        // Allow one auto-adjust cycle to avoid infinite recursion.
        const titleRect = title.getBoundingClientRect();
        const titleHeight = titleRect.height;

        if (titleHeight > 0 && Math.abs(titleHeight - targetHeight) > 1 && depth < 2) {
            const currentSize = parseFloat(getComputedStyle(title).fontSize);
            const ratio = targetHeight / titleHeight;
            // Compute a new font size that's proportional to the ratio and keep it within sensible bounds
            const newSize = Math.max(8, Math.round(currentSize * ratio));
            title.style.fontSize = newSize + 'px';

            // After changing font-size, re-run spacing once to re-balance letter-spacing
            setTimeout(() => adjustSubHeaderSpacing(depth + 1), 40);
            return;
        }

        // Final micro-adjust: if it's still off vertically, nudge translateY so top is exactly aligned.
        const finalRect = title.getBoundingClientRect();
        const finalHeight = finalRect.height;
        const deltaTop = finalRect.top - container.getBoundingClientRect().top;

        if (Math.abs(finalHeight - targetHeight) <= 2) {
            // Align top to container top so text touches both edges
            title.style.transform = `translateY(${ -Math.round(deltaTop) }px)`;
        }
    } catch (e) {
        console.error('adjustSubHeaderSpacing error', e);
    }
}

/**
 * Adjust the `.sixth-header-title` letter-spacing and font-size to fit the container
 */
function adjustSixthHeaderSpacing(depth = 0) {
    try {
        const container = document.querySelector('.sixth-header-content');
        const title = document.querySelector('.sixth-header-title');
        if (!container || !title) return;

        title.style.transform = '';
        title.style.fontSize = '';
        title.style.letterSpacing = '';

        const targetWidth = container.clientWidth;
        const targetHeight = container.clientHeight;

        // Fit width by searching letter-spacing (px)
        let lo = -200;
        let hi = 200;
        let best = 0;

        for (let i = 0; i < 40; i++) {
            const mid = (lo + hi) / 2;
            title.style.letterSpacing = mid + 'px';
            const w = title.scrollWidth;

            if (Math.abs(w - targetWidth) <= 1) {
                best = mid;
                break;
            }

            if (w > targetWidth) {
                hi = mid;
            } else {
                lo = mid;
            }

            best = mid;
        }

        title.style.letterSpacing = Math.round(best * 100) / 100 + 'px';

        // Fit height by adjusting font-size
        const titleRect = title.getBoundingClientRect();
        const titleHeight = titleRect.height;

        if (titleHeight > 0 && Math.abs(titleHeight - targetHeight) > 1 && depth < 2) {
            const currentSize = parseFloat(getComputedStyle(title).fontSize);
            const ratio = targetHeight / titleHeight;
            const newSize = Math.max(8, Math.round(currentSize * ratio));
            title.style.fontSize = newSize + 'px';

            setTimeout(() => adjustSixthHeaderSpacing(depth + 1), 40);
            return;
        }

        // Final vertical alignment
        const finalRect = title.getBoundingClientRect();
        const finalHeight = finalRect.height;
        const deltaTop = finalRect.top - container.getBoundingClientRect().top;

        if (Math.abs(finalHeight - targetHeight) <= 2) {
            title.style.transform = `translateY(${ -Math.round(deltaTop) }px)`;
        }
    } catch (e) {
        console.error('adjustSixthHeaderSpacing error', e);
    }
}

/**
 * Adjust the `.ninth-header-title` letter-spacing and font-size to fit the container
 */
function adjustNinthHeaderSpacing(depth = 0) {
    try {
        const container = document.querySelector('.ninth-header-content');
        const title = document.querySelector('.ninth-header-title');
        if (!container || !title) return;

        title.style.transform = '';
        title.style.fontSize = '';
        title.style.letterSpacing = '';

        const targetWidth = container.clientWidth;
        const targetHeight = container.clientHeight;

        // Fit width via letter-spacing search
        let lo = -200;
        let hi = 200;
        let best = 0;
        for (let i = 0; i < 40; i++) {
            const mid = (lo + hi) / 2;
            title.style.letterSpacing = mid + 'px';
            const w = title.scrollWidth;
            if (Math.abs(w - targetWidth) <= 1) { best = mid; break; }
            if (w > targetWidth) hi = mid; else lo = mid;
            best = mid;
        }
        title.style.letterSpacing = Math.round(best * 100) / 100 + 'px';

        // Fit height via font-size adjust
        const rect = title.getBoundingClientRect();
        if (rect.height > 0 && Math.abs(rect.height - targetHeight) > 1 && depth < 2) {
            const currentSize = parseFloat(getComputedStyle(title).fontSize);
            const ratio = targetHeight / rect.height;
            const newSize = Math.max(8, Math.round(currentSize * ratio));
            title.style.fontSize = newSize + 'px';
            setTimeout(() => adjustNinthHeaderSpacing(depth + 1), 40);
            return;
        }

        // Final vertical align
        const finalRect = title.getBoundingClientRect();
        const deltaTop = finalRect.top - container.getBoundingClientRect().top;
        if (Math.abs(finalRect.height - targetHeight) <= 2) {
            title.style.transform = `translateY(${ -Math.round(deltaTop) }px)`;
        }
    } catch (e) {
        console.error('adjustNinthHeaderSpacing error', e);
    }
}

/**
 * Adjust eleventh header text spacing to fit container
 * Same as sixth and ninth header spacing logic
 */
function adjustEleventhHeaderSpacing(depth = 0) {
    try {
        const container = document.querySelector('.eleventh-header-content');
        const title = document.querySelector('.eleventh-header-title');
        if (!container || !title) return;

        title.style.transform = '';
        title.style.fontSize = '';
        title.style.letterSpacing = '';

        const targetWidth = container.clientWidth;
        const targetHeight = container.clientHeight;

        // Fit width via letter-spacing search
        let lo = -200;
        let hi = 200;
        let best = 0;
        for (let i = 0; i < 40; i++) {
            const mid = (lo + hi) / 2;
            title.style.letterSpacing = mid + 'px';
            const w = title.scrollWidth;
            if (Math.abs(w - targetWidth) <= 1) { best = mid; break; }
            if (w > targetWidth) hi = mid; else lo = mid;
            best = mid;
        }
        title.style.letterSpacing = Math.round(best * 100) / 100 + 'px';

        // Fit height via font-size adjust
        const rect = title.getBoundingClientRect();
        if (rect.height > 0 && Math.abs(rect.height - targetHeight) > 1 && depth < 2) {
            const currentSize = parseFloat(getComputedStyle(title).fontSize);
            const ratio = targetHeight / rect.height;
            const newSize = Math.max(8, Math.round(currentSize * ratio));
            title.style.fontSize = newSize + 'px';
            setTimeout(() => adjustEleventhHeaderSpacing(depth + 1), 40);
            return;
        }

        // Final vertical align
        const finalRect = title.getBoundingClientRect();
        const deltaTop = finalRect.top - container.getBoundingClientRect().top;
        if (Math.abs(finalRect.height - targetHeight) <= 2) {
            title.style.transform = `translateY(${ -Math.round(deltaTop) }px)`;
        }
    } catch (e) {
        console.error('adjustEleventhHeaderSpacing error', e);
    }
}

/**
 * Initialize navigation capsule - handle active state switching
 */
function initNavigationCapsule() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

// Mobile nav toggle behavior
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', (e) => {
            const isOpen = mobileNav.classList.toggle('open');
            mobileNav.setAttribute('aria-hidden', String(!isOpen));
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close mobile nav when clicking an item
        mobileNav.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileNav.setAttribute('aria-hidden', 'true');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!mobileNav.classList.contains('open')) return;
            if (e.target === navToggle || mobileNav.contains(e.target)) return;
            mobileNav.classList.remove('open');
            mobileNav.setAttribute('aria-hidden', 'true');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    }
});

/**
 * Fetch header image from Supabase storage
 * Fetches from 'Photos' bucket, specifically '1.png'
 */
async function fetchHeaderImage() {
    try {
        // Get the specific image URL from 'Photos' bucket
        const { data: urlData } = supabase.storage
            .from('Photos')
            .getPublicUrl('1.png');

        if (urlData?.publicUrl) {
            displayHeaderBackground(urlData.publicUrl);
        } else {
            console.error('Failed to get header image URL');
        }
    } catch (error) {
        console.error('Error in fetchHeaderImage:', error);
    }
}

/**
 * Display header background image
 * Loads the image first to get its dimensions, then adjusts header height
 */
function displayHeaderBackground(imageUrl) {
    const header = document.getElementById('header');
    
    if (header) {
        // Create an image element to get the actual dimensions
        const img = new Image();
        
        img.onload = function() {
            // Calculate the height based on image aspect ratio
            const headerWidth = header.offsetWidth || 1441;
            const aspectRatio = img.height / img.width;
            const calculatedHeight = headerWidth * aspectRatio;
            
            // Set the header height to show the full image
            header.style.height = `${calculatedHeight}px`;
            header.style.minHeight = `${calculatedHeight}px`;
            
            // Apply the image as background to the header
            header.style.backgroundImage = `url(${imageUrl})`;
            header.style.backgroundSize = 'cover';
            header.style.backgroundPosition = 'center top';
            header.style.backgroundRepeat = 'no-repeat';
            header.style.position = 'relative';
        };
        
        img.onerror = function() {
            console.error('Failed to load header image:', imageUrl);
        };
        
        // Load the image to get its dimensions
        img.src = imageUrl;
    }
}


/**
 * Fetch main content background image from Supabase storage
 * Fetches from 'Photos' bucket, specifically '2.png'
 */
async function fetchMainContentBackground() {
    try {
        // Get the specific image URL from 'Photos' bucket
        const { data: urlData } = supabase.storage
            .from('Photos')
            .getPublicUrl('2.png');

        if (urlData?.publicUrl) {
            displayMainContentBackground(urlData.publicUrl);
        } else {
            console.error('Failed to get main content background image URL');
        }
    } catch (error) {
        console.error('Error in fetchMainContentBackground:', error);
    }
}

/**
 * Display background image on the main content area
 */
function displayMainContentBackground(imageUrl) {
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent) {
        // Apply the image as background to the main content
        mainContent.style.backgroundImage = `url(${imageUrl})`;
        mainContent.style.backgroundSize = 'cover';
        mainContent.style.backgroundPosition = 'center';
        mainContent.style.backgroundRepeat = 'no-repeat';
    }
}

/**
 * Fetch fourth header image from Supabase storage
 * Fetches from 'Photos' bucket, specifically '3.png'
 */
async function fetchFourthHeaderImage() {
    try {
        // Try to get the image URL from 'Photos' bucket
        const { data: urlData } = supabase.storage
            .from('Photos')
            .getPublicUrl('3.png');

        if (urlData?.publicUrl) {
            console.log('Fourth header image URL:', urlData.publicUrl);
            displayFourthHeaderImage(urlData.publicUrl);
        } else {
            console.error('Failed to get fourth header image URL');
            // Fallback to direct URL
            displayFourthHeaderImage('https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/Photos/3.png');
        }
    } catch (error) {
        console.error('Error in fetchFourthHeaderImage:', error);
        // Fallback to direct URL
        displayFourthHeaderImage('https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/Photos/3.png');
    }
}

/**
 * Display fourth header image
 */
function displayFourthHeaderImage(imageUrl) {
    const fourthHeader = document.getElementById('fourth-header');
    
    if (fourthHeader) {
        const content = fourthHeader.querySelector('.fourth-header-content');
        if (content) {
            // Use the direct Supabase URL
            const directUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/Photos/3.png';
            
            // Create image element
            const img = document.createElement('img');
            img.src = directUrl;
            img.alt = 'Fourth Header Image';
            img.className = 'fourth-header-image';
            
            img.onload = function() {
                console.log('Fourth header image loaded successfully');
            };
            
            img.onerror = function() {
                console.error('Failed to load fourth header image:', directUrl);
            };
            
            // Add image to content
            content.appendChild(img);
        }
    }
}

/**
 * Fetch seventh header image from Supabase storage
 * Fetches from 'Photos' bucket, specifically '5.png'
 */
async function fetchSeventhHeaderImage() {
    try {
        displaySeventhHeaderImage('https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/Photos/5.png');
    } catch (error) {
        console.error('Error in fetchSeventhHeaderImage:', error);
    }
}

/**
 * Display seventh header image
 */
function displaySeventhHeaderImage(imageUrl) {
    const seventhHeader = document.getElementById('seventh-header');
    
    if (seventhHeader) {
        const content = seventhHeader.querySelector('.seventh-header-content');
        if (content) {
            // Create image element
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Seventh Header Image';
            img.className = 'seventh-header-image';
            
            img.onload = function() {
                console.log('Seventh header image loaded successfully');
            };
            
            img.onerror = function() {
                console.error('Failed to load seventh header image:', imageUrl);
            };
            
            // Add image to content
            content.appendChild(img);
        }
    }
}

/**
 * Fetch fifth header background from Supabase storage
 * Fetches from 'Photos' bucket, specifically '4.png'
 */
async function fetchFifthHeaderBackground() {
    try {
        const fifthHeader = document.getElementById('fifth-header');
        
        if (fifthHeader) {
            // Use the direct Supabase URL
            const imageUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/Photos/4.png';
            
            // Apply the image as background
            fifthHeader.style.backgroundImage = `url(${imageUrl})`;
            fifthHeader.style.backgroundSize = 'cover';
            fifthHeader.style.backgroundPosition = 'center';
            fifthHeader.style.backgroundRepeat = 'no-repeat';
            
            console.log('Fifth header background loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchFifthHeaderBackground:', error);
    }
}

/**
 * Fetch distance icon from Supabase storage
 * Fetches from 'icons' bucket, specifically 'distance.png'
 */
async function fetchDistanceIcon() {
    try {
        const distanceIconContainer = document.getElementById('distance-icon');
        
        if (distanceIconContainer) {
            // Use the direct Supabase URL
            const iconUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/distance.png';
            
            // Create an image element for the icon
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'Distance';
            img.style.width = '24px';
            img.style.height = '24px';
            img.style.objectFit = 'contain';
            
            // Clear container and add image
            distanceIconContainer.innerHTML = '';
            distanceIconContainer.appendChild(img);
            
            console.log('Distance icon loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchDistanceIcon:', error);
    }
}

/**
 * Fetch location icon from Supabase storage
 * Fetches from 'icons' bucket, specifically 'location (1).png'
 */
async function fetchLocationIcon() {
    try {
        const locationIconContainer = document.getElementById('location-icon');
        
        if (locationIconContainer) {
            // Use the direct Supabase URL
            const iconUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/location%20(1).png';
            
            // Create an image element for the icon
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'Location';
            img.style.width = '24px';
            img.style.height = '24px';
            img.style.objectFit = 'contain';
            img.style.filter = 'brightness(0) saturate(100%) invert(56%) sepia(56%) saturate(502%) hue-rotate(354deg) brightness(93%) contrast(89%)';
            
            // Clear container and add image
            locationIconContainer.innerHTML = '';
            locationIconContainer.appendChild(img);
            
            console.log('Location icon loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchLocationIcon:', error);
    }
}

/**
 * Fetch date icon from Supabase storage
 * Fetches from 'icons' bucket, specifically 'calender.png'
 */
async function fetchDateIcon() {
    try {
        const dateIconContainer = document.getElementById('date-icon');
        
        if (dateIconContainer) {
            // Use the direct Supabase URL
            const iconUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/calender.png';
            
            // Create an image element for the icon
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'Date';
            img.style.width = '24px';
            img.style.height = '24px';
            img.style.objectFit = 'contain';
            
            // Clear container and add image
            dateIconContainer.innerHTML = '';
            dateIconContainer.appendChild(img);
            
            console.log('Date icon loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchDateIcon:', error);
    }
}

/**
 * Fetch Eshva icon from Supabase storage
 * Fetches from 'icons' bucket, specifically 'eshva.png'
 */
async function fetchEshvaIcon() {
    try {
        const eshvaIconContainer = document.getElementById('eshva-icon');
        
        if (eshvaIconContainer) {
            // Use the direct Supabase URL
            const iconUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/eshva.png';
            
            // Create an image element for the icon
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'Eshva';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            
            // Clear container and add image
            eshvaIconContainer.innerHTML = '';
            eshvaIconContainer.appendChild(img);
            
            console.log('Eshva icon loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchEshvaIcon:', error);
    }
}

async function fetchMaheshBabuIcon() {
    try {
        const maheshBabuIconContainer = document.getElementById('mahesh-babu-icon');
        
        if (maheshBabuIconContainer) {
            // Use the direct Supabase URL
            const iconUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/Mahesh%20babu.png';
            
            // Create an image element for the icon
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'Mahesh Babu';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            
            // Clear container and add image
            maheshBabuIconContainer.innerHTML = '';
            maheshBabuIconContainer.appendChild(img);
            
            console.log('Mahesh Babu icon loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchMaheshBabuIcon:', error);
    }
}

async function fetchFooterMaheshBabuLogo() {
    try {
        const footerLogoContainer = document.getElementById('footer-mahesh-babu-logo');
        
        if (footerLogoContainer) {
            // Use the direct Supabase URL
            const logoUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/Mahesh%20babu.png';
            
            // Create an image element for the logo
            const img = document.createElement('img');
            img.src = logoUrl;
            img.alt = 'Mahesh Babu Foundation';
            
            // Clear container and add image
            footerLogoContainer.innerHTML = '';
            footerLogoContainer.appendChild(img);
            
            console.log('Footer Mahesh Babu logo loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchFooterMaheshBabuLogo:', error);
    }
}

async function fetchCertificateMedalIcon() {
    try {
        const iconContainer = document.getElementById('certificate-medal-icon');
        if (iconContainer) {
            const iconUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/CERTIFICATE%20&%20MEDELS.png';
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'Certificate & Medals';
            iconContainer.innerHTML = '';
            iconContainer.appendChild(img);
            console.log('Certificate & Medal icon loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchCertificateMedalIcon:', error);
    }
}

async function fetchWaterBottleIcon() {
    try {
        const iconContainer = document.getElementById('water-bottle-icon');
        if (iconContainer) {
            const iconUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/WATER%20BOTTLE.png';
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'Water Bottle';
            iconContainer.innerHTML = '';
            iconContainer.appendChild(img);
            console.log('Water Bottle icon loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchWaterBottleIcon:', error);
    }
}

async function fetchTshirtIcon() {
    try {
        const iconContainer = document.getElementById('tshirt-icon');
        if (iconContainer) {
            const iconUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/t-shirt.png';
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'T-Shirt';
            iconContainer.innerHTML = '';
            iconContainer.appendChild(img);
            console.log('T-Shirt icon loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchTshirtIcon:', error);
    }
}

async function fetchGoodiesBagIcon() {
    try {
        const iconContainer = document.getElementById('goodies-bag-icon');
        if (iconContainer) {
            const iconUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/goodies-bag.png';
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'Goodies Bag';
            iconContainer.innerHTML = '';
            iconContainer.appendChild(img);
            console.log('Goodies Bag icon loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchGoodiesBagIcon:', error);
    }
}

async function fetchFeatureCardIcon() {
    try {
        const iconContainer = document.getElementById('feature-card-icon');
        if (iconContainer) {
            const iconUrl = 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/QUICK%20REGISTRATION.png';
            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = 'Quick Registration';
            iconContainer.innerHTML = '';
            iconContainer.appendChild(img);
            console.log('Feature card icon loaded successfully');
        }
    } catch (error) {
        console.error('Error in fetchFeatureCardIcon:', error);
    }
}

/**
 * Initialize interactive amenities content switching
 */
function initAmenitiesInteractive() {
    // Define content data for each amenity
    const amenitiesData = {
        registration: {
            image: 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/Photos/6.png',
            text: 'Scallop or far crud plain remarkably far by thus far iguana lewd precociously and and less rattlesnake contrary caustic wow this near alas and next and pled',
            icon: 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/QUICK%20REGISTRATION.png'
        },
        medical: {
            image: 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/Photos/8.png',
            text: 'Certified medical teams stationed throughout the route to ensure every runner\'s safety and immediate assistance if needed.',
            icon: 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/MEDICAL%20PERSSONEL.png'
        },
        drink: {
            image: 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/Photos/9.png',
            text: 'Hydration booths at key points to keep you refreshed and energised throughout the run.',
            icon: 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/DRINK%20STATIONS.png'
        },
        toilets: {
            image: 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/Photos/10.png',
            text: 'Clean and accessible restroom facilities available near the start and finish zones for a comfortable running experience.',
            icon: 'https://fbietamqdnxlmatcwpvr.supabase.co/storage/v1/object/public/icons/COMFORTABLE%20TOILETS.png'
        }
    };
    
    const amenityItems = document.querySelectorAll('.amenities-list-item');
    const amenityImage = document.getElementById('amenity-image');
    const featureCardText = document.querySelector('.feature-card-text');
    const featureCardIcon = document.getElementById('feature-card-icon');
    
    // Set initial active state and content (registration)
    if (amenityItems.length > 0) {
        amenityItems[0].classList.add('active-amenity');
        // Load registration content initially
        const initialData = amenitiesData['registration'];
        if (initialData && amenityImage && featureCardText) {
            amenityImage.src = initialData.image;
            featureCardText.textContent = initialData.text;
            if (featureCardIcon && initialData.icon) {
                featureCardIcon.querySelector('img').src = initialData.icon;
            }
        }
    }
    
    amenityItems.forEach(item => {
        item.addEventListener('click', function() {
            const amenityType = this.getAttribute('data-amenity');
            const data = amenitiesData[amenityType];
            
            if (data) {
                // Update image
                if (amenityImage) {
                    amenityImage.src = data.image;
                }
                
                // Update feature card text
                if (featureCardText) {
                    featureCardText.textContent = data.text;
                }
                
                // Update feature card icon
                if (featureCardIcon && data.icon) {
                    const iconImg = featureCardIcon.querySelector('img');
                    if (iconImg) {
                        iconImg.src = data.icon;
                    }
                }
                
                // Update active state
                amenityItems.forEach(i => i.classList.remove('active-amenity'));
                this.classList.add('active-amenity');
            }
        });
    });
}

/**
 * Show error message to user
 */
function showError(message) {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'color: #d32f2f; padding: 20px; background: #ffebee; border-radius: 4px; margin: 20px 0;';
        errorDiv.textContent = message;
        mainContent.insertBefore(errorDiv, mainContent.firstChild);
    }
}

