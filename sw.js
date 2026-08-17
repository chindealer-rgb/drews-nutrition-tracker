const CACHE='drews-nutrition-v1.5.0';
const ASSETS=[
  "./",
  "./food-asparagus.jpg",
  "./food-avocado.jpg",
  "./food-bacon2.jpg",
  "./food-blackbeans.jpg",
  "./food-broccoli.jpg",
  "./food-chickentacolarge.jpg",
  "./food-chickenthighs.jpg",
  "./food-chipotlechicken.jpg",
  "./food-egg1.jpg",
  "./food-eggs3toast.jpg",
  "./food-groundbeefrice.jpg",
  "./food-groundchickenrice.jpg",
  "./food-groundturkeyrice.jpg",
  "./food-humapro.jpg",
  "./food-pbj.jpg",
  "./food-potato.jpg",
  "./food-precisionprotein.jpg",
  "./food-shrimpricebeans.jpg",
  "./food-steakbroccoli.jpg",
  "./food-sweetpotatohalf.jpg",
  "./food-turkeybacon2.jpg",
  "./hero-pullups.jpg",
  "./icon-192.png",
  "./icon-512.png",
  "./index.html",
  "./motivation-card.jpg",
  "./version.json"
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 if(u.pathname.endsWith('/version.json')){e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('./version.json')));return;}
 e.respondWith(caches.match(e.request).then(cached=>{
   const network=fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return r;});
   return cached||network.catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Promise.reject());
 }));
});
