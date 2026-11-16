// 三种语言放在同一页：按网址 #zh-Hans / #zh-Hant / #en 或浏览器语言显示一种，没有 JS 时全部显示
(function () {
  var langs = ["zh-Hans", "zh-Hant", "en"];
  function pick() {
    var h = location.hash.slice(1);
    if (langs.indexOf(h) >= 0) return h;
    var n = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    n = n.toLowerCase();
    if (n.indexOf("zh") === 0) {
      return /hant|hk|tw|mo/.test(n) ? "zh-Hant" : "zh-Hans";
    }
    return "en";
  }
  function show(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      el.classList.toggle("on", el.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll("nav.langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set") === lang ? "true" : "false");
    });
    var t = document.querySelector('[data-lang="' + lang + '"] h1');
    if (t) document.title = t.textContent + " · " + document.body.getAttribute("data-app");
  }
  document.documentElement.classList.add("js");
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav.langs button").forEach(function (b) {
      b.addEventListener("click", function () {
        var l = b.getAttribute("data-set");
        history.replaceState(null, "", "#" + l);
        show(l);
      });
    });
    show(pick());
  });
  window.addEventListener("hashchange", function () { show(pick()); });
})();
