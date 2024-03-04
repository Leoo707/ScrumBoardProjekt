let body = document.body,
  starter = document.querySelector("h1"),
  scroll_counter = 0,
  scrolled,
  auto_scroll_kicked = false;

starter.addEventListener("click", start_scrolling);

function start_scrolling() {
  auto_scroll_kicked = true;
  body.offsetHeight > scroll_counter
    ? (scroll_counter += 3.12)
    : (scroll_counter = body.offsetHeight);
  document.documentElement.scrollTop = scroll_counter;
  scroller = window.requestAnimationFrame(start_scrolling);

  if (scroll_counter >= body.offsetHeight) {
    window.cancelAnimationFrame(scroller);
  }
}

window.addEventListener("wheel", (e) => {
  if (auto_scroll_kicked) {
    window.cancelAnimationFrame(scroller);
    scroll_counter = 0;
  }
});
