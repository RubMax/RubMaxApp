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

  // Événement déclenché quand le navigateur autorise le prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    console.log("🛎️ Prompt prêt");

    installBtn.onclick = async () => {
      if (isInstalled) {
        alert("✅ L'application est déjà installée.");
        return;
      }

      if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        const choice = await window.deferredPrompt.userChoice;
        console.log("Résultat:", choice.outcome);
        window.deferredPrompt = null;
      }
    };
  });

  // Si beforeinstallprompt n’est jamais déclenché
  installBtn.onclick = () => {
    if (isInstalled) {
      alert("✅ L'application est déjà installée.");
    } else if (!window.deferredPrompt) {
      alert("ℹ️ L'installation automatique n'est pas disponible.\nAjoutez manuellement via le menu du navigateur.");
    }
  };
});
