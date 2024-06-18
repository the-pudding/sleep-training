<script>
    import { getContext } from "svelte";
    export let target;

    let data = getContext("data").references;
    let showTable = false;

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function toggleTable() {
      showTable = !showTable;
    }
</script>

<div class="references-dropdown">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="references-header" on:click={toggleTable}>
    <span>{showTable ? '▼' : '▶'} {capitalize(target)} References</span>
  </div>
  {#if showTable}
    <div class="table-container">
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
    </div>
  {/if}
</div>

<style>
  .references-dropdown {
    border-radius: 4px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .references-header {
    padding: 10px;
    border-radius: 4px;
    background-color: #ECE3DA;
    border: 0.5px solid black;
    cursor: pointer;
    color: black;
    font-family: "Atlas Grotesk";
    font-size: 16px;
  }
  
  .table-container {
    padding: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #ECE3DA;
  }

  @media only screen and (max-width: 600px) {
    .references-header {
      font-size: 14px;
    }
  }
</style>