<script>
    export let label;
    export let action;
</script>

<!-- Style button according to reference image /static/button-reference.png -->

<button on:click={action}>
    {label}
</button>