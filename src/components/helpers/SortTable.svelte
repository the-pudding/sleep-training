<script>
  export let rows = []; // [{ class, style }]
  export let columns = []; // [{ label, prop, sort = true, type = "text", dir = undefined }];

  $: th = columns.map((d) => ({ sort: true, type: "text", dir: undefined, ...d }));
  $: tr = rows.map((d) => ({ ...d, style: d.style || "", class: d.class || "" }));

  const sortFn = {
    asc: (a, b) => (a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN),
    desc: (a, b) => (a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN)
  };

  const onClick = ({ prop, i }) => {
    const newDir = th[i].dir === "asc" ? "desc" : "asc";

    th.forEach((d) => (d.dir = undefined));
    th[i].dir = newDir;
    th = [...th];

    tr.sort((a, b) => sortFn[newDir](a[prop], b[prop]));
    tr = [...tr];
  };
</script>

<table>
  <thead>
    <tr>
      {#each th as { label, prop, type, sort, dir }, i}
        <th
          class:is-sortable={sort}
          class:is-number={type === "number"}
          class:is-asc={dir === "asc"}
          class:is-desc={dir === "desc"}
        >
          {#if sort}
            <button on:click={() => onClick({ prop, i })}>{label}</button>
          {:else}
            {label}
          {/if}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each tr as r}
      <tr>
        {#each columns as { prop, type }}
          <td style={r.style} class={r.class} class:is-number={type === "number"}>
            {@html r[prop]}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    margin: 0 auto;
    table-layout: auto;
  }

  th {
    vertical-align: bottom;
    line-height: 1.2;
  }

  th.is-number,
  td.is-number {
    text-align: right;
  }

  th button {
    padding: 0;
    margin: 0;
    background: transparent;
  }

  th.is-sortable button:after {
    content: "–";
    display: inline-block;
    text-align: center;
    margin-left: 0.5em;
    font-family: monospace;
    vertical-align: middle;
  }

  th.is-sortable.is-asc button:after {
    content: "▲";
    visibility: visible;
  }

  th.is-sortable.is-desc button:after {
    content: "▼";
    visibility: visible;
  }
</style>