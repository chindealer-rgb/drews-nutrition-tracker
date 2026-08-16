const CACHE='drews-nutrition-v2';
const ASSETS=[
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./hero-pullups.jpg",
  "./motivation-card.jpg",
  "./food-eggs3toast.jpg",
  "./food-groundchickenrice.jpg",
  "./food-groundbeefrice.jpg",
  "./food-groundturkeyrice.jpg",
  "./food-chipotlechicken.jpg",
  "./food-chickenthighs.jpg",
  "./food-broccoli.jpg",
  "./food-asparagus.jpg",
  "./food-avocado.jpg",
  "./food-blackbeans.jpg",
  "./food-humapro.jpg",
  "./food-precisionprotein.jpg"
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    caches.match(e.request).then(cached=>{
      if(cached) return cached;
      return fetch(e.request).then(res=>{
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
        return res;
      }).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Promise.reject());
    })
  );
});
