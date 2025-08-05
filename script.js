document.addEventListener('DOMContentLoaded', () => {

    // --- MÓDULO DE INICIALIZACIÓN PRINCIPAL ---
    function init() {
        initializeModals();
        setupPrimeCalculator();
        setupFibonacciCalculator();
        setupBmiCalculator();
        setupPalindromeChecker();
    }

    // --- MANEJADOR DE MODALES GENÉRICO (CÓDIGO REUTILIZABLE) ---
    function initializeModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.getAttribute('data-modal-target');
                const modal = document.querySelector(`[data-modal-id="${modalId}"]`);
                if (modal) modal.classList.add('active');
            });
        });

        const allModals = document.querySelectorAll('.modal');
        allModals.forEach(modal => {
            const closeButton = modal.querySelector('.close-btn');
            const overlay = modal.querySelector('.modal-overlay');

            closeButton.addEventListener('click', () => modal.classList.remove('active'));
            overlay.addEventListener('click', () => modal.classList.remove('active'));
        });
    }

    // --- FUNCIÓN DE AYUDA PARA MOSTRAR RESULTADOS/ERRORES ---
    function displayResult(element, message, isError = false) {
        element.innerHTML = message;
        element.classList.remove('success', 'error');
        // Pequeño delay para que la transición de clase sea visible
        setTimeout(() => {
            element.classList.add(isError ? 'error' : 'success');
        }, 10);
    }

    // --- LÓGICA DE CADA TARJETA EN SU PROPIO MÓDULO ---

    // 🟦 Números Primos
    function setupPrimeCalculator() {
        const btn = document.getElementById('calculate-primes');
        const fromInput = document.getElementById('prime-from');
        const toInput = document.getElementById('prime-to');
        const resultDiv = document.getElementById('prime-result');

        btn.addEventListener('click', () => {
            const from = parseInt(fromInput.value, 10);
            const to = parseInt(toInput.value, 10);

            if (isNaN(from) || isNaN(to) || from < 0 || to < 0 || from >= to) {
                displayResult(resultDiv, '⚠️ Rango inválido. "Desde" debe ser un número positivo y menor que "Hasta".', true);
                return;
            }

            const primes = [];
            for (let i = from; i <= to; i++) {
                if (isPrime(i)) primes.push(i);
            }
            displayResult(resultDiv, `<strong>Primos encontrados:</strong> ${primes.length > 0 ? primes.join(', ') : 'Ninguno'}`);
        });

        function isPrime(num) {
            if (num <= 1) return false;
            if (num <= 3) return true;
            if (num % 2 === 0 || num % 3 === 0) return false;
            for (let i = 5; i * i <= num; i = i + 6) {
                if (num % i === 0 || num % (i + 2) === 0) return false;
            }
            return true;
        }
    }

    // 🟨 Serie Fibonacci
    function setupFibonacciCalculator() {
        const btn = document.getElementById('calculate-fib');
        const limitInput = document.getElementById('fib-limit');
        const resultDiv = document.getElementById('fib-result');

        btn.addEventListener('click', () => {
            const limit = parseInt(limitInput.value, 10);
            if (isNaN(limit) || limit < 0) {
                displayResult(resultDiv, '⚠️ Por favor, ingresa un número positivo como límite.', true);
                return;
            }

            if (limit === 0) {
                displayResult(resultDiv, '<strong>Serie:</strong> 0');
                return;
            }

            const series = [0, 1];
            while (series[series.length - 1] + series[series.length - 2] <= limit) {
                series.push(series[series.length - 1] + series[series.length - 2]);
            }
            displayResult(resultDiv, `<strong>Serie Fibonacci:</strong> ${series.join(', ')}`);
        });
    }

    // 🟩 Cálculo de IMC
    function setupBmiCalculator() {
        const btn = document.getElementById('calculate-bmi');
        const weightInput = document.getElementById('bmi-weight');
        const heightInput = document.getElementById('bmi-height');
        const resultDiv = document.getElementById('bmi-result');
        
        btn.addEventListener('click', () => {
            const weightLbs = parseFloat(weightInput.value);
            const heightM = parseFloat(heightInput.value);
            if (isNaN(weightLbs) || isNaN(heightM) || weightLbs <= 0 || heightM <= 0) {
                displayResult(resultDiv, '⚠️ Ingresa valores válidos y positivos para peso y altura.', true);
                return;
            }

            const bmi = (weightLbs * 0.453592) / (heightM ** 2);
            let category;
            if (bmi < 18.5) category = 'Bajo peso';
            else if (bmi < 24.9) category = 'Peso normal';
            else if (bmi < 29.9) category = 'Sobrepeso';
            else category = 'Obesidad';
            
            displayResult(resultDiv, `<strong>IMC: ${bmi.toFixed(2)}</strong> (${category})`);
        });
    }

    // 🟥 Palabra Palíndroma
    function setupPalindromeChecker() {
        const btn = document.getElementById('check-palindrome');
        const wordInput = document.getElementById('palindrome-word');
        const resultDiv = document.getElementById('palindrome-result');

        btn.addEventListener('click', () => {
            const word = wordInput.value;
            if (!word.trim()) {
                displayResult(resultDiv, '⚠️ Ingresa una palabra o frase para verificar.', true);
                return;
            }

            const cleaned = word.toLowerCase().replace(/[\W_]/g, '');
            if(cleaned.length === 0){
                displayResult(resultDiv, '⚠️ La entrada solo contiene símbolos o espacios.', true);
                return;
            }
            const isPalindrome = cleaned === cleaned.split('').reverse().join('');

            if (isPalindrome) {
                displayResult(resultDiv, `✅ ¡Correcto! <strong>"${word}"</strong> es un palíndromo.`);
            } else {
                displayResult(resultDiv, `❌ No, <strong>"${word}"</strong> no es un palíndromo.`);
            }
        });
    }

    // Llama a la función principal para iniciar todo
    init();
});