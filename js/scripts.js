// 검색창 + 토글 버튼으로 목록(경력/프로젝트)을 걸러내는 코드.
// data-item 이 붙은 항목만 대상이고, 해당 요소가 없는 페이지에서는 아무 일도 하지 않는다.
(function () {
    var items = document.querySelectorAll('[data-item]');
    if (!items.length) return;

    var search = document.getElementById('pfSearch');
    var buttons = document.querySelectorAll('.pf-toggle button');
    var empty = document.getElementById('pfEmpty');
    var category = 'all';

    function apply() {
        var q = search ? search.value.trim().toLowerCase() : '';
        var shown = 0;
        items.forEach(function (el) {
            var okCategory = category === 'all' || el.dataset.category === category;
            var okText = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
            el.hidden = !(okCategory && okText);
            if (!el.hidden) shown++;
        });
        if (empty) empty.hidden = shown > 0;
    }

    if (search) search.addEventListener('input', apply);
    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            category = btn.dataset.filter;
            buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
            apply();
        });
    });
})();
