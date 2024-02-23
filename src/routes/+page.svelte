<script lang="ts">
    import Button from "../components/Button.svelte";
    import { onDestroy, onMount } from "svelte";
    import { fabric } from "fabric";
    import Sortable from "sortablejs";

    let fabricInstance: fabric.Canvas;
    let loadingColor = false;
    const WIDTH = 400;
    const HEIGHT = 400;

    $: squares = [] as fabric.Rect[];

    onMount(() => {
        fabricInstance = new fabric.Canvas('canvas');
    });

    onDestroy(() => {
        fabricInstance?.dispose();
    });

    const addSquare = async () => {
        /**
         * Perform a GET request to /color with the number of the square to get a random color
         * Display a loading spinner instead of button while loading
         * Add a 50x50px square of color, to random position on canvas
         *
         * See: http://fabricjs.com/fabric-intro-part-1#objects
         */
        loadingColor = true;

        const res = await fetch(`/color?number=${squares.length}`);
        const data: { color: string } = await res.json();

        loadingColor = false;

        let square = new fabric.Rect({
            width: 50,
            height: 50,
            fill: data.color,
            // make sure square is not outside of canvas
            left: Math.random() * (WIDTH - 50),
            top: Math.random() * (HEIGHT - 50),
        });

        fabricInstance.add(square);
        // move to the top
        fabricInstance.moveTo(square, squares.length);

        squares = [...squares, square];
        console.log(squares);
    };

    const clearSquares = () => {
        fabricInstance.clear();
        squares = [];
    };

    const downloadImage = () => {
        /**
         * Download canvas as PNG
         */
        const link = document.createElement("a");
        link.href = fabricInstance.toDataURL({
            format: "png",
        });
        link.download = "canvas.png";
        link.click();

        link.remove();
    };
</script>

<div class="container mx-auto py-8">
    <div class="flex bg-slate-100">
        <canvas id="canvas" width={WIDTH} height={HEIGHT} />
        <!-- class="bg-slate-200" -->
        <div class="p-8 space-y-4">
            <div class="flex gap-4">
                <Button
                    loading={loadingColor}
                    action={addSquare}
                    label="Add square"
                />
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