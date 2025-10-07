// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// Initialize the app
function initApp() {
    // Expand the app to full height
    tg.expand();
    
    // Enable closing confirmation
    tg.enableClosingConfirmation();
    
    // Set header color
    tg.setHeaderColor('#0088cc');
    
    // Display user information
    displayUserInfo();
    
    // Display app information
    displayAppInfo();
    
    // Setup event listeners
    setupEventListeners();
    
    // Show main button
    setupMainButton();
    
    console.log('Telegram Mini App initialized successfully!');
}

function displayUserInfo() {
    const userInfoElement = document.getElementById('user-info');
    
    if (tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        userInfoElement.textContent = `Hello, ${user.first_name}${user.last_name ? ' ' + user.last_name : ''}!`;
    } else {
        userInfoElement.textContent = 'Hello, Telegram User!';
    }
}

function displayAppInfo() {
    document.getElementById('platform').textContent = tg.platform || 'Unknown';
    document.getElementById('version').textContent = tg.version || 'Unknown';
    document.getElementById('theme').textContent = tg.colorScheme || 'Unknown';
}

function setupEventListeners() {
    // Main button click
    document.getElementById('main-btn').addEventListener('click', () => {
        tg.showAlert('Main button clicked!');
    });
    
    // Haptic feedback button
    document.getElementById('haptic-btn').addEventListener('click', () => {
        tg.HapticFeedback.impactOccurred('medium');
        tg.showPopup({
            title: 'Haptic Feedback',
            message: 'Did you feel the vibration?',
            buttons: [
                {id: 'yes', type: 'default', text: 'Yes'},
                {id: 'no', type: 'default', text: 'No'}
            ]
        }, (buttonId) => {
            tg.showAlert(`You clicked: ${buttonId}`);
        });
    });
    
    // Close button
    document.getElementById('close-btn').addEventListener('click', () => {
        tg.showConfirm('Are you sure you want to close the app?', (confirmed) => {
            if (confirmed) {
                tg.close();
            }
        });
    });
}

function setupMainButton() {
    // Show the main button in Telegram interface
    tg.MainButton.text = 'Send Data';
    tg.MainButton.show();
    
    // Handle main button click
    tg.MainButton.onClick(() => {
        const data = {
            action: 'main_button_clicked',
            timestamp: Date.now(),
            user_id: tg.initDataUnsafe.user?.id || null
        };
        
        // Send data back to the bot
        tg.sendData(JSON.stringify(data));
    });
}

// Handle theme changes
tg.onEvent('themeChanged', () => {
    displayAppInfo();
    console.log('Theme changed to:', tg.colorScheme);
});

// Handle viewport changes
tg.onEvent('viewportChanged', () => {
    console.log('Viewport changed:', tg.viewportHeight, tg.viewportStableHeight);
});

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Debug information (remove in production)
console.log('Telegram WebApp object:', tg);
console.log('Init data:', tg.initDataUnsafe);