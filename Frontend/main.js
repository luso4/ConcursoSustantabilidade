// Import the functions needed from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFAxzVh5z5erSUKqvSLh5OGxN9bxXrPug",
  authDomain: "sustentabilidade-cd465.firebaseapp.com",
  projectId: "sustentabilidade-cd465",
  storageBucket: "sustentabilidade-cd465.firebasestorage.app",
  messagingSenderId: "545614370680",
  appId: "1:545614370680:web:dfef3d8f7c5f44bea49a8d",
  measurementId: "G-604CWSPS2Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Handle User Registration
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  try {
    // Create a new user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, `${username}@gmail.com`, password);
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username
    });

    alert('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    alert(error.message);
  }
});

// Handle User Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    // Attempt login using Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, `${username}@gmail.com`, password);
    const user = userCredential.user;

    // Retrieve user data from Firestore
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      const userData = docSnap.data();
      alert('Login successful. Welcome ' + userData.username);
    } else {
      alert('No user data found');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert(error.message);
  }
});







// Função para carregar o scoreboard do back-end e exibir na página
function carregarScoreboard() {
    fetch('http://localhost:5000/scoreboard')
      .then(response => response.json())
      .then(data => {
        const scoreboardDiv = document.getElementById('scoreboard');
        scoreboardDiv.innerHTML = ''; // Limpar conteúdo anterior
  
        data.forEach(jogador => {
          const jogadorDiv = document.createElement('div');
          jogadorDiv.textContent = `${jogador.nome}: ${jogador.pontos} pontos`;
          scoreboardDiv.appendChild(jogadorDiv);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar o scoreboard:', error);
      });
  }
  
  // Chama a função para carregar o scoreboard assim que a página for carregada
  window.onload = carregarScoreboard;
  
  // Ativar a câmera do celular para escanear QR Code
  document.getElementById('scanQRCodeButton').addEventListener('click', function() {
    const video = document.getElementById('video');
    video.style.display = 'block';
    
    // Acessar a câmera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
        detectarQRCode(video);
      })
      .catch(function(error) {
        console.error('Erro ao acessar a câmera: ', error);
      });
  });
  
  // Função para detectar o QR Code a partir do vídeo
  function detectarQRCode(video) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
  
    // Atualiza o canvas a cada 100ms
    setInterval(function() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Desenha o vídeo no canvas
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        // Tenta ler o QR Code
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
  
        if (qrCode) {
          // Quando o QR Code for detectado, mostrar o conteúdo
          alert('QR Code detectado: ' + qrCode.data);
          // Aqui você pode realizar alguma ação, como enviar dados para o servidor
        }
      }
    }, 100);
  }

  
  