/*
 * Main router object
 */
const router = {
  // maps routes to states
  routes: {
    '/': 'index',
    '/restaurant/': 'details'
  },

  init() {
    // Load the page
    this.navigate(location.href);

    // Listen for clicks on links. Exclude bookmark links
    document.body.addEventListener('click', (e) => {
      if (e.target.nodeName === 'A' &&
          e.target.getAttribute('href').charAt(0) !== '#') {
        e.preventDefault();
        this.navigate(e.target.href);
      }
    });
    // Manage back and forward buttons
    window.onpopstate = () => {
      this.navigate(location.href);
    };
    // Register Service Worker
    if (!navigator.serviceWorker) return;
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
  },



  // @param url string
  navigate(url) {
    if (new URL(url).origin === location.origin) {
      if (url !== location.href) {
        history.pushState(null, null, url);
      }
      this.changeState(url);
    }
  },

  changeState(url) {
    mainController.setState(
      this.routes[new URL(url).pathname]
    );
  }
};

document.addEventListener('DOMContentLoaded', () => router.init());