<script>
    const images = [
        { url: 'assets/images/products/product_1.jpg' },
        { url: 'assets/images/products/product_2.jpg' },
        { url: 'assets/images/products/product_3.jpg' },
      ];
  </script>
  
  <div class="image-grid">
    {#each images as image}
      <div class="image-item">
        <img src={image.url} />
      </div>
    {/each}
  </div>
  
  <style>
    .image-grid {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 10px;
      padding: 10px;
    }
  
    .image-item {
      flex: 0 0 auto;
    }
  
    .image-item img {
      width: 100%;
      height: 30vh;
      object-fit: cover;
      border-radius: 2px;
    }
  </style>