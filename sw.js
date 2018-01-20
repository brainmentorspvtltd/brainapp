// I am a service worker

self.addEventListener("install",(event)=>{
    // Happens Only Once...
    console.log("Service Worker Install Event Fire --- Brain Mentors........",event);

    event.waitUntil(
        caches.open('brainmentors-cache')
          .then(function(cache) {
            console.log('Doing Cache Load....');
            cache.add('/');
            cache.add('index.html');
            
            cache.add('js/custom/app.js');
            cache.add('js/custom/item.js');
            cache.add('js/custom/itemoperations.js');
            cache.add('js/custom/controller.js');
            cache.add('css/bootstrap.min.css');
            cache.add('css/custom/design.css');
            
           
          })
      );

});
self.addEventListener("activate",(event)=>{
    console.log("Service Worker Activate Event Fire.... ",event);
});


self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            if (response) {
              return response;
            } else {
              return fetch(event.request);
            }
          })
      );
});




self.addEventListener('beforeinstallprompt', function(e) {
      console.log("beforeinstallprompt call");
      e.userChoice.then(function(choiceResult) {
    
        console.log(choiceResult.outcome);
    
        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
      });
    });

