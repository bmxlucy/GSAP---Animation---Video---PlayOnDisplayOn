// Run Video from beginnnig
window.Webflow ||= [];
window.Webflow.push(() => {

  const vids = document.querySelectorAll(".js-video-sync");
  const prev = new WeakMap();

  const shown = (v) => v.offsetParent !== null;

  vids.forEach(v => {
    const wrap = v.closest(".w-embed") || v.parentElement;
    prev.set(v, shown(v));

    const sync = () => {
      const s = shown(v);
      if (prev.get(v) === s) return;
      prev.set(v, s);

      if (!s) {
        v.pause();
        v.currentTime = 0;
      } else {
        v.currentTime = 0;
        v.play().catch(()=>{});
      }
    };

    new MutationObserver(sync).observe(wrap, {
      attributes:true,
      attributeFilter:["class","style"]
    });

    sync();
  });

});