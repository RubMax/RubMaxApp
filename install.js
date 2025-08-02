window.deferredPrompt = null;

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  if (!installBtn) return;

  // Toujours afficher le bouton
  installBtn.style.display = 'block';

  let isInstalled =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  // Détecte l’installation après coup
  window.addEventListener('appinstalled', () => {
    isInstalled = true;
    console.log("📲 App installée avec succès");
  });

  // Par défaut, clique = message d’information
  installBtn.onclick = () => {
    if (isInstalled) {
      alert("✅ L'application est déjà installée.");
    } else if (!window.deferredPrompt) {
      alert("ℹ️ L'installation automatique n'est pas disponible.\nAjoutez manuellement via le menu du navigateur.");
    } else {
      // Si le prompt est dispo, on déclenche ici
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then((choice) => {
        console.log("Résultat:", choice.outcome);
        window.deferredPrompt = null;
      });
    }
  };

  // Quand le navigateur déclenche l’événement
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    console.log("🛎️ Prompt prêt");
  });
});
