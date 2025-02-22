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
  