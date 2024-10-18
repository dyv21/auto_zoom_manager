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


// Инициализация хранилища при установке расширения
chrome.runtime.onInstalled.addListener(initializeStorage);