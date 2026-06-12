// Script Monalisa Interativa - Alura
// Movimento dos olhos acompanhando o cursor do mouse

class MonalisaInterativa {
    constructor() {
        this.canvas = document.querySelector('.monalisa-canvas');
        this.eyesData = [
            {
                iris: document.querySelector('.iris-left'),
                pupil: document.querySelector('.pupil-left'),
                brilho: document.querySelector('.brilho-left'),
                centerX: 170,
                centerY: 165
            },
            {
                iris: document.querySelector('.iris-right'),
                pupil: document.querySelector('.pupil-right'),
                brilho: document.querySelector('.brilho-right'),
                centerX: 230,
                centerY: 165
            }
        ];

        this.maxDistance = 8; // Distância máxima que a pupila se move
        this.init();
    }

    init() {
        // Event listeners para movimento do mouse
        document.addEventListener('mousemove', (e) => this.updateEyesPosition(e));
        
        // Event listener para quando o mouse sai da tela
        document.addEventListener('mouseleave', () => this.resetEyes());
        
        // Support para toque em dispositivos móveis
        document.addEventListener('touchmove', (e) => this.handleTouch(e));
        document.addEventListener('touchend', () => this.resetEyes());

        console.log('✨ Monalisa Interativa iniciada! Mova o mouse sobre o canvas para ver os olhos acompanharem.');
    }

    updateEyesPosition(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Obter a posição do canvas em relação à tela
        const canvasRect = this.canvas.getBoundingClientRect();
        const canvasCenterX = canvasRect.left + canvasRect.width / 2;
        const canvasCenterY = canvasRect.top + canvasRect.height / 2;

        // Calcular ângulo entre o mouse e o centro do canvas
        const angle = Math.atan2(mouseY - canvasCenterY, mouseX - canvasCenterX);

        // Atualizar cada olho
        this.eyesData.forEach((eye) => {
            this.moveEye(eye, angle);
        });
    }

    moveEye(eye, angle) {
        // Calcular a nova posição da pupila
        const moveX = Math.cos(angle) * this.maxDistance;
        const moveY = Math.sin(angle) * this.maxDistance;

        // Atualizar posição da pupila
        eye.pupil.setAttribute('cx', eye.centerX + moveX);
        eye.pupil.setAttribute('cy', eye.centerY + moveY);

        // Atualizar posição do brilho (ligeiramente deslocado)
        const brilhoX = eye.centerX + moveX * 0.6;
        const brilhoY = eye.centerY + moveY * 0.6;
        eye.brilho.setAttribute('cx', brilhoX);
        eye.brilho.setAttribute('cy', brilhoY);

        // Mover a íris ligeiramente
        eye.iris.setAttribute('cx', eye.centerX + moveX * 0.5);
        eye.iris.setAttribute('cy', eye.centerY + moveY * 0.5);
    }

    resetEyes() {
        // Retornar os olhos à posição padrão
        this.eyesData.forEach((eye) => {
            eye.pupil.setAttribute('cx', eye.centerX);
            eye.pupil.setAttribute('cy', eye.centerY);
            eye.brilho.setAttribute('cx', eye.centerX + 2);
            eye.brilho.setAttribute('cy', eye.centerY - 3);
            eye.iris.setAttribute('cx', eye.centerX);
            eye.iris.setAttribute('cy', eye.centerY);
        });
    }

    handleTouch(event) {
        // Suporte para dispositivos móveis
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            const fakeEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.updateEyesPosition(fakeEvent);
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new MonalisaInterativa();
});

// Função auxiliar para debug (opcional)
function logMonalisaInfo() {
    console.log('🎨 Monalisa Interativa');
    console.log('📍 Cores utilizadas:');
    console.log('  - Pele: #d4a574');
    console.log('  - Cabelo: #4a3820');
    console.log('  - Olhos: #6b4423');
    console.log('  - Fundo: #a8996b -> #8b7d5f');
    console.log('  - Paisagem: #7a9b6f -> #6b8b5f');
    console.log('👀 Recurso: Olhos seguem o cursor do mouse');
    console.log('📱 Suporte a dispositivos móveis com toque');
}

// Chamar função de debug ao iniciar
logMonalisaInfo();
