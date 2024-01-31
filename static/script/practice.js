document.addEventListener('DOMContentLoaded', function() {
    const topCanvas = document.getElementById('topCanvas');
    const centerCanvas = document.getElementById('centerCanvas');
    const bottomCanvas = document.getElementById('bottomCanvas');

    const topCtx = topCanvas.getContext('2d');
    const centerCtx = centerCanvas.getContext('2d');
    const bottomCtx = bottomCanvas.getContext('2d');

    // Set canvas sizes
    const canvasHeight = window.innerHeight * 0.25;
    const canvasWidth = 800;
    topCanvas.width = centerCanvas.width = bottomCanvas.width = canvasWidth;
    topCanvas.height = canvasHeight * 0.50;
    centerCanvas.height = canvasHeight * 1.50;
    bottomCanvas.height = canvasHeight * 0.50;

    // Function to handle drawing on canvas
    function initializeCanvas(canvas, ctx, lineColor) {
        // Draw dividing line below the canvas
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);  // Move to the bottom-left corner of the canvas
        ctx.strokeStyle = lineColor || 'rgba(0, 0, 0, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();

        let isDrawing = false;

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            draw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, ctx, true);
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDrawing) {
                draw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, ctx, false);
            }
        });

        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            ctx.beginPath();
        });

        function draw(x, y, context, isDown) {
            if (isDown) {
                context.beginPath();
                context.strokeStyle = '#000';
                context.lineWidth = 5;
                context.lineJoin = 'round';
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
                context.stroke();
            }
        }
    }

    initializeCanvas(topCanvas, topCtx, '#000000'); // Red line for top division
    initializeCanvas(centerCanvas, centerCtx, '#000000'); // Blue line for center division
    initializeCanvas(bottomCanvas, bottomCtx, '#000000'); // Green line for bottom division
});
