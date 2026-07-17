<script lang="ts">
  let { link}: { link: string } = $props()
</script>

<a href={link} target="_blank" rel="external noopener noreferrer" class="underline underline-offset-4">{link}</a>
