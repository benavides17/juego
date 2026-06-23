// Función para transiciones suaves
function transitionTo(hideId, showId) {
  const hideElement = document.querySelector(hideId);
  const showElement = document.querySelector(showId);
  
  if (hideElement) hideElement.style.display = 'none';
  if (showElement) showElement.style.display = 'flex';
}

// Efecto de sonido (usando Web Audio API)
function playSound(frequency = 440, duration = 100) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch(e) {
    console.log('Audio context not available');
  }
}

// Efecto de parpadeo en botones
function addClickEffect(element) {
  playSound(600, 150);
  element.style.transform = "scale(0.95)";
  element.style.textShadow = "0 0 20px #ff60b4";
  setTimeout(() => {
    element.style.transform = "scale(1)";
    element.style.textShadow = "0 0 5px #72efff";
  }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
  // Eventos principales del juego
  const noButton = document.querySelector('.no');
  if (noButton) {
    noButton.addEventListener('click', function() {
      addClickEffect(this);
      transitionTo("#f1", "#f2");
    });
  }

  const wenoButton = document.querySelector('.weno');
  if (wenoButton) {
    wenoButton.addEventListener('click', function() {
      addClickEffect(this);
      transitionTo("#f2", "#f1");
    });
  }

  const siButton = document.querySelector('.si');
  if (siButton) {
    siButton.addEventListener('click', function() {
      addClickEffect(this);
      transitionTo("#f1", "#f3");
    });
  }

  document.querySelector('.dale').addEventListener('click', function() {
    addClickEffect(this);
    transitionTo("#f3", "#f4");
  });

  document.querySelector('.rega').addEventListener('click', function() {
    addClickEffect(this);
    transitionTo("#f4", "#f5");
  });

  document.querySelector('.ojo').addEventListener('click', function() {
    addClickEffect(this);
    transitionTo("#f5", "#f6");
  });

  document.querySelector('.afi').addEventListener('click', function() {
    addClickEffect(this);
    playSound(800, 200);
    document.querySelector("#f6").style.display = "none";
    document.querySelector("#f7").style.display = "flex";
    setTimeout(() => {
      document.querySelector("#f8").style.display = "flex";
    }, 500);
  });

  document.querySelector('.salu').addEventListener('click', function() {
    addClickEffect(this);
    transitionTo("#f8", "#f9");
  });

  document.querySelector('.copy').addEventListener('click', function() {
    addClickEffect(this);
    document.querySelector("#f9").style.display = "none";
    document.querySelector("#f10").style.display = "flex";
    setTimeout(() => {
      document.querySelector("#f11").style.display = "flex";
    }, 200);
  });

  document.querySelector('span.go').addEventListener('click', function() {
    addClickEffect(this);
    transitionTo("#f13", "#f14");
  });

  document.querySelector('.ca1').addEventListener('click', function() {
    addClickEffect(this);
    playSound(523, 150);
    document.querySelector("#cofre1").style.display = "flex";
  });

  // Cerrar cofre 1
  document.querySelector('.cerrar-cofre1').addEventListener('click', function() {
    addClickEffect(this);
    document.querySelector("#cofre1").style.display = "none";
  });

  document.querySelector('.ca2').addEventListener('click', function() {
    addClickEffect(this);
    playSound(784, 150);
    document.querySelector("#cofre2").style.display = "flex";
  });

  // Cofre 2 - Si o No (Propuesta de matrimonio)
  const cofre2Buttons = document.querySelectorAll('#cofre2 .si, #cofre2 .no');
  cofre2Buttons.forEach(button => {
    button.addEventListener('click', function() {
      addClickEffect(this);
      playSound(784, 150);
      document.querySelector("#cofre2").style.display = "none";
      if (this.classList.contains('si')) {
        // Si aceptas - ir a la pregunta
        transitionTo("#f11", "#f20");
      } else {
        // No rechazas - ir al final
        transitionTo("#f11", "#f22");
      }
    });
  });

  document.querySelector('.ca3').addEventListener('click', function() {
    addClickEffect(this);
    playSound(659, 150);
    document.querySelector("#f15").style.display = "flex";
    setTimeout(() => {
      document.querySelector("#f16").style.display = "flex";
    }, 200);
  });

  document.querySelector('.carta').addEventListener('click', function() {
    addClickEffect(this);
    document.querySelector("#f12").style.display = "none";
  });

  document.querySelector('.anillo').addEventListener('click', function() {
    addClickEffect(this);
    playSound(1046, 200);
    transitionTo("#f16", "#f17");
  });

  document.querySelector('.marry').addEventListener('click', function() {
    addClickEffect(this);
    document.querySelector("#f15").style.display = "none";
    document.querySelector("#f17").style.display = "none";
  });

  document.querySelector('.meme').addEventListener('click', function() {
    addClickEffect(this);
    transitionTo("#f19", "#f20");
  });

  document.querySelector('.meme2').addEventListener('click', function() {
    addClickEffect(this);
    transitionTo("#f20", "#f21");
  });

  document.querySelectorAll('.yes').forEach(element => {
    element.addEventListener('click', function() {
      addClickEffect(this);
      playSound(880, 300);
      transitionTo("#f21", "#f22");
    });
  });

  // Eventos para el modal del mensaje
  const btnMensaje = document.querySelector('.btn-mensaje');
  const btnCerrarModal = document.querySelector('.btn-cerrar-modal');
  const modalMensaje = document.querySelector('#modal-mensaje');

  if (btnMensaje) {
    btnMensaje.addEventListener('click', function() {
      addClickEffect(this);
      if (modalMensaje) {
        modalMensaje.style.display = 'flex';
      }
    });
  }

  if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', function() {
      addClickEffect(this);
      if (modalMensaje) {
        modalMensaje.style.display = 'none';
      }
    });
  }

  // Cerrar modal al hacer click fuera de él
  if (modalMensaje) {
    modalMensaje.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    });
  }

  // Añadir efectos al cargar la página
  playSound(440, 100);
  setTimeout(() => playSound(550, 100), 150);
  setTimeout(() => playSound(659, 150), 250);
});
