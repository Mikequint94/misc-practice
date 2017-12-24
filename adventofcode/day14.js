function diskDefrag(key) {
  let rows = [];
  for (let i = 0; i < 128; i++) {
    rows.push(key+"-"+i);
  }
  console.log(rows);
}

diskDefrag("flqrgnkx");
