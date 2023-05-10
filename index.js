(function (window) {
  const isGithubEnv = window.origin.indexOf("github") > 0;
  if (isGithubEnv) {
    const allLinks = document.querySelectorAll(".main .link");
    allLinks.forEach((link) => {
      link.href = link.href.replace(`${window.origin}/`, window.location.href);
    });
  }
})(window);
