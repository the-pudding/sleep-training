<script>
    import { getContext } from "svelte";
    export let target;

    let data = getContext("data").references;
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
</script>

<h2>{capitalize(target)} References</h2>
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
          <td>{d.date}</td>
          <td>{d.title}</td>
        </tr>
      {/each}
    </tbody>
  </table>