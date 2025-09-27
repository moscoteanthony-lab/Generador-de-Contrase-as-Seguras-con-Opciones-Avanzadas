// Elementos
const lengthEl = document.getElementById('length');
const lenVal = document.getElementById('lenVal');
const optLetters = document.getElementById('optLetters');
const optNumbers = document.getElementById('optNumbers');
const optSymbols = document.getElementById('optSymbols');
const passwordEl = document.getElementById('password');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const strengthEl = document.getElementById('strength');

// Conjuntos de caracteres
const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>/?|";

// Actualizar número al mover el rango
lenVal.textContent = lengthEl.value;
lengthEl.addEventListener('input', () => {
  lenVal.textContent = lengthEl.value;
});

// Generar contraseña
function generatePassword() {
  const len = parseInt(lengthEl.value, 10);
  let pool = "";
  if (optLetters.checked) pool += LETTERS;
  if (optNumbers.checked) pool += NUMBERS;
  if (optSymbols.checked) pool += SYMBOLS;

  if (!pool) {
    alert("Selecciona al menos una opción");
    return '';
  }

  let pass = '';
  for (let i = 0; i < len; i++) {
    pass += randomFrom(pool);
  }

  return pass;
}

// Función aleatoria
function randomFrom(s) {
  return s.charAt(Math.floor(Math.random() * s.length));
}

// Calcular fuerza
function strength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { text: "Débil", color: "#ef4444" };
  if (score === 3) return { text: "Media", color: "#f59e0b" };
  return { text: "Fuerte", color: "#10b981" };
}

// Evento: generar
generateBtn.addEventListener('click', () => {
  const p = generatePassword();
  if (p) {
    passwordEl.value = p;
    const s = strength(p);
    strengthEl.textContent = "Fuerza: " + s.text;
    strengthEl.style.background = s.color + "20";
    strengthEl.style.color = s.color;
  }
});

// Evento: copiar
copyBtn.addEventListener('click', async () => {
  const txt = passwordEl.value;
  if (!txt) {
    alert("No hay contraseña generada");
    return;
  }
  try {
    await navigator.clipboard.writeText(txt);
    copyBtn.textContent = "Copiado ✓";
    setTimeout(() => (copyBtn.textContent = "Copiar"), 1500);
  } catch (e) {
    passwordEl.select();
    document.execCommand("copy");
    copyBtn.textContent = "Copiado ✓";
    setTimeout(() => (copyBtn.textContent = "Copiar"), 1500);
  }
});
