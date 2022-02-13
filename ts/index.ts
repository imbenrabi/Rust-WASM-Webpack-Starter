const createWASMAPI = () => import('../pkg');

(async function main() {
  const { greet } = await createWASMAPI();
  greet('Hello from WASM');
})();
