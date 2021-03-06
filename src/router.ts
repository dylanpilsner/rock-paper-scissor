import { initWelcomePage } from "./pages/welcome";
import { initInstructionsPage } from "./pages/instructions";
import { initPlayPage } from "./pages/play";
import { initResultsPage } from "./pages/results";

const routes = [
  {
    path: /\/welcome/,
    component: initWelcomePage,
  },
  {
    path: /\/instructions/,
    component: initInstructionsPage,
  },
  {
    path: /\/play/,
    component: initPlayPage,
  },
  {
    path: /\/results/,
    component: initResultsPage,
  },
];

function isGithubPages() {
  return location.host.includes("github.io");
}

export function initRoute(container: Element) {
  const BASE_PATH = "/rock-paper-scissor";
  function handleRoute(route) {
    for (let r of routes) {
      if (r.path.test(route)) {
        const el: any = r.component({ goTo: goTo });
        container.firstChild?.remove();
        container.appendChild(el);
      }
    }
  }

  function goTo(path) {
    const completePath = isGithubPages() ? BASE_PATH + path : path;
    history.pushState({}, "", completePath);
    handleRoute(completePath);
  }

  if (location.host.includes("github.io")) {
    goTo("/welcome");
  }

  window.onpopstate = () => {
    handleRoute(location.pathname);
  };
  handleRoute(location.pathname);
}
