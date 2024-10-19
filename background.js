// Функция для инициализации хранилища с начальными значениями
function initializeStorage() {
    chrome.storage.sync.get(['screenSizeZooms'], (data) => {
        if (!data.screenSizeZooms) {
            chrome.storage.sync.set({
                screenSizeZooms: [
                    { size: 'Small (< 1366px)', zoom: 90 },
                    { size: 'Medium (1366px - 1920px)', zoom: 100 },
                    { size: 'Large (1921px - 2560px)', zoom: 115 },
                    { size: 'Extra Large (> 2560px)', zoom: 125 },
                ]
            });
        }
    });
}

// Функция для получения зума по размеру экрана
function getZoomForScreenSize(width, screenSizeZooms) {
    if (width < 1366) return screenSizeZooms[0]?.zoom || 90;
    if (width <= 1920) return screenSizeZooms[1]?.zoom || 100;
    if (width <= 2560) return screenSizeZooms[2]?.zoom || 115;
    return screenSizeZooms[3]?.zoom || 125;
}

// Функция для установки масштаба на вкладке
function setZoomForTab(tabId, zoom) {
    chrome.tabs.setZoom(tabId, zoom / 100);
}

// Функция для настройки зума в зависимости от размеров экрана
async function adjustZoom(tabId, forcedWidth) {
    const data = await chrome.storage.sync.get(['screenSizeZooms']);
    const tab = await chrome.tabs.get(tabId);

    if (!tab || !tab.url) return;

    const displays = await chrome.system.display.getInfo();
    const window = await chrome.windows.get(tab.windowId, { populate: false });
    const width = forcedWidth || window.width;

    const display = displays.find(d => window.left >= d.bounds.left && window.left < d.bounds.left + d.bounds.width);
    const defaultZoom = getZoomForScreenSize(display?.bounds.width || width, data.screenSizeZooms || []);

    setZoomForTab(tabId, defaultZoom);
}

// Слушатель для обновления вкладки после загрузки
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        adjustZoom(tabId);
    }
});

// Слушатель изменения границ окна для настройки зума
chrome.windows.onBoundsChanged.addListener((window) => {
    chrome.tabs.query({ active: true, windowId: window.id }, (tabs) => {
        if (tabs.length > 0) {
            adjustZoom(tabs[0].id, window.width);
        }
    });
});

// Инициализация хранилища при установке расширения
chrome.runtime.onInstalled.addListener(initializeStorage);