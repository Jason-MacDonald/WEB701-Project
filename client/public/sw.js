'use strict';

// ##### PUSH EVENT HANDLER #####
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    
    // Test content displayed in notification.
    const title = 'Push Codelab';
    const options = {
      body: 'Yay it works.',
      icon: 'images/icon.png',
      badge: 'images/badge.png'
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });

  // ##### NOTIFICATION CLICK HANDLER #####
  // Called when a user clicks on the displayed notification.
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click received.');
    
    //Closes the notification dialog.
    event.notification.close();
    
    // Opens a new window. TODO: Change to public address of app.
    event.waitUntil(
      clients.openWindow('https://developers.google.com/web')
    );
  });