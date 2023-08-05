export default function getPages(products, nextIdx, result) {
  if (!products) return null;
  const currentIdx = nextIdx || 0;
  if (products[currentIdx + 2] === undefined) return result;
  const resultArr = result ? [...result] : [];
  resultArr.push(
    [products[currentIdx], products[currentIdx + 1], products[currentIdx + 2]],
  );
  return getPages(products, currentIdx + 3, resultArr);
}
