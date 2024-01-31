document.addEventListener('DOMContentLoaded', function () {
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

    // Attach event listeners to your buttons
    var enterButton = document.getElementById('enter-button');
    var clearButton = document.getElementById('clear-button');

    enterButton.addEventListener('click', function () {
        captureCanvasAndSend('topCanvas');
        captureCanvasAndSend('centerCanvas');
        captureCanvasAndSend('bottomCanvas');
    });

    clearButton.addEventListener('click', function () {
        clearCanvas(topCtx, topCanvas);
        clearCanvas(centerCtx, centerCanvas);
        clearCanvas(bottomCtx, bottomCanvas);
    });

    function captureCanvasAndSend(canvasId) {
        var canvas = document.getElementById(canvasId);
        var dataURL = canvas.toDataURL(); // Convert canvas to base64 data URL

        fetch('/api/capture_canvas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ canvasId: canvasId, dataURL: dataURL })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`Image from ${canvasId} captured successfully. Image URL: ${data.imageUrl}`);
            } else {
                console.error('Failed to capture and send canvas data.');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function clearCanvas(ctx, canvas) {
        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Additional logic to redraw any necessary elements or lines after clearing
        // You may reapply the initial canvas state or redraw any default elements
        initializeCanvas(canvas, ctx, '#000000');
    }
});