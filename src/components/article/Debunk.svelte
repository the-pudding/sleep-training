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

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="references-dropdown" tabindex="0">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="references-header" on:click={toggleTable}>
    <span>{showTable ? '▼' : '▶'} {capitalize(target)} References</span>
  </div>
  {#if showTable}
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div class="table-outer-container" tabindex="0">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Title</th>
              <th>Grounding</th>
              <th>Relevance</th>
            </tr>
          </thead>
          <tbody>
            {#each data.filter(d => d.target === target) as d}
              <tr>
                <td>{d.date}</td>
                <td>{d.title}</td>
                <td>
                  {#if d.theoretical === "FALSE"}
                    <span class="legend-oppose">Theoretical article</span>
                  {:else}
                    Research study
                  {/if}
                </td>
                <td>
                  <span class="legend-oppose">Not Relevant</span> 
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
</div>

<style>
  .references-dropdown {
    border-radius: 4px;
    margin-bottom: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: "Atlas Grotesk";
    max-width: 40rem;
		margin: 0 auto 20px auto;
    background-color: #121213;
  }
  
  .references-header {
    padding: 10px;
    border-radius: 4px;
    background-color: #121213;
    cursor: pointer;
    color: white;
    font-family: "Atlas Grotesk";
    font-size: 16px;
  }

  .table-outer-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .table-container {
    padding: 10px;
    min-width: 600px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  th:nth-child(1), td:nth-child(1) { width: 10%; }
  th:nth-child(2), td:nth-child(2) { width: 50%; }
  th:nth-child(3), td:nth-child(3) { width: 20%; }
  th:nth-child(4), td:nth-child(4) { width: 20%; }

  @media only screen and (max-width: 600px) {
    .references-header {
      font-size: 14px;
    }
    .references-dropdown {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
</style>