<script>
    import { getContext } from "svelte";
    export let target;

    let data = getContext("data").references;
</script>

<table>
    <thead>
      <tr>
        <th>Authors</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
        {#each data.filter(d => d.target === target) as d}
        <tr>
          <td>{d.authors}</td>
          <td>{d.title}</td>
        </tr>
      {/each}
    </tbody>
  </table>