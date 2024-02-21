<script>
    import Button from '/src/components/Button.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { fabric } from 'fabric';

    let fabricInstance;

    onMount(() => {
        fabricInstance = new fabric.Canvas('canvas');
    });

    onDestroy(() => {
        fabricInstance?.dispose();
    });

    const addSquare = () => {
        /**
         * Perform a GET request to /color with the number of the square to get a random color
         * Display a loading spinner instead of button while loading
         * Add a 50x50px square of color, to random position on canvas
         * 
         * See: http://fabricjs.com/fabric-intro-part-1#objects
         */
    }

    const clearSquares = () => {
        /**
         * Remove all squares from canvas
        */
    }

    const downloadImage = () => {
        /**
         * Download canvas as PNG
        */
    }
</script>

<div class="container mx-auto py-8">
    <div class="flex bg-slate-100">
        <canvas id="canvas" width="400" height="400" class="bg-slate-200" />
        <div class="p-8 space-y-4">
            <div class="flex gap-4">
                <Button action={addSquare} label="Add square" />
                <Button action={clearSquares} label="Clear squares" />
                <Button action={downloadImage} label="Download image" />
            </div>
            <h2 class="text-xl">Squares:</h2>
            <ul>
                <!-- List of squares in the order of their "z" index -->
                <!-- Entries of list can be drag&dropped and that action should updateir "z" order on the canvas -->
            </ul>
        </div>
    </div>
</div>