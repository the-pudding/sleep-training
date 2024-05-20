<script>
    import { getContext } from "svelte";
    export let copy;
    export let target;

    let data = getContext("data").references;
    console.log("refs", data);
</script>

<table>
    <thead>
      <tr>
        <th>Authors</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      {#each data as ref}
        <tr>
          <td>{ref.authors}</td>
          <td>{ref.title}</td>
        </tr>
      {/each}
    </tbody>
  </table>